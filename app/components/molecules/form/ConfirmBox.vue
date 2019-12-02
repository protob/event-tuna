<template>
  <div>
    <form @submit.prevent="onSave">
      <v-card>
        <v-card-title class="headline text-capitalize">{{
          formatedName
        }}</v-card-title>
        <v-card-text>Are you sure?</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green darken-1" text @click="deleteItem">Proceed</v-btn>
          <v-btn color="blue darken-1" text @click="hideModal">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  props: ['formName'],
  data() {
    return {
      userData: {}
    }
  },
  computed: {
    ...mapGetters(['getEditedItemId', 'getArtistCatId', 'isArtist']),
    formatedName() {
      return this.formName.split('_').join(' ')
    }
  },
  methods: {
    deleteItem() {
      if (this.isArtist) {
        const obj = {
          artistId: this.getEditedItemId,
          catId: this.getArtistCatId
        }

        // delete artist
        this.$store.dispatch('cats/deleteArtistFromCat', obj)
      } else {
        // delete cat
        this.$store.dispatch('cats/deleteCat', this.getEditedItemId)
      }
      this.hideModal()
    },

    hideModal() {
      this.$emit('hideModal')
    }
  }
}
</script>

<style scoped></style>
