<template>
  <section
    v-if="detailsVisible"
    class="has-helper artist-event-detials"
    :data-name="$options.name"
  >
    <!--venue-->
    <v-card class="item-inner grey darken-4 pa-2 my-2">
      <v-container fluid="fluid" pt-0="pt-0" pb-0="pb-0">
        <!-- row -->
        <v-row :align="'start'" :justify="'start'">
          <div class="subtitle-1 data-k">Venue:&nbsp;</div>
          <div class="subtitle-1 data-v">
            <a :href="item.venue.uri">{{ item.venue.displayName }}</a>
          </div>
        </v-row>
        <!-- row -->

        <!-- row -->
        <v-row :align="'start'" :justify="'start'">
          <div class="subtitle-1 data-k">Location:&nbsp;</div>
          <div class="subtitle-1 data-v">
            <a :href="item.venue.metroArea.uri">
              {{ item.venue.metroArea.displayName }}
              {{ item.venue.metroArea.country.displayName }}
            </a>
            <a target="_blank" :href="googleMapUrl">
              <font-awesome-icon
                class="red--text d-inline-block mx-1"
                :icon="['fas', 'map-marker-alt']"
              ></font-awesome-icon>
            </a>
          </div>
        </v-row>
        <!-- row -->
      </v-container>
    </v-card>
    <!--venue-->
    <v-card class="item-inner grey darken-4 pa-2 my-2">
      <v-container fluid="fluid" pt-0="pt-0" pb-0="pb-0">
        <!-- row -->
        <v-row :align="'start'" :justify="'start'">
          <div class="subtitle-1 data-k">Line up:</div>
        </v-row>
        <!-- row -->

        <!-- row -->
        <v-row :align="'start'" :justify="'start'">
          <div v-for="(artist, key) in item.performance" :key="key">
            <a :href="artist.artist.uri">{{ artist.displayName }}</a>
            <span
              v-if="
                item.performance.length > 1 &&
                  key != item.performance.length - 1
              "
              >,&nbsp;</span
            >
          </div>
        </v-row>
        <!-- row -->
      </v-container>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'ArtistEventsItemDetails',
  components: {},
  props: {
    item: {
      type: Object || Array,
      required: true
    },

    detailsVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      ignoredKeys: [
        'id',
        'displayName',
        'type',
        'url',
        'status',
        'popularity',
        'ageRestriction',
        'series',
        'userId',
        'uri',
        'start',
        'end',
        'flaggedAsEnded'
      ]
    }
  },
  computed: {
    googleMapUrl() {
      const url = this.item.location
        ? 'https://maps.google.com/?q=' +
          this.item.location.lat +
          ',' +
          this.item.location.lng
        : ''
      return url
    },

    visibleRows() {
      console.log(this.item)

      const keys = Object.keys(this.item)
      const filterdObj = {}
      keys.forEach((elKey) => {
        if (!this.ignoredKeys.includes(elKey)) {
          filterdObj[elKey] = this.item[elKey]
        }
      })

      return filterdObj
    }
  }
}
</script>

<style lang="scss" scoped></style>
