<template>
  <!---col---->
  <v-container pa-0 ma-0 class="has-filter geo-time-filter">
    <v-layout row wrap align-center>
      <v-flex xs4>
        <v-container bg pa-0 ma-0 fill-height grid-list-md text-xs-center>
          <v-text-field
            class="small-input"
            :value="getStartDate"
            label="start date"
            small
            solo
            hide-details
            single-line
            outlined
            @input="updateStartDate($event.target.value)"
          ></v-text-field>
          <start-date />
        </v-container>
      </v-flex>
      <!---col---->
      <v-flex xs4>
        <v-container bg pa-0 ma-0 fill-height grid-list-md text-xs-center>
          <v-text-field
            class="small-input"
            :value="getEndDate"
            label="end date"
            solo
            hide-details
            single-line
            outlined
            @input="updateEndDate($event.target.value)"
          ></v-text-field>

          <end-date />
        </v-container>
      </v-flex>

      <v-flex xs4>
        <v-container bg pa-0 ma-0 fill-height grid-list-md text-xs-center>
          <v-btn color="primary" @click="filterEventsByTimeRange">
            <font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
          </v-btn>
          <v-btn color="primary" onclick="alert('TODO')">Region</v-btn>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import startDate from '~/components/molecules/toolbar/GeoTimeToolbarStartDate'

import endDate from '~/components/molecules/toolbar/GeoTimeToolbarEndDate'

export default {
  name: 'GeoTimeFilter',
  components: { startDate, endDate },
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapGetters('events', ['getStartDate', 'getEndDate'])
  },
  mounted() {},
  methods: {
    ...mapActions('events', ['updateStartDate', 'updateEndDate']),
    filterEventsByTimeRange() {
      const range = {
        startDate: this.getStartDate,
        endDate: this.getEndDate
      }

      console.log(range)
      this.$store.dispatch('events/filterEventsByTimeRange', range)
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  height: 100%;
}
.geo-time-filter {
  max-width: 500px;
}
</style>
