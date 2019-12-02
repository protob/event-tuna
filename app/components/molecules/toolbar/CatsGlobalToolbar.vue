<template>
  <section class="has-helper toolbar-cats-main" :data-name="$options.name">
    <v-container>
      <v-row no-gutters>
        <v-col>
          <btn :icon="'plus'" @click="showModal('add_category')" />
        </v-col>
        <v-col>
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
import { mapMutations } from 'vuex'
import btn from '~/components/atoms/BaseBtn'
export default {
  name: 'CatsGlobalToolbar',
  components: { btn },
  props: [],
  data() {
    return {
      items: ['asc', 'desc'],
      sorting: 'asc'
    }
  },

  methods: {
    ...mapMutations(['showModal']),
    sortItems() {
      this.$store.dispatch('cats/sortCats', this.sorting)
    }
  }
}
</script>

<style lang="scss" scoped></style>
