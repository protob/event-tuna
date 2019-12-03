<template>
  <!---col---->
  <v-container pa-0 ma-0 class="has-filter geo-time-filter">
    <v-layout fluid wrap align-center>
      <v-flex xs5>
        <v-container bg pa-0 ma-0 fill-height grid-list-md text-xs-center>
          <v-text-field
            class="small-input mx-1"
            :value="getStartDate"
            label="start date"
            small
            solo
            hide-details
            single-line
            outlined
            @input="updateStartDate($event.target.value)"
          ></v-text-field>

          <calendar :purpose="'start'" class="mx-1" />
          <!-- <start-date class="mx-1" /> -->
        </v-container>
      </v-flex>
      <!---col---->
      <v-flex xs5>
        <v-container fluid bg pa-0 ma-0 fill-height grid-list-md text-xs-center>
          <v-text-field
            class="small-input mx-1"
            :value="getEndDate"
            label="end date"
            solo
            hide-details
            single-line
            outlined
            @input="updateEndDate($event.target.value)"
          ></v-text-field>
          <calendar :purpose="'end'" class="mx-1" />
          <!-- <end-date class="mx-1" /> -->
        </v-container>
      </v-flex>

      <v-flex xs2>
        <v-container fluid bg pa-0 ma-0 fill-height grid-list-md text-xs-center>
          <btn :icon="'search'" @click="filterEventsByTimeRange" />
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import btn from '~/components/atoms/BaseBtn'

import calendar from '~/components/molecules/toolbar/GeoTimeToolbarCalendar'
export default {
  name: 'GeoTimeFilter',
  components: { btn, calendar },
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapGetters('events', ['getStartDate', 'getEndDate'])
  },

  methods: {
    ...mapActions('events', ['updateStartDate', 'updateEndDate']),
    filterEventsByTimeRange() {
      const range = {
        startDate: this.getStartDate,
        endDate: this.getEndDate
      }
      this.$store.dispatch('events/filterEventsByTimeRange', range)
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  height: 100%;
}
</style>
