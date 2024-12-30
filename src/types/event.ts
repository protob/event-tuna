import type { BaseEntity } from './base'
import type { Venue } from './venue'
import type { Artist } from './artist'

export type EventType = 'Concert' | 'Festival' | 'Tour' | string
export type EventCategory = 'Festival' | 'Concert' | 'Tour' | string

export interface EventArtist {
  artist: Artist
  is_headliner: boolean
}

export interface NormalizedEvent extends BaseEntity {
  name: string
  tm_id: string
  type: EventType
  category: EventCategory
  description?: string
  start_date: string
  end_date?: string
  venue_id?: string
  venue?: Venue
  url?: string
  about?: string
  image_url?: string
  is_favorite: boolean
  event_artists?: EventArtist[]
}
