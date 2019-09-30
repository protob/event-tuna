<template>
  <v-layout column justify-center align-center>
    <v-container class="main-container" fluid ma-0 pa-0 fill-height>
      <v-row no-gutters>
        <v-col cols="sm">
          <v-card class="pa-2 transparent elevation-0">
            <artists-by-cats-listing />
          </v-card>
        </v-col>
        <v-col cols="sm">
          <v-card class="pa-2 events-listing-wrap transparent elevation-0">
            <events-by-artist-listing />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import eventsByArtistListing from '~/components/organisms/EventsByArtistListing'
import artistsByCatsListing from '~/components/organisms/ArtistsByCatsListing'

export default {
  components: {
    eventsByArtistListing,
    artistsByCatsListing
  },
  mounted() {
    //  this.addHelpers()
  },
  methods: {
    addHelpers() {
      const elems = document.querySelectorAll('.has-helper')
      elems.forEach((el, idx) => {
        const div = document.createElement('div')
        const name = el.getAttribute('data-name')

        div.innerHTML = ` <div class="component-helper">${name}</div>`

        el.appendChild(div)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main-container {
  max-width: 1200px;
}
</style>
