import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Category } from '@/types/category'
import { client } from '@/graphql/client'
import {
  GET_CATEGORIES,
  UPDATE_ARTIST_EVENTS,
  UPSERT_CATEGORY_WITH_ARTISTS,
  DELETE_CATEGORY_COMPLEX,
  DELETE_ARTIST
} from '@/graphql/queries'
import { useUserStore, ADMIN_UUID } from './userStore'

export const useCategoryStore = defineStore(
  'category',
  () => {
    const categories = ref<Category[]>([])
    const loading = ref(false)
    const error = ref<Error | null>(null)
    const userStore = useUserStore()

    const ensureAdminUser = () => {
      if (!userStore.currentUser?.id || userStore.currentUser.id !== ADMIN_UUID) {
        throw new Error('Invalid user authentication')
      }
      return ADMIN_UUID
    }

    const fetchCategories = async () => {
      loading.value = true
      error.value = null
      try {
        const userId = ensureAdminUser()
        const result = await client
          .query(GET_CATEGORIES, {
            userId: userId,
          })
          .toPromise()

        if (result.error) {
          throw result.error
        }

        categories.value = result.data.categories.map((category: any) => ({
          id: category.id,
          name: category.name,
          artists: category.artist_categories.map((ac: any) => {
            const artist = ac.artist
            const eventCounts = new Map<string, number>()

            artist.artist_events.forEach((ae: any) => {
              eventCounts.set(ae.country_code, ae.event_count)
            })

            artist.events?.forEach((ea: any) => {
              if (ea.event?.venue?.country_code) {
                const code = ea.event.venue.country_code.toLowerCase()
                eventCounts.set(code, (eventCounts.get(code) || 0) + 1)
              }
            })

            return {
              id: artist.id,
              name: artist.name,
              favoriteCount: artist.favorite_count,
              events: Array.from(eventCounts.entries()).map(([code, count]) => ({
                id: `${artist.id}-${code}`,
                country: code,
                count
              }))
            }
          })
        }))
      } catch (e) {
        error.value = e as Error
        console.error('Error fetching categories:', e)
      } finally {
        loading.value = false
      }
    }

    const updateArtistEvents = async (artistId: string, events: Array<{ country: string; count: number }>) => {
      if (!artistId) {
        throw new Error('Artist ID is required')
      }

      try {
        const artistEvents = events.map(event => ({
          artist_id: artistId,
          country_code: event.country.toLowerCase(),
          event_count: event.count
        }))

        const result = await client
          .mutation(UPDATE_ARTIST_EVENTS, {
            artistId: artistId,
            events: artistEvents
          })
          .toPromise()

        if (result.error) {
          throw result.error
        }

        // Refetch categories to update the data reactively
        await fetchCategories()

        return result.data?.update_artist_events?.returning
      } catch (error) {
        console.error('Error updating artist events:', error)
        throw error
      }
    }

    const addOrUpdateCategory = async (category: {
      id?: string
      name: string
      artists?: any[]
    }) => {
      try {
        const userId = ensureAdminUser()
        const categoryData = {
          id: category.id,
          name: category.name.toUpperCase(),
          user_id: userId,
          artist_categories: category.artists
            ? {
              data: category.artists.map((artist) => ({
                artist: {
                  data: {
                    id: artist.id,
                    name: artist.name,
                  },
                  on_conflict: {
                    constraint: 'artists_pkey',
                    update_columns: ['name', 'updated_at'],
                  },
                },
              })),
              on_conflict: {
                constraint: 'artist_categories_pkey',
                update_columns: ['category_id', 'artist_id'],
              },
            }
            : undefined,
        }

        const result = await client
          .mutation(UPSERT_CATEGORY_WITH_ARTISTS, {
            category: categoryData,
          })
          .toPromise()

        if (result.error) {
          throw result.error
        }

        // Refetch categories to ensure the new artist is included
        await fetchCategories()
        return result.data?.insert_categories_one
      } catch (error) {
        console.error('Error adding or updating category:', error)
        throw error
      }
    }

    const deleteCategory = async (categoryId: string) => {
      try {
        ensureAdminUser()
        loading.value = true

        // Get all artists in the category before deletion
        const categoryToDelete = categories.value.find(c => c.id === categoryId)
        if (!categoryToDelete) throw new Error('Category not found')

        const artistIds = categoryToDelete.artists.map(artist => artist.id)

        // Delete the category and its relationships
        const deleteResult = await client
          .mutation(DELETE_CATEGORY_COMPLEX, {
            categoryId: categoryId
          })
          .toPromise()

        if (deleteResult.error) throw deleteResult.error

        // Update local state by refetching categories
        await fetchCategories()

        return deleteResult.data?.delete_categories_by_pk
      } catch (error) {
        console.error('Error deleting category:', error)
        throw error
      } finally {
        loading.value = false
      }
    }

    const deleteArtist = async (categoryId: string, artistId: string) => {
      try {
        ensureAdminUser()
        const result = await client
          .mutation(DELETE_ARTIST, {
            id: artistId // Changed from artistId to id to match the mutation
          })
          .toPromise()

        if (result.error) {
          throw result.error
        }

        // Update local state by refetching categories
        await fetchCategories()

        return result.data?.delete_artists_by_pk
      } catch (error) {
        console.error('Error deleting artist:', error)
        throw error
      }
    }

    const artistCount = computed(() =>
      categories.value.reduce((total, category) => total + category.artists.length, 0)
    )

    const favoriteCount = computed(() =>
      categories.value.reduce(
        (total, category) =>
          total +
          category.artists.reduce((artistTotal, artist) => artistTotal + artist.favoriteCount, 0),
        0
      )
    )

    if (userStore.isAuthenticated()) {
      fetchCategories()
    }

    return {
      categories,
      loading,
      error,
      fetchCategories,
      addOrUpdateCategory,
      updateArtistEvents,
      deleteCategory,
      deleteArtist,
      artistCount,
      favoriteCount,
    }
  },
  {
    persist: true,
  }
)
