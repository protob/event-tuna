<template>
  <section class="has-helper toolbar-cat-single" :data-name="$options.name">
    <v-container my-0 py-0>
      <v-row>
        <v-col :cols="12" :md="6" class="d-flex justify-start my-0 py-0">
          <!-- <add-artist-form :cat-id="catId"></add-artist-form> -->
          <form-modal :text="'+'" />
        </v-col>
        <!--add cat form-->
        <v-col cols="12" :md="6" class="d-flex justify-end my-0 py-0">
          <!-- <edit-cat-form :cat-id="catId"></edit-cat-form> -->
          <form-modal :text="'e'" :margins="1" />
          <dialog-modal :text="'x'" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import formModal from '~/components/molecules/form/formModal'
import dialogModal from '~/components/molecules/form/dialogModal'
// import addArtistForm from '~/components/molecules/forms/addArtistForm'
export default {
  name: 'CatSingleToolbar',
  components: { formModal, dialogModal },
  props: ['totalEvent', 'catId', 'catName'],
  data() {
    return {
      dialog: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    deleteCat() {
      this.dialog = false
      this.$store.dispatch('cats/deleteCat', this.catId)
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
