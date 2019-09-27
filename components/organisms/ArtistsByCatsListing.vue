<template>
  <section class="cats-listing has-helper">
    <!-- <div class="component-helper">{{ $options.name }}</div> -->

    <!-- global toolbar-->
    <v-card class="item ma-1 py-4 px-4 grey darken-4">
      <v-row no-gutters>
        <v-col>
          <v-container px-0 mx-0>
            <div class="headline text-uppercase">Categories</div>
          </v-container>
        </v-col>
        <v-col>
          <CatsGlobalToolbar class="select-small-wrap" />
        </v-col>
      </v-row>
    </v-card>

    <!-- listing-->
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
import { mapGetters } from 'vuex'

import CatsGlobalToolbar from '~/components/molecules/toolbar/CatsGlobalToolbar'
import artistCatItem from '~/components/molecules/artist/ArtistCatItem'

export default {
  name: 'AllArtistsCatsListing',
  components: {
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
