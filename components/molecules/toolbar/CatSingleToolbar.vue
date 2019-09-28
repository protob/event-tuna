<template>
  <section class="has-helper toolbar-cat-single" :data-name="$options.name">
    <v-container my-0 py-0>
      <v-row>
        <v-col :cols="12" :md="6" class="d-flex justify-start my-0 py-0">
          <v-btn
            color="primary"
            class="mx-1"
            dark
            @click="showModal('add_artist')"
          >
            <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
          </v-btn>
        </v-col>
        <!--add cat form-->
        <v-col cols="12" :md="6" class="d-flex justify-end my-0 py-0">
          <v-btn
            color="primary"
            class="mx-1"
            dark
            @click="showModal('edit_category')"
          >
            <font-awesome-icon :icon="['fas', 'edit']"></font-awesome-icon>
          </v-btn>

          <dialog-modal :text="'x'" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import DialogModal from '~/components/molecules/form/DialogModal'
export default {
  name: 'CatSingleToolbar',
  components: { DialogModal },
  props: ['totalEvent', 'catId', 'catName'],
  data() {
    return {
      dialog: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    ...mapMutations(['showModal']),
    deleteCat() {
      // this.$store.dispatch('cats/deleteCat', this.catId)
      // this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
