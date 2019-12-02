<template>
  <section
    class="has-helper artist-cat-stats-single"
    :data-name="$options.name"
  >
    <v-card class="item ma-1 py-2 px-4">
      <div class="stats-artist-wrap">
        <div class="my-2">
          <btn @click="showArtistEvents">Events Details</btn>
        </div>
        <!--  LISTING  -->
        <section v-if="Object.values(getArtistStats(catId, artistId))[0]">
          <div
            v-for="(v, k, idx) in getArtistStats(catId, artistId).countries"
            :key="idx"
            class="artist-event-stats"
          >
            <div class="stats-continent-wrap">
              <v-container fluid="fluid" pt-0="pt-0" pb-0="pb-0">
                <v-row :align="'start'" :justify="'start'">
                  <v-card class="ma-1 py-2 px-4 blue darken-4">
                    <span>{{ k }} events</span>
                  </v-card>
                  <v-card class="ma-1 pa-2 elevation-0">
                    <span>{{
                      Object.values(v).reduce((a, b) => a + b, 0)
                    }}</span>
                  </v-card>
                </v-row>
              </v-container>
            </div>
            <!-- country-->
            <v-container
              v-for="(vv, kk, idx) in v"
              :key="idx"
              fluid="fluid"
              pt-0="pt-0"
              pb-0="pb-0"
            >
              <v-row :align="'start'" :justify="'start'">
                <v-card class="ma-1 py-2 px-4 blue-grey darken-4">{{
                  kk
                }}</v-card>
                <v-card class="ma-1 pa-2 elevation-0">
                  <a href @click.prevent="filterEventsByCountry(kk)">
                    <span class="flag-icon" :class="['flag-icon-' + kk]"></span>
                  </a>
                </v-card>
                <v-card class="ma-1 pa-2 elevation-0">
                  <span>{{ vv }}</span>
                </v-card>
              </v-row>
            </v-container>
          </div>
        </section>
      </div>
    </v-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import btn from '~/components/atoms/BaseBtn'
const { query } = require('what-country')

export default {
  name: 'ArtistCatStatsSingle',
  components: { btn },
  props: ['eventsStats', 'artistId', 'catId'],
  data() {
    return {
      stats: {}
    }
  },
  computed: {
    ...mapGetters('cats', {
      getArtistStats: 'getArtistStats'
    })
  },
  mounted() {
    this.$root.$on('updateArtistStats', (data) => {
      this.$forceUpdate()
    })
    this.$nextTick(() => {
      this.$forceUpdate()
    })
  },
  methods: {
    filterEventsByCountry(isoCode) {
      this.$store.dispatch('events/filterEventsByCountry', isoCode)
      this.$store.dispatch('events/setCurrentCountryCode', isoCode)

      // dirty fix to force ui update
      setTimeout(() => {
        this.$root.$emit('updateArtistEvents')
      }, 200)
    },

    showArtistEvents() {
      const artistObj = { artistId: this.artistId, catId: this.catId }
      this.$store.dispatch('artists/getArtistEvents', artistObj)
      this.$store.dispatch('artists/setCurrentArtist', artistObj)
      this.$store.dispatch('events/setCurrentCountryCode', '')
      // dirty fix to force ui update
      setTimeout(() => {
        this.$root.$emit('updateArtistEvents')
      }, 200)
    },
    getTotal() {
      return 100
    },
    fullCountryName(name) {
      const fullName = query(name)
      return fullName[0].name
    }
  }
}
</script>

<style lang="scss" scoped></style>
