<template>
  <section class="has-filter geo-time-filter">
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col class="pt-0 pb-0">
          <v-flex xs12 sm12>
            <v-container bg fill-height grid-list-md text-xs-center>
              <v-layout row wrap align-center>
                <v-flex xs8>
                  <v-text-field
                    class="small-input"
                    :value="getStartDate"
                    label="start date"
                    small
                    solo
                    @input="updateStartDate($event.target.value)"
                    hide-details
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <start-date />
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-col>
        <v-col class="pt-0 pb-0">
          <v-flex xs12 sm12>
            <v-container bg fill-height grid-list-md text-xs-center>
              <v-layout row wrap align-center>
                <v-flex xs8>
                  <v-text-field
                    class="small-input"
                    :value="getEndDate"
                    label="end date"
                    solo
                    hide-details
                    @input="updateEndDate($event.target.value)"
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <end-date />
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-col>
        <v-col>
          <v-btn color="primary" @click="filterEventsByTimeRange">
            <font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
          </v-btn>
          <v-btn color="primary" onclick="alert('TODO')">Region</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </section>
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
</style>
