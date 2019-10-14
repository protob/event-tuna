<template>
  <section class="has-helper toolbar-artist-single" :data-name="$options.name">
    <v-container class="d-flex justify-space-between px-0">
      <div>
        <btn :css-class="'mr-2'" @click="fetchEvents">Update</btn>

        <div class="d-inline-block">
          <font-awesome-icon
            class="red--text"
            :icon="['fas', 'map-marker']"
          ></font-awesome-icon>
          {{ totalEvents(catId, artistId) }}
        </div>
      </div>
      <btn
        :icon="'x'"
        @click="
          showModal({
            name: 'confirm_delete_artist',
            id: artistId,
            artistCatId: catId,
            isArtist: true
          })
        "
      />
    </v-container>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import btn from '~/components/atoms/BaseBtn'
export default {
  name: 'ArtistSingleToolbar',
  components: { btn },
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
    ...mapMutations(['showModal']),
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
      this.$root.$emit('updateArtistStats')
    }
  }
}
</script>

<style lang="scss" scoped></style>
