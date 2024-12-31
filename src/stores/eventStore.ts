import { defineStore } from 'pinia'
import { ref } from 'vue'
import { client } from '@/graphql/client'
import {
  UPSERT_EVENT,
  UPSERT_EVENT_ARTIST,
  UPSERT_VENUE,
  GET_ALL_EVENTS,
  DELETE_EVENT_BY_ID
} from '@/graphql/queries'
import type { NormalizedEvent } from '@/types/event'

export const useEventStore = defineStore(
  'event',
  () => {
    const events = ref<NormalizedEvent[]>([])
    const filteredEvents = ref<NormalizedEvent[]>([])
    const lastUpdate = ref(Date.now())
    const isLoading = ref(false)

    const fetchAllEvents = async () => {
      isLoading.value = true
      try {
        const result = await client.query(GET_ALL_EVENTS, {}).toPromise()
        if (result.error) {
          throw result.error
        }
        events.value = result.data.events
        lastUpdate.value = Date.now()
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        isLoading.value = false
      }
    }

    const addOrUpdateEventWithArtists = async (
      eventData: Partial<NormalizedEvent>,
      artistId: string
    ) => {
      if (!artistId) {
        throw new Error('artistId is required')
      }

      if (!eventData.tm_id) {
        throw new Error('tm_id is required for event creation/update')
      }

      try {
        let venueId = null
        if (eventData.venue && eventData.venue.tm_id) {
          const venueResult = await client
            .mutation(UPSERT_VENUE, {
              venue: {
                tm_id: eventData.venue.tm_id,
                name: eventData.venue.name,
                city: eventData.venue.city,
                country: eventData.venue.country,
                country_code: eventData.venue.country_code,
                latitude: eventData.venue.latitude,
                longitude: eventData.venue.longitude,
              },
            })
            .toPromise()

          if (venueResult.error) throw venueResult.error
          venueId = venueResult.data.insert_venues_one.id
        }

        const result = await client
          .mutation(UPSERT_EVENT, {
            event: {
              tm_id: eventData.tm_id,
              name: eventData.name,
              type: eventData.type || 'Concert',
              category: eventData.category || 'Concert',
              description: eventData.description || '',
              start_date: eventData.start_date,
              end_date: eventData.end_date,
              venue_id: venueId,
              url: eventData.url,
              about: eventData.about,
              image_url: eventData.image_url,
              is_favorite: eventData.is_favorite || false,
            },
          })
          .toPromise()

        if (result.error) {
          throw result.error
        }

        const newEvent = result.data.insert_events_one
        const eventId = newEvent.id

        if (eventId && artistId) {
          const eaResult = await client
            .mutation(UPSERT_EVENT_ARTIST, {
              event_id: eventId,
              artist_id: artistId,
              is_headliner: true,
            })
            .toPromise()

          if (eaResult.error) {
            throw eaResult.error
          }
        }

        await fetchAllEvents() // Refetch all events to ensure consistency
        lastUpdate.value = Date.now()

        return newEvent
      } catch (error) {
        console.error('Error adding or updating event:', error)
        throw error
      }
    }

    const addEventsForArtist = async (
      artistId: string,
      newEvents: NormalizedEvent[]
    ) => {
      if (!artistId) {
        throw new Error('artistId is required')
      }

      try {
        for (const event of newEvents) {
          if (!event.tm_id) {
            console.warn('Skipping event without tm_id:', event.name)
            continue
          }

          await addOrUpdateEventWithArtists(event, artistId)
        }
        lastUpdate.value = Date.now()
        return true
      } catch (error) {
        console.error('Error adding events for artist:', error)
        return false
      }
    }

    const filterEventsByDateRange = (startDate: string, endDate: string) => {
      if (!startDate || !endDate) {
        filteredEvents.value = []
        return
      }

      const start = new Date(startDate)
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)

      filteredEvents.value = events.value.filter((event) => {
        const eventDate = new Date(event.start_date)
        return eventDate >= start && eventDate <= end
      })
    }

    const getEventsByArtistId = (artistId: string) => {
      return events.value.filter((event) =>
        event.event_artists?.some((ea) => ea.artist.id === artistId)
      )
    }

    const deleteEventsByArtistId = async (artistId: string) => {
      events.value = events.value.filter(
        (event) =>
          !event.event_artists?.some((ea) => ea.artist.id === artistId)
      )
      filteredEvents.value = filteredEvents.value.filter(
        (event) =>
          !event.event_artists?.some((ea) => ea.artist.id === artistId)
      )
      lastUpdate.value = Date.now()
      await fetchAllEvents() // Refetch to ensure consistency
    }

    const clearEventsByCategory = async (
      categoryId: string,
      artistIds: string[]
    ) => {
      try {
        events.value = events.value.filter(
          (event) =>
            !event.event_artists?.some((ea) => artistIds.includes(ea.artist.id))
        )
        filteredEvents.value = filteredEvents.value.filter(
          (event) =>
            !event.event_artists?.some((ea) => artistIds.includes(ea.artist.id))
        )
        lastUpdate.value = Date.now()
        await fetchAllEvents() // Refetch to ensure consistency
      } catch (error) {
        console.error('Error clearing category events:', error)
      }
    }

    const deleteEventById = async (eventId: string) => {
      try {
        // Remove the event from the database
        const result = await client
          .mutation(DELETE_EVENT_BY_ID, { eventId })
          .toPromise()
        if (result.error) throw result.error

        // Remove the event from the local store
        events.value = events.value.filter((event) => event.id !== eventId)
        filteredEvents.value = filteredEvents.value.filter(
          (event) => event.id !== eventId
        )
        lastUpdate.value = Date.now()
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }

    const toggleFavorite = (eventId: string) => {
      const event = events.value.find((e) => e.id === eventId)
      if (event) {
        event.is_favorite = !event.is_favorite
        lastUpdate.value = Date.now()
      }
    }

    return {
      events,
      filteredEvents,
      lastUpdate,
      isLoading,
      fetchAllEvents,
      addOrUpdateEventWithArtists,
      addEventsForArtist,
      filterEventsByDateRange,
      getEventsByArtistId,
      deleteEventsByArtistId,
      clearEventsByCategory,
      toggleFavorite,
      deleteEventById,
    }
  },
  {
    persist: true,
  }
)
