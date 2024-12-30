import {
  Client,
  cacheExchange,
  fetchExchange
} from '@urql/vue'

// Create urql client
export const client = new Client({
  url: 'http://localhost:3030/v1/graphql',
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => ({
    headers: {
      'x-hasura-admin-secret': 'password',
      'content-type': 'application/json',
    },
  }),
})
