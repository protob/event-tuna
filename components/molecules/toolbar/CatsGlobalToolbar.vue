<template>
  <section class="has-helper toolbar-cats-main" :data-name="$options.name">
    <v-container>
      <v-row no-gutters>
        <v-col>
          <v-btn
            color="primary"
            class="mx-1"
            dark
            @click="showModal('add_category')"
          >
            <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
          </v-btn>
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
export default {
  name: 'CatsGlobalToolbar',
  components: {},
  props: [],
  data() {
    return {
      items: ['asc', 'desc'],
      sorting: 'asc'
    }
  },
  computed: {},
  mounted() {},
  methods: {
    ...mapMutations(['showModal']),

    sortItems() {
      // console.log(this.sorting)
      // this.$store.dispatch('cats/sortCats', this.sorting)
    }
  }
}
</script>

<style lang="scss" scoped></style>
