import { BaseEntity } from './base'
import { ArtistEvent } from './event'

export interface Artist extends BaseEntity {
  name: string
  favoriteCount: number
  events: ArtistEvent[]
}

export interface ArtistUpdate {
  id: string
  events: ArtistEvent[]
}
