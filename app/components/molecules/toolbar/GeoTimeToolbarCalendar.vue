<template>
  <div>
    <btn :icon="'calendar'" :cssClass="'mx-0'" @click.stop="dialog = true" />
    <v-dialog v-model="dialog" persistent max-width="320px">
      <form @submit.prevent="onSave">
        <v-card :elevation="0">
          <v-card-title class="blue darken-1">
            <span class="headline">Start Date</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-date-picker v-model="selectedDate"></v-date-picker>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="grey darken-4">
            <v-spacer></v-spacer>

            <btn text type="submit">Save</btn>
            <btn text @click="dialog = false">Close</btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
import btn from '~/components/atoms/BaseBtn'
export default {
  name: 'GeoTimeFitlerStartDate',
  components: { btn },
  props: ['purpose'],
  data() {
    return {
      selectedDate: '',
      dialog: false
    }
  },

  methods: {
    onSave() {
      if (this.purpose === 'start') {
        this.$store.dispatch('events/updateStartDate', this.selectedDate)
      } else {
        this.$store.dispatch('events/updateEndDate', this.selectedDate)
      }

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
