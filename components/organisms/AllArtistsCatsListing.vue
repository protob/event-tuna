<template>
  <section class="cats-listing has-helper">
    <div class="component-helper">{{ $options.name }}</div>

    <!-- top toolbar-->
    <v-card class="item ma-1 py-4 px-4 grey darken-4">
      <v-row no-gutters>
        <v-col>
          <div class="display-1">Categories</div>
        </v-col>
        <v-col>
          <CatsGlobalToolbar class="select-small-wrap" />
        </v-col>
      </v-row>
    </v-card>
    <div v-bar class="cats-listing-inner">
      <div>
        <artist-cat-item
          v-for="(cat, idx) in orderBy(cats, 'displayName', order)"
          :key="idx"
          :cat="cat"
        ></artist-cat-item>
      </div>
    </div>
  </section>
</template>

<script>
import Vue2Filters from 'vue2-filters'
import { mapState, mapGetters } from 'vuex'
// import toolbarArtistSingle from '~/components/molecules/toolbar/ArtistSingleToolbar'
// import toolbarCatSingle from '~/components/molecules/toolbar/CatSingleToolbar'
import CatsGlobalToolbar from '~/components/molecules/toolbar/CatsGlobalToolbar'
import artistCatItem from '~/components/molecules/artist/ArtistCatItem'
import { fireDb } from '~/plugins/firebase.js'

export default {
  name: 'AllArtistsCatsListing',
  components: {
    // toolbarArtistSingle,
    // toolbarCatSingle,
    CatsGlobalToolbar,
    artistCatItem
  },
  mixins: [Vue2Filters.mixin],
  props: [],
  data() {
    return {
      writeSuccessful: false,
      readSuccessful: false,
      text: ''
    }
  },
  computed: {
    ...mapGetters(['getState']),

    ...mapGetters('cats', {
      order: 'getOrder',

      cats: 'getCats'
    }),
    ...mapGetters({
      user: 'auth/getAuthUser'
    })
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.cats-listing-inner {
  display: block;
  overflow: hidden;
  height: 80vh;
}

.events-listing-inner {
  display: block;
  overflow: hidden;
  max-height: 80vh;
  height: 800px;
}
</style>
