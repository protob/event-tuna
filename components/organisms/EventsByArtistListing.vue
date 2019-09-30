<template>
  <section class="has-helper events-listing" :data-name="$options.name">
    <v-card class="item ma-1 py-4 px-4 grey darken-4">
      <v-container class="py-0">
        <v-row>
          <v-col :cols="12" :md="8" class="px-0">
            <div class="headline text-uppercase" v-if="getCurrentCountryCode">
              <span>
                {{ getCurrentCountryCode }}
                -
              </span>
              Events
            </div>
            <div v-else class="headline text-uppercase">
              <span v-if="currentArtistId">
                {{ getArtistNameById(currentArtistId) }}
                -
              </span>
              Events
            </div>
          </v-col>
          <v-col :cols="12" :md="4" class="pa-0">
            <EventsGlobalToolbar class="select-small-wrap" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div v-bar class="events-listing-inner">
      <div>
        <artist-event-item
          v-for="(item, idx) in orderBy(getCurrentEvents, orderKey, order)"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Vue2Filters from 'vue2-filters'
import EventsGlobalToolbar from '~/components/molecules/toolbar/EventsGlobalToolbar'
import artistEventItem from '~/components/molecules/artist/ArtistEventsItem'
import { fireDb } from '~/plugins/firebase.js'

export default {
  name: 'AllArtistsEventsListing',
  components: {
    EventsGlobalToolbar,
    artistEventItem
  },
  mixins: [Vue2Filters.mixin],

  data() {
    return {
      detailsVisible: false,
      writeSuccessful: false,
      readSuccessful: false,
      text: '',
      events: [],
      artistName: ''
    }
  },
  computed: {
    ...mapGetters('events', {
      order: 'getOrder',
      orderKey: 'getOrderKey',
      getCurrentEvents: 'getCurrentEvents',
      getCurrentCountryCode: 'getCurrentCountryCode'
    }),

    ...mapGetters('cats', {
      getArtistNameById: 'getArtistNameById'
    }),

    ...mapGetters('artists', {
      getEventsByArtist: 'getEventsByArtist',
      currentArtistId: 'currentArtistId'
    })
  },
  mounted() {
    this.readFromFirestore()
    this.$root.$on('updateArtistEvents', (data) => {
      this.$forceUpdate()
    })
  },
  methods: {
    async readFromFirestore() {
      const ref = fireDb
        .collection('eventsByArtist')
        .doc('7KuDSl0zuwXDnACcXhlt')

      let snap
      try {
        snap = await ref.get()
      } catch (e) {
        // TODO: error handling
        console.error(e)
      }

      const rawEvents = snap.data()

      this.events = rawEvents.events.resultsPage.results.event

      this.artistName = rawEvents.artistName
      this.readSuccessful = true
    },

    toggleDetails() {
      this.detailsVisible = !this.detailsVisible
      // TODO filter users
    }
  }
}
</script>

<style lang="scss" scoped>
.events-listing-inner {
  display: block;
  overflow: hidden;
  height: 80vh;
}

.data-k {
  width: 30%;
}

.data-v {
  width: 70%;
}
</style>
