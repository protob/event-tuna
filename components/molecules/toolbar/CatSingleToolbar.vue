<template>
  <section class="has-helper toolbar-cat-single" :data-name="$options.name">
    <v-container my-0 py-0>
      <v-row>
        <v-col :cols="12" :md="6" class="d-flex justify-start my-0 py-0">
          <!--add artist-->
          <v-btn
            color="primary"
            class="mx-1"
            dark
            @click="
              showModal({
                name: 'add_artist',
                artistCatId: catId,
                isArtist: true
              })
            "
          >
            <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
          </v-btn>
        </v-col>

        <v-col cols="12" :md="6" class="d-flex justify-end my-0 py-0">
          <!--edit cat-->
          <v-btn
            color="primary"
            class="mx-1"
            dark
            @click="showModal({ name: 'edit_category', id: catId })"
          >
            <font-awesome-icon :icon="['fas', 'edit']"></font-awesome-icon>
          </v-btn>
          <!--delete cat-->
          <v-btn
            color="primary"
            class="mx-1"
            dark
            @click="showModal({ name: 'confirm_delete_category', id: catId })"
          >
            <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'CatSingleToolbar',
  components: {},
  props: ['totalEvent', 'catId', 'catName'],
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    ...mapMutations(['showModal'])
  }
}
</script>

<style lang="scss" scoped></style>
