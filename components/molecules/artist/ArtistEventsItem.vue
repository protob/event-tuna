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
            <btn depressed small @click="toggleDetails">details</btn>
          </div>
          <a target="_blank" :href="item.uri" class="d-inline-block">
            <div class="my-2 mr-2">
              <btn :depressed="'depressed'" :small="'small'">Link</btn>
            </div>
          </a>
          <btn
            disabled
            outlined
            small
            :css-class="'mr-2'"
            @click="showModal({ name: 'confirm_delete_category', id: catId })"
            >{{ item.type }}</btn
          >
        </div>
        <div>
          <div class="date subtitle d-inline-block">{{ item.start.date }}</div>
          <toolbar-event-single
            :country="country"
            :item="item"
            class="d-inline-block"
          />
        </div>
      </div>
      <!-- details -->

      <artist-event-details
        class="d-block"
        :item="item"
        :details-visible="detailsVisible"
      ></artist-event-details>
    </v-card>
  </section>
</template>

<script>
import toolbarEventSingle from '~/components/molecules/toolbar/EventSingleToolbar'
import artistEventDetails from '~/components/molecules/artist/ArtistEventsItemDetails'
import btn from '~/components/atoms/BaseBtn'
const crg = require('country-reverse-geocoding').country_reverse_geocoding()
const getCountryISO2 = require('country-iso-3-to-2')
export default {
  name: 'ArtistEventItem',

  components: {
    toolbarEventSingle,
    artistEventDetails,
    btn
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
