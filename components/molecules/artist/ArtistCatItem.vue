<template>
  <article class="has-helper" @artistCatDetailsToggle="toggleDetails">
    <div class="item">
      <v-card class="item ma-1 py-4 px-4 light-blue darken-4">
        <!-- <div class="component-helper">{{ $options.name }}</div> -->
        <div class="headline text-uppercase mb-2">{{ cat.displayName }}</div>
        <toolbar-cat-single :catId="cat.id" :catName="cat.displayName" />
      </v-card>

      <div class="artist-cats-stats">
        <ArtistCatsStatsTotal :cat-id="cat.id" />
      </div>
      <div v-if="catDetailsVisible" class="cats-items">
        <artist-item
          v-for="(artistId, idx) in cat.artistsIds"
          :key="idx"
          :idx="idx"
          :cat-id="cat.id"
          :event-stats="cat.artistsEvents[artistId]"
          :artist-id="artistId"
        ></artist-item>
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

import toolbarCatSingle from '~/components/molecules/toolbar/CatSingleToolbar'
import ArtistCatsStatsTotal from '~/components/molecules/artist/catsStatsTotals'
import artistItem from '~/components/molecules/artist/artistItem'

const { query } = require('what-country')
export default {
  name: 'ArtistCatItem',
  components: {
    toolbarCatSingle,
    ArtistCatsStatsTotal,

    artistItem
  },
  props: {
    cat: {
      type: Object | Array,
      required: true
    },
    k: {
      type: String | Number
    }
  },
  data() {
    return {
      continents: {
        AF: 'Africa',
        AN: 'Antarctica',
        AS: 'Asia',
        EU: 'Europe',
        NA: 'North America',
        OC: 'Oceania',
        SA: 'South America'
      }
    }
  },
  mounted() {
    // this.countEvents(this.cat)

    this.calculateCatStats()
  },
  computed: {
    ...mapGetters({
      catDetailsVisible: 'events/getCatIsDetailVisible'

      // ...
    })
  },
  methods: {
    calculateCatStats() {
      //  this.$store.dispatch('cats/calculateCatStats', this.cat.id)
    },

    toggleDetails() {
      this.isVisible = !this.isVisible
    },

    formatName(name) {
      return name
        .split('+')
        .join(' ')
        .toUpperCase()
    },
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      )
    },
    showDetails() {}
  }
}
</script>

<style lang="scss" scoped></style>
