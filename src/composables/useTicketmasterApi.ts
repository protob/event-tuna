import type { NormalizedEvent } from '@/types/event'
import { parseTicketmasterEvent } from '@/utils/parseTicketmasterEvent'

export function useTicketmasterApi() {
  const fetchEventsByArtist = async (artistName: string): Promise<NormalizedEvent[]> => {
    const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=${encodeURIComponent(
      artistName
    )}&locale=*`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }

      const data = await response.json()
      const events = data._embedded?.events || []

      return events
        .map((event: any) => {
          try {
            return parseTicketmasterEvent(event)
          } catch (error) {
            if ((error as Error).message.includes('global event')) {
              // Silently skip global events
              return null
            }
            console.error(`Error parsing event for ${artistName}:`, error)
            return null
          }
        })
        .filter((event: NormalizedEvent | null): event is NormalizedEvent => event !== null)
    } catch (error) {
      console.error('Error fetching events from Ticketmaster:', error)
      return []
    }
  }

  return {
    fetchEventsByArtist
  }
}
