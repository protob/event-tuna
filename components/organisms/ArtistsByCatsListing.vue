<template>
  <section class="cats-listing has-helper" :data-name="$options.name">
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
import { fireDb } from '~/plugins/firebase.js'
import CatsGlobalToolbar from '~/components/molecules/toolbar/CatsGlobalToolbar'
import artistCatItem from '~/components/molecules/artist/ArtistCatItem'

export default {
  name: 'ArtistByCatsListing',
  components: {
    CatsGlobalToolbar,
    artistCatItem
  },
  mixins: [Vue2Filters.mixin],

  data() {
    return {
      writeSuccess: false,
      readSuccess: false
    }
  },
  computed: {
    ...mapGetters('cats', {
      order: 'getOrder',
      cats: 'getCats'
    }),
    ...mapGetters('auth', {
      user: 'getAuthUser'
    })
  },
  mounted() {
    this.readCatsFromFirestore()
    this.readStatsFromFirestore()
    this.getIdNameMap()
  },
  methods: {
    async readCatsFromFirestore() {
      const refs = fireDb.collection('cats')
      const userId = this.$cookies.get('authId') + ''
      const filteredArr = []
      try {
        await refs
          .where('userId', '==', userId)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              filteredArr.push({ ...doc.data() })
            })
          })
      } catch (e) {
        // TODO: error handling
        console.error(e)
      }
      this.$store.dispatch('cats/populateCats', filteredArr)
      this.readSuccess = true
    },

    async readStatsFromFirestore() {
      const refs = fireDb.collection('catsStats')
      const userId = this.$cookies.get('authId') + ''
      const catsStatsObj = {}
      try {
        await refs
          .where('userId', '==', userId)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              catsStatsObj[doc.id] = doc.data()
            })
          })
      } catch (e) {
        // TODO: error handling
        console.error(e)
      }
      this.$store.dispatch('cats/populateCatsSats', catsStatsObj)
    },

    async getIdNameMap() {
      const ref = fireDb.collection('artists')
      let snap
      try {
        snap = await ref.get()
      } catch (e) {
        // TODO: error handling
        console.error(e)
      }

      const map = {}
      const catsObj = snap.docs.map((doc) => {
        const item = doc.data()
        map[item.id] = item.displayName
      })
      this.$store.dispatch('cats/populateIdNameMap', map)
    }
  }
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
