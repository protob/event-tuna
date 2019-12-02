<template>
  <section class="has-helper toolbar-cat-single" :data-name="$options.name">
    <v-container my-0 py-0>
      <v-row>
        <v-col :cols="12" :md="6" class="d-flex justify-start my-0 py-0">
          <!--add artist-->
          <btn
            :icon="'plus'"
            @click="
              showModal({
                name: 'add_artist',
                artistCatId: catId,
                isArtist: true
              })
            "
          />
        </v-col>

        <v-col cols="12" :md="6" class="d-flex justify-end my-0 py-0">
          <!--edit cat-->
          <btn
            :icon="'edit'"
            @click="showModal({ name: 'edit_category', id: catId })"
          />

          <!--delete cat-->
          <btn
            :icon="'x'"
            @click="showModal({ name: 'confirm_delete_category', id: catId })"
          />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import btn from '~/components/atoms/BaseBtn'
export default {
  name: 'CatSingleToolbar',
  components: { btn },
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
