<template>
  <section class="has-helper toolbar-events-main">
    <div class="component-helper">{{ $options.name }}</div>
    <v-container class="toolbar">
      <v-row no-gutters>
        <v-col md4>
          <v-btn-toggle mandatory>
            <v-btn @click="changeListingLayout(0)">
              <font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon>
            </v-btn>
            <v-btn @click="changeListingLayout(1)">
              <font-awesome-icon
                :icon="['fas', 'th-large']"
              ></font-awesome-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>

        <v-col md4>
          <v-select
            v-model="sorting"
            :items="items"
            class="scaled-input"
            outlined
            @change="sortItems"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'EventsGlobalToolbar',
  components: {},
  props: [],
  data() {
    return {
      items: ['date asc', 'date desc', 'asc', 'desc'],
      sorting: 'date asc',
      layouts: ['list', 'boxed']
    }
  },
  computed: {},
  mounted() {},
  methods: {
    changeListingLayout(idx) {
      const layout = this.layouts[idx]

      this.$store.dispatch('events/changeListingLayout', layout)
    },
    sortItems() {
      this.$store.dispatch('events/sortEvents', this.sorting)
    }
  }
}
</script>

<style lang="scss" scoped></style>
