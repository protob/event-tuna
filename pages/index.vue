<template>
  <v-layout column justify-center align-center>
    <v-container class="main-container" fluid ma-0 pa-0 fill-height>
      <v-row no-gutters>
        <v-col cols="sm">
          <v-card class="pa-2 bg-main elevation-0">
            <cats-listing />
          </v-card>
        </v-col>
        <v-col cols="sm">
          <v-card class="pa-2 events-listing-wrap bg-main elevation-0">
            <events-listing />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
// import loginFormRegular from '~/components/molecules/forms/loginFormRegular'
import eventsListing from '~/components/organisms/allArtistsEventsListing'
import catsListing from '~/components/organisms/allArtistsCatsListing'

import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    eventsListing,
    catsListing
  }
}
</script>
<style lang="scss" scoped>
.main-container {
  max-width: 1200px;
}

.bg-main {
  background-color: #303030;
}
</style>
