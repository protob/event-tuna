import { ref } from 'vue'
import { useTicketmasterApi } from './useTicketmasterApi'
import { useSaveEvents } from './useSaveEvents'
import { client } from '@/graphql/client'
import type { NormalizedEvent } from '@/types/event'
import { UPDATE_ARTIST_EVENTS } from '@/graphql/queries'
import { getContinentName } from '@brixtol/country-continent';



export function useArtistEvents() {
  const updatingArtist = ref<string | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  const ticketmasterApi = useTicketmasterApi()
  const { saveEvent } = useSaveEvents()

  const isEuropeanEvent = (event: NormalizedEvent): boolean => {
    const countryCode = event.venue?.country_code?.toLowerCase()
    // only european events
    return countryCode ? getContinentName(countryCode)==="Europe" : false
  }

  const fetchAndSaveArtistEvents = async (artistId: string, artistName: string) => {
    if (!artistId || !artistName) {
      throw new Error('Artist ID and name are required')
    }

    loading.value = true
    updatingArtist.value = artistId
    error.value = null

    try {
      const allEvents = await ticketmasterApi.fetchEventsByArtist(artistName)
      const europeanEvents = allEvents.filter(isEuropeanEvent)
      const countryStats = new Map<string, number>()

      for (const event of europeanEvents) {
        try {
          if (!event.tm_id) {
            console.warn('Skipping event without tm_id:', event.name)
            continue
          }

          await saveEvent(event, artistId)

          const countryCode = event.venue?.country_code?.toLowerCase()
          if (countryCode) {
            countryStats.set(
              countryCode,
              (countryStats.get(countryCode) || 0) + 1
            )
          }
        } catch (e) {
          console.error(`Failed to save event: ${event.name}`, e)
        }
      }

      // Convert map to array of event count objects
      const artistEvents = Array.from(countryStats.entries()).map(([country, count]) => ({
        artist_id: artistId,
        country_code: country,
        event_count: count
      }))

      // Update artist event counts in database
      if (artistEvents.length > 0) {
        const result = await client
          .mutation(UPDATE_ARTIST_EVENTS, {
            artistId: artistId,
            events: artistEvents
          })
          .toPromise()

        if (result.error) {
          throw result.error
        }
      }

      return artistEvents.map(event => ({
        id: `${artistId}-${event.country_code}`,
        country: event.country_code,
        count: event.event_count,
        artistId
      }))

    } catch (e) {
      error.value = e as Error
      console.error('Error in fetchAndSaveArtistEvents:', e)
      throw e
    } finally {
      loading.value = false
      updatingArtist.value = null
    }
  }

  const getEventsByCountry = (events: NormalizedEvent[]) => {
    const countryStats = new Map<string, number>()

    events.forEach(event => {
      const countryCode = event.venue?.country_code?.toLowerCase()
      if (countryCode && EUROPEAN_COUNTRY_CODES.has(countryCode)) {
        countryStats.set(
          countryCode,
          (countryStats.get(countryCode) || 0) + 1
        )
      }
    })

    return Array.from(countryStats.entries()).map(([country, count]) => ({
      country,
      count
    }))
  }

  return {
    updatingArtist,
    loading,
    error,
    fetchAndSaveArtistEvents,
    getEventsByCountry
  }
}
