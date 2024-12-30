import { BaseEntity } from './base'
import { Artist } from './artist'

export interface Category extends BaseEntity {
  name: string
  artists: Artist[]
}

export interface CategoryState {
  categories: Category[]
}

export interface CategoryUpdate {
  id: string
  name: string
}

export interface AddArtistPayload {
  categoryId: string
  artistName: string
}
