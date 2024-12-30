import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import urql, { cacheExchange, fetchExchange } from '@urql/vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

createApp(App)
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(urql, {
    url: 'http://localhost:3030/v1/graphql',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => ({
      headers: {
        'x-hasura-admin-secret': 'password',
        'content-type': 'application/json'
      }
    })
  })
  .use(router)
  .use(createVuetify({
    components,
    directives,
    theme: { defaultTheme: 'dark' }
  }))
  .use(i18n)
  .mount('#app')
