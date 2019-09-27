<template>
  <section class="has-helper toolbar-cats-main">
    <v-container>
      <v-row no-gutters>
        <v-col>
          <add-cat-form></add-cat-form>
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
import addCatForm from '~/components/molecules/form/formModal'
export default {
  name: 'CatsGlobalToolbar',
  components: { addCatForm },
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
    sortItems() {
      // console.log(this.sorting)
      // this.$store.dispatch('cats/sortCats', this.sorting)
    }
  }
}
</script>

<style lang="scss" scoped></style>
