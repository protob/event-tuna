<template>
  <section class="has-helper toolbar-artist-single">
    <div class="component-helper">{{ $options.name }}</div>

    <font-awesome-icon
      class="red--text"
      :icon="['fas', 'map-marker']"
    ></font-awesome-icon>
    {{ totalEvents(catId, artistId) }}
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">
          <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Delete {{ artistName }}</v-card-title>
        <v-card-text>Are you sure?</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green darken-1" text @click="deleteArtist"
            >Proceed</v-btn
          >
          <v-btn color="red darken-1" text @click="dialog = false"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn color="primary" dark @click="fetchEvents">Update</v-btn>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ArtistSingleToolbar',
  components: {},
  props: ['artistId', 'artistName', 'catId'],
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters('cats', {
      totalEvents: 'getTotalArtistEvents'
    })
  },
  mounted() {},
  methods: {
    deleteArtist() {
      const obj = { artistId: this.artistId, catId: this.catId }
      this.$store.dispatch('cats/deleteArtistFromCat', obj)
      this.dialog = false
    },

    async fetchEvents() {
      const obj = {
        artistId: this.artistId,
        catId: this.catId,
        artistName: this.artistName
      }

      await this.$store.dispatch('cats/fetchArtistEvetns', obj)
      this.$forceUpdate()
      this.$root.$emit('updateArtistStats') // update sibling
    }
  }
}
</script>

<style lang="scss" scoped></style>
