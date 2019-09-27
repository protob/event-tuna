<template>
  <section class="has-helper artist-item">
    <!-- <div class="component-helper">{{ $options.name }}</div> -->
    <v-card class="item ma-1 py-2 px-4 grey darken-4">
      <div class="headline">
        <v-card
          class="blue-grey darken-4 px-2 mr-2"
          outlined
          style="float:left"
          >{{ idx + 1 }}</v-card
        >
        <h1 class="headline d-inline-block">{{ artistIdMap[artistId] }}</h1>
        <h3 class="headline d-inline-block">- {{ artistId }}</h3>
      </div>
      <toolbar-artist-single
        :cat-id="catId"
        :artist-id="artistId"
        :artist-name="artistIdMap[artistId]"
        :total-events="total"
      />
    </v-card>
    <artist-cat-stats-single
      :cat-id="catId"
      :artist-id="artistId"
      :events-stats="eventStats"
    ></artist-cat-stats-single>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import toolbarArtistSingle from '~/components/molecules/toolbar/ArtistSingleToolbar'
import artistCatStatsSingle from '~/components/molecules/artist/ArtistCatsStatsSingle'

export default {
  name: 'ArtistItem',
  components: {
    toolbarArtistSingle,
    artistCatStatsSingle
  },
  props: {
    catId: {},
    eventStats: {},
    artistId: {
      required: true
    },
    idx: {
      type: String | Number
    }
  },
  data() {
    return {
      total: 0,
      artistIdNameMap: {
        251546: 'Aphex Twin',
        507825: 'Kraftwerk',
        4083451: 'Helena Hauff'
      }
    }
  },
  computed: {
    ...mapGetters('cats', {
      artistIdMap: 'getArtistIdMap'
    })
  },
  mounted() {
    this.total = this.countEventsTotal()
  },
  methods: {
    countEventsTotal() {
      const cat = this.$props.eventStats

      if (cat === null) {
        return false
      }

      let total = 0
      Object.keys(cat.artistEvents).forEach((k) => {
        const item = cat.artistEvents[k]

        total++
      })
      return total
    },
    formatName(name) {
      return name
        .split('+')
        .join(' ')
        .toUpperCase()
    }
  }
}
</script>

<style lang="scss" scoped></style>
