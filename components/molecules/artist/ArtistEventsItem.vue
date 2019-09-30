<template>
  <section class="has-helper artist-event-item" :data-name="$options.name">
    <v-card class="item ma-1 py-2 px-4">
      <div>
        <div class="subtitle">{{ item.displayName }}</div>
      </div>

      <!-- <div class="my-2"> -->
      <div class="toolbar-wrap d-flex align-center justify-space-between">
        <div class="buttons-wrap mr-2 d-inline-block">
          <div class="mr-2 my-2 d-inline-block">
            <v-btn
              depressed="depressed"
              small="small"
              color="primary"
              @click="toggleDetails"
              >details</v-btn
            >
          </div>
          <a target="_blank" href="https://google.pl" class="d-inline-block">
            <div class="my-2 mr-2">
              <v-btn depressed="depressed" small="small" color="primary"
                >Link</v-btn
              >
            </div>
          </a>

          <v-btn
            disabled="disabled"
            outlined="outlined"
            depressed="depressed"
            small="small"
            color="primary"
            class="mr-2"
            >{{ item.type }}</v-btn
          >
        </div>
        <div>
          <div class="date subtitle d-inline-block">{{ item.start.date }}</div>
          <toolbar-event-single :country="country" class="d-inline-block" />
        </div>
      </div>
      <!-- details -->

      <artist-event-details
        class="d-inline-block"
        :item="item"
        :details-visible="detailsVisible"
      ></artist-event-details>
    </v-card>
  </section>
</template>

<script>
import toolbarEventSingle from '~/components/molecules/toolbar/EventSingleToolbar'
import artistEventDetails from '~/components/molecules/artist/ArtistEventsItemDetails'
const crg = require('country-reverse-geocoding').country_reverse_geocoding()
const getCountryISO2 = require('country-iso-3-to-2')
export default {
  name: 'ArtistEventItem',

  components: {
    toolbarEventSingle,
    artistEventDetails
  },
  props: {
    item: {
      type: Object || Array,
      required: true
    },
    k: {
      type: String
    }
  },
  data() {
    return {
      detailsVisible: false,
      country: {}
    }
  },
  computed: {},

  mounted() {
    this.country = this.getCountry(
      this.$props.item.location.lat,
      this.$props.item.location.lng
    )
  },
  methods: {
    getCountry(lat, lng) {
      const country = crg.get_country(lat, lng)

      if (country) {
        const lc = country.code.toLowerCase()

        country.code2 = getCountryISO2(country.code).toLowerCase()
        country.code = lc
      }

      return country
    },

    toggleDetails() {
      this.detailsVisible = !this.detailsVisible
      // TODO filter users
    }
  }
}
</script>

<style lang="scss" scoped></style>
