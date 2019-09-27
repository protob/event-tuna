<template>
  <v-card
    class="has-helper item ma-1 py-2 px-4 light-blue darken-4"
    :data-name="$options.name"
  >
    <div class="category-stats">
      <v-container fluid py-0>
        <v-row class="wrap align-center">
          <v-btn
            depressed="depressed"
            color="primary"
            class="mr-2"
            @click="toggleCatDetails"
            >details</v-btn
          >

          <div class="category-stats-artists d-inline-block mx-1">
            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
            <span
              v-if="catsStats[catId]"
              :key="artistCountKey"
              class="arists-count"
              >{{ catsStats[catId].artists }}</span
            >
            <span v-else>0</span>
          </div>

          <div class="category-stats-events d-inline-block mx-1">
            <font-awesome-icon
              class="red--text"
              :icon="['fas', 'map-marker']"
            ></font-awesome-icon>
            <span v-if="catsStats[catId]" class="arists-count">
              {{ catsStats[catId].events }}
            </span>
            <span v-else>0</span>
          </div>
        </v-row>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import { tsThisType } from '@babel/types'
import { mapGetters, mapActions } from 'vuex'
import { fireDb } from '~/plugins/firebase.js'
export default {
  name: 'CatsStatsTotals',
  components: {},
  props: ['catId'],
  data() {
    return {
      hasCatsVisible: true,
      artistCountKey: Date.now()
    }
  },
  computed: {
    ...mapGetters({
      catDetailsVisible: 'events/getCatIsDetailVisible',
      catsStats: 'cats/getCatsStats'
      // ...
    })
  },
  mounted() {
    this.$root.$on('updateArtistStats', (data) => {
      // dirty fix
      setTimeout(() => {
        this.$forceUpdate()
      }, 400)
    })
  },
  methods: {
    toggleCatDetails() {
      this.$store.dispatch('events/toggleCatDetails', !this.catDetailsVisible)
    }
  }
}
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid red;
}
</style>
