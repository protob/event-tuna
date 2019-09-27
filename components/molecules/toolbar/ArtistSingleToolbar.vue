<template>
  <section class="has-helper toolbar-artist-single">
    <!-- <div class="component-helper">{{ $options.name }}</div> -->

    <v-container class="d-flex justify-space-between px-0">
      <div>
        <v-btn color="primary" dark class="mr-2" @click="fetchEvents"
          >Update</v-btn
        >
        <div class="d-inline-block">
          <font-awesome-icon
            class="red--text"
            :icon="['fas', 'map-marker']"
          ></font-awesome-icon>
          {{ totalEvents(catId, artistId) }}
        </div>
      </div>

      <dialog-modal :text="'x'" />
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import dialogModal from '~/components/molecules/form/dialogModal'
export default {
  name: 'ArtistSingleToolbar',
  components: { dialogModal },
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
