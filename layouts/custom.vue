<template>
  <v-app dark>
    <!--content-->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import GeoTimeToolbar from '~/components/molecules/toolbar/GeoTimeToolbar'
import planner from '~/components/molecules/toolbar/PlannerToolbar'
import userWidget from '~/components/molecules/user/userWidget'

export default {
  components: {
    GeoTimeToolbar,
    planner,
    userWidget
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
