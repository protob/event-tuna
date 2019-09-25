<template>
  <v-card class="has-helper item ma-1 py-2 px-4">
    <div class="component-helper">{{ $options.name }}</div>
    <div class="category-stats">
      <v-container fluid="fluid" pt-0="pt-0" pb-0="pb-0">
        <v-row :align="'start'" :justify="'start'">
          <v-card class="ma-1 py-2 px-4 blue-grey darken-4 elevation-0">
            <div class="category-stats-artists">
              <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
              <span
                v-if="catsStats[catId]"
                :key="artistCountKey"
                class="arists-count"
                >{{ catsStats[catId].artists }}</span
              >
              <span v-else>0</span>
            </div>
          </v-card>
          <v-card class="ma-1 pa-2 elevation-0 blue-grey darken-3">
            <div class="category-stats-events">
              <font-awesome-icon
                class="red--text"
                :icon="['fas', 'map-marker']"
              ></font-awesome-icon>
              <span v-if="catsStats[catId]" class="arists-count">
                {{ catsStats[catId].events }}
              </span>
              <span v-else>0</span>
            </div>
          </v-card>
          <v-card class="ma-1 my-0 pa-2 elevation-0">
            <v-btn
              depressed="depressed"
              color="primary"
              @click="toggleCatDetails"
              >details</v-btn
            >
          </v-card>
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
  name: 'ArtistCatsStatsTotals',
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

<style lang="scss" scoped></style>
