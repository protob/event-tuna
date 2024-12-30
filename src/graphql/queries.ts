import gql from 'graphql-tag'
export const GET_CATEGORIES = gql`
  query GetCategories($userId: uuid!) {
    categories(where: { user_id: { _eq: $userId } }) {
      id
      name
      user_id
      created_at
      updated_at
      artist_categories {
        artist {
          id
          name
          favorite_count
          artist_events {
            id
            country_code
            event_count
            __typename
          }
          events: event_artists {
            event {
              id
              name
              start_date
              venue {
                country_code
              }
            }
          }
          __typename
        }
        __typename
      }
    }
  }
`
// export const GET_CATEGORIES = gql`
//   query GetCategories($userId: uuid!) {
//     categories(where: { user_id: { _eq: $userId } }) {
//       id
//       name
//       user_id
//       created_at
//       updated_at
//       artist_categories {
//         artist {
//           id
//           name
//           favorite_count
//           artist_events {
//             id
//             country_code
//             event_count
//           }
//           events: event_artists {
//             event {
//               id
//               name
//               start_date
//               venue {
//                 country_code
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `

// export const GET_ALL_EVENTS = gql`
//   query GetAllEvents {
//     events(order_by: { start_date: asc }) {
//       id
//       tm_id
//       name
//       type
//       category
//       description
//       start_date
//       end_date
//       is_favorite
//       url
//       about
//       image_url
//       venue_id
//       venue {
//         id
//         tm_id
//         name
//         city
//         country
//         country_code
//         latitude
//         longitude
//       }
//       event_artists {
//         artist {
//           id
//           name
//           favorite_count
//         }
//         is_headliner
//       }
//       created_at
//       updated_at
//     }
//   }
// `
export const GET_ALL_EVENTS = gql`
  query GetAllEvents {
    events(order_by: { start_date: asc }) {
      id
      tm_id
      name
      type
      category
      description
      start_date
      end_date
      is_favorite
      url
      about
      image_url
      venue_id
      venue {
        id
        tm_id
        name
        city
        country
        country_code
        latitude
        longitude
      }
      event_artists {
        artist {
          id
          name
          favorite_count
        }
        is_headliner
      }
      created_at
      updated_at
    }
  }
`
export const GET_ARTIST_EVENTS = gql`
  query GetArtistEvents($artistId: uuid!) {
    events(
      where: { event_artists: { artist_id: { _eq: $artistId } } }
      order_by: { start_date: asc }
    ) {
      id
      tm_id
      name
      type
      category
      description
      start_date
      end_date
      is_favorite
      url
      about
      image_url
      venue_id
      venue {
        id
        tm_id
        name
        city
        country
        country_code
        latitude
        longitude
      }
      event_artists {
        artist {
          id
          name
          favorite_count
        }
        is_headliner
      }
      created_at
      updated_at
    }
  }
`

export const UPSERT_VENUE = gql`
  mutation UpsertVenue($venue: venues_insert_input!) {
    insert_venues_one(
      object: $venue
      on_conflict: {
        constraint: venues_tm_id_key
        update_columns: [name, city, country, country_code, latitude, longitude, updated_at]
      }
    ) {
      id
      tm_id
      name
      city
      country
      country_code
      latitude
      longitude
    }
  }
`

export const UPSERT_EVENT = gql`
  mutation UpsertEvent($event: events_insert_input!) {
    insert_events_one(
      object: $event
      on_conflict: {
        constraint: events_tm_id_key
        update_columns: [
          name
          type
          category
          description
          start_date
          end_date
          venue_id
          url
          about
          image_url
          is_favorite
          updated_at
        ]
      }
    ) {
      id
      tm_id
      name
      type
      category
      description
      start_date
      end_date
      is_favorite
      url
      about
      image_url
      venue {
        id
        tm_id
        name
        city
        country
        country_code
        latitude
        longitude
      }
      created_at
    }
  }
`

export const UPSERT_EVENT_ARTIST = gql`
  mutation UpsertEventArtist(
    $event_id: uuid!
    $artist_id: uuid!
    $is_headliner: Boolean!
  ) {
    insert_event_artists_one(
      object: {
        event_id: $event_id
        artist_id: $artist_id
        is_headliner: $is_headliner
      }
      on_conflict: {
        constraint: event_artists_pkey
        update_columns: [is_headliner]
      }
    ) {
      event_id
      artist_id
      is_headliner
    }
  }
`

export const UPDATE_ARTIST_EVENT_COUNT = gql`
  mutation UpdateArtistEventCount(
    $artist_id: uuid!
    $country_code: String!
    $count: Int!
  ) {
    insert_artist_events_one(
      object: {
        artist_id: $artist_id
        country_code: $country_code
        event_count: $count
      }
      on_conflict: {
        constraint: artist_events_pkey
        update_columns: [event_count, updated_at]
      }
    ) {
      id
      country_code
      event_count
    }
  }
`

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $user_id: uuid!) {
    insert_categories_one(object: { name: $name, user_id: $user_id }) {
      id
      name
      user_id
      created_at
      artist_categories {
        artist {
          id
          name
          favorite_count
        }
      }
    }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: uuid!, $name: String!, $user_id: uuid!) {
    update_categories_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, user_id: $user_id }
    ) {
      id
      name
      updated_at
      artist_categories {
        artist {
          id
          name
          favorite_count
        }
      }
    }
  }
`

// export const DELETE_CATEGORY = gql`
//   mutation DeleteCategory($id: uuid!) {
//     delete_categories_by_pk(id: $id) {
//       id
//       name
//     }
//   }
// `

export const CREATE_ARTIST = gql`
  mutation CreateArtist($name: String!, $category_id: uuid!) {
    insert_artists_one(
      object: {
        name: $name
        artist_categories: { data: [{ category_id: $category_id }] }
      }
    ) {
      id
      name
      favorite_count
      created_at
      artist_categories {
        category {
          id
          name
        }
      }
      artist_events {
        id
        country_code
        event_count
      }
    }
  }
`

export const UPDATE_ARTIST = gql`
  mutation UpdateArtist($id: uuid!, $name: String!) {
    update_artists_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      name
      favorite_count
      artist_categories {
        category {
          id
          name
        }
      }
      artist_events {
        id
        country_code
        event_count
      }
      updated_at
    }
  }
`

// export const DELETE_ARTIST = gql`
//   mutation DeleteArtist($id: uuid!) {
//     delete_artists_by_pk(id: $id) {
//       id
//       name
//     }
//   }
// `

export const DELETE_ARTIST = gql`
  mutation DeleteArtist($id: uuid!) {
    # First delete events that belong ONLY to this artist
    delete_events(
      where: {
        event_artists: {
          artist_id: { _eq: $id }
        },
        _not: {
          event_artists: {
            artist_id: { _neq: $id }
          }
        }
      }
    ) {
      affected_rows
      returning {
        id
        name
      }
    }

    # Delete venues that are now not referenced by any remaining events
    delete_venues(
      where: {
        _not: {
          events: {}
        }
      }
    ) {
      affected_rows
      returning {
        id
        name
        city
        country
      }
    }

    # Delete artist_events entries
    delete_artist_events(
      where: { artist_id: { _eq: $id } }
    ) {
      affected_rows
    }

    # Delete event_artists relationships
    delete_event_artists(
      where: { artist_id: { _eq: $id } }
    ) {
      affected_rows
    }

    # Delete artist_categories relationships
    delete_artist_categories(
      where: { artist_id: { _eq: $id } }
    ) {
      affected_rows
    }

    # Finally delete the artist itself
    delete_artists_by_pk(id: $id) {
      id
      name
    }
  }
`


export const UPSERT_ARTIST_EVENTS = gql`
  mutation UpsertArtistEvents($artist_events: [artist_events_insert_input!]!) {
    insert_artist_events(
      objects: $artist_events
      on_conflict: {
        constraint: artist_events_pkey
        update_columns: [event_count, updated_at]
      }
    ) {
      affected_rows
      returning {
        id
        artist_id
        country_code
        event_count
        created_at
        updated_at
      }
    }
  }
`

export const GET_USER_BY_ID = gql`
  query GetUserById($id: uuid!) {
    users_by_pk(id: $id) {
      id
      username
      email
      role
      active
      created_at
      updated_at
    }
  }
`

export const GET_USER_FAVORITE_EVENTS = gql`
  query GetUserFavoriteEvents($userId: uuid!) {
    user_favorite_events(where: { user_id: { _eq: $userId } }) {
      event {
        id
        name
        type
        category
        is_favorite
        start_date
        end_date
      }
    }
  }
`

export const UPSERT_CATEGORY_WITH_ARTISTS = gql`
  mutation UpsertCategoryWithArtists($category: categories_insert_input!) {
    insert_categories_one(
      object: $category
      on_conflict: {
        constraint: categories_pkey
        update_columns: [name, updated_at]
      }
    ) {
      id
      name
      artist_categories {
        artist {
          id
          name
          favorite_count
        }
      }
    }
  }
`




export const UPDATE_ARTIST_EVENTS = gql`
  mutation UpdateArtistEvents($artistId: uuid!, $events: [artist_events_insert_input!]!) {
    delete_artist_events(where: { artist_id: { _eq: $artistId } }) {
      affected_rows
    }
    insert_artist_events(objects: $events) {
      returning {
        id
        artist_id
        country_code
        event_count
        created_at
        updated_at
      }
      affected_rows
    }
  }
`



export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($categoryId: uuid!) {
    delete_artist_categories(where: { category_id: { _eq: $categoryId } }) {
      affected_rows
    }
    delete_categories_by_pk(id: $categoryId) {
      id
      name
    }
  }
`

// export const DELETE_ARTIST = gql`
//   mutation DeleteArtist($artistId: uuid!) {
//     delete_artist_events(where: { artist_id: { _eq: $artistId } }) {
//       affected_rows
//     }
//     delete_event_artists(where: { artist_id: { _eq: $artistId } }) {
//       affected_rows
//     }
//     delete_artist_categories(where: { artist_id: { _eq: $artistId } }) {
//       affected_rows
//     }
//     delete_artists_by_pk(id: $artistId) {
//       id
//       name
//     }
//   }
// `



export const DELETE_CATEGORY_COMPLEX = gql`
  mutation DeleteCategoryComplex($categoryId: uuid!) {
    # First delete events that belong ONLY to artists that ONLY belong to this category
    delete_events(
      where: {
        event_artists: {
          artist: {
            artist_categories: {
              category_id: { _eq: $categoryId }
            },
            _not: {
              artist_categories: {
                category_id: { _neq: $categoryId }
              }
            }
          }
        }
      }
    ) {
      affected_rows
      returning {
        id
        name
      }
    }

    # Delete venues that are now not referenced by any remaining events
    delete_venues(
      where: {
        _not: {
          events: {}
        }
      }
    ) {
      affected_rows
      returning {
        id
        name
        city
        country
      }
    }

    # Delete event_artists entries for deleted artists
    delete_event_artists(
      where: {
        artist: {
          artist_categories: {
            category_id: { _eq: $categoryId }
          },
          _not: {
            artist_categories: {
              category_id: { _neq: $categoryId }
            }
          }
        }
      }
    ) {
      affected_rows
    }

    # Delete artist_events for deleted artists
    delete_artist_events(
      where: {
        artist: {
          artist_categories: {
            category_id: { _eq: $categoryId }
          },
          _not: {
            artist_categories: {
              category_id: { _neq: $categoryId }
            }
          }
        }
      }
    ) {
      affected_rows
    }

    # Delete artists that ONLY belong to this category
    delete_artists(
      where: {
        artist_categories: {
          category_id: { _eq: $categoryId }
        },
        _not: {
          artist_categories: {
            category_id: { _neq: $categoryId }
          }
        }
      }
    ) {
      affected_rows
      returning {
        id
        name
      }
    }

    # Delete artist_categories relationships for this category
    delete_artist_categories(
      where: {
        category_id: { _eq: $categoryId }
      }
    ) {
      affected_rows
    }

    # Finally delete the category itself
    delete_categories_by_pk(id: $categoryId) {
      id
      name
    }
  }
`

export const GET_ARTIST_CATEGORY_COUNT = gql`
  query GetArtistCategoryCount($artistId: uuid!) {
    artists_by_pk(id: $artistId) {
      id
      artist_categories_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export const DELETE_EVENTS_WITHOUT_CATEGORY = gql`
  mutation DeleteEventsWithoutCategory($artistIds: [uuid!]!) {
    delete_events(
      where: {
        event_artists: {
          artist_id: { _in: $artistIds }
        }
        _and: {
          event_artists: {
            artist: {
              artist_categories: { category_id: { _is_null: false } }
            }
          }
          _not: {}
        }
      }
    ) {
      affected_rows
      returning {
        id
        name
      }
    }
  }
`



export const DELETE_EVENT_BY_ID = gql`
  mutation DeleteEventById($eventId: uuid!) {
    delete_events_by_pk(id: $eventId) {
      id
      name
    }
  }
`
