<template>
  <section class="has-helper toolbar-events-main" :data-name="$options.name">
    <v-container class="toolbar">
      <v-row no-gutters>
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
