export interface Venue {
  name: string
  city: string
  country: string
  countryCode: string
  location?: {
    longitude: string
    latitude: string
  }
}
