<template>
  <v-card
    class="has-helper item ma-1 py-2 px-4 light-blue darken-4"
    :data-name="$options.name"
  >
    <div class="category-stats">
      <v-container fluid py-0>
        <v-row class="wrap align-center">
          <btn depressed :css-class="'mr-2'" @click="toggleCatDetails"
            >details</btn
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
            <span v-if="catsStats[catId]" class="arists-count">{{
              catsStats[catId].events
            }}</span>
            <span v-else>0</span>
          </div>
        </v-row>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import btn from '~/components/atoms/BaseBtn'
export default {
  name: 'CatsStatsTotals',
  components: { btn },
  props: ['catId'],
  data() {
    return {
      detailsVisible: false,
      hasCatsVisible: true,
      artistCountKey: Date.now()
    }
  },
  computed: {
    ...mapGetters({
      catDetailsVisible: 'events/getCatIsDetailVisible',
      getCatIdsWithVisibleDetails: 'events/getCatIsDetailVisible',
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
      this.detailsVisible = !this.detailsVisible
      this.$emit('toggleDetails', this.detailsVisible)
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
