<template>
  <div>
    <v-btn color="primary" dark @click.stop="dialog = true">
      <font-awesome-icon
        class="white--text"
        :icon="['fas', 'calendar-alt']"
      ></font-awesome-icon>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="320px">
      <form @submit.prevent="onSave">
        <v-card :elevation="0">
          <v-card-title class="blue darken-1">
            <span class="headline">End Date</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-date-picker v-model="endDate"></v-date-picker>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="grey darken-4">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text type="submit">Save</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'GeoTimeFitlerEndDate',
  components: {},
  props: [],
  data() {
    return {
      endDate: '',
      dialog: false
    }
  },
  methods: {
    onSave() {
      this.$store.dispatch('events/updateEndDate', this.endDate)
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-picker {
  box-shadow: none;
  -webkit-box-shadow: none;
}
</style>
