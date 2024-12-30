export interface TicketmasterVenue {
  name: string
  city: { name: string }
  country: { name: string; countryCode: string }
  location: { latitude: string; longitude: string }
}

export interface TicketmasterEvent {
  id: string
  name: string
  type: string
  url: string
  dates: {
    start: {
      dateTime: string
    }
    end?: {
      dateTime: string
    }
  }
  _embedded: {
    venues: TicketmasterVenue[]
    attractions?: Array<{
      id: string
      name: string
    }>
  }
  classifications?: Array<{
    segment: {
      name: string
    }
  }>
  info?: string
  images?: Array<{
    url: string
  }>
}

export interface TicketmasterResponse {
  _embedded?: {
    events: TicketmasterEvent[]
  }
  page: {
    totalElements: number
    totalPages: number
    number: number
  }
}
