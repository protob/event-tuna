import { useEventStore } from '@/stores/eventStore'
import type { NormalizedEvent } from '@/types/event'

export function useSaveEvents() {
  const eventStore = useEventStore()

  const saveEvent = async (event: NormalizedEvent, artistId: string | null) => {
    if (!artistId) {
      throw new Error('artistId is required')
    }
    try {
      const newEvent = await eventStore.addOrUpdateEventWithArtists(event, artistId)
      return newEvent
    } catch (error) {
      console.error('Error saving event:', error)
      throw error
    }
  }

  return {
    saveEvent,
  }
}
