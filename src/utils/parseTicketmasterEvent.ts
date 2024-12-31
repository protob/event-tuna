import type { NormalizedEvent } from '@/types/event'
import type { Venue } from '@/types/venue'

export function parseVenue(tmVenue: any): Venue {
  if (!tmVenue?.id) {
    throw new Error('Venue must have an ID')
  }

  return {
    tm_id: tmVenue.id,
    name: tmVenue.name,
    city: tmVenue.city?.name || '',
    country: tmVenue.country?.name || '',
    country_code: tmVenue.country?.countryCode?.toLowerCase() || '',
    latitude: tmVenue.location?.latitude ? parseFloat(tmVenue.location.latitude) : null,
    longitude: tmVenue.location?.longitude ? parseFloat(tmVenue.location.longitude) : null
  }
}

export function parseTicketmasterEvent(tmEvent: any): NormalizedEvent {
  if (!tmEvent.id) {
    throw new Error('Ticketmaster event must have an ID')
  }

  const venue = tmEvent._embedded?.venues?.[0]

  return {
    id: '',  // Set by database
    tm_id: tmEvent.id,
    name: tmEvent.name,
    type: mapEventType(tmEvent.type),
    category: mapEventCategory(tmEvent.classifications?.[0]?.segment?.name),
    description: tmEvent.description || tmEvent.pleaseNote || '',
    start_date: tmEvent.dates.start.dateTime,
    end_date: tmEvent.dates.end?.dateTime || null,
    venue_id: null,  // Will be set after venue is created/looked up
    venue: venue ? parseVenue(venue) : undefined,
    url: tmEvent.url || '',
    about: tmEvent.info || `${tmEvent.name} at ${venue?.name || 'TBA'}`,
    image_url: tmEvent.images?.[0]?.url || '',
    is_favorite: false,
    event_artists: []  // Populated when linking to artists
  }
}

function mapEventType(type: string | undefined): string {
  const validTypes = ['Concert', 'Festival', 'Tour']
  return type && validTypes.includes(type) ? type : 'Concert'
}

function mapEventCategory(category: string | undefined): string {
  const validCategories = ['Festival', 'Concert', 'Tour']
  return category && validCategories.includes(category) ? category : 'Concert'
}
