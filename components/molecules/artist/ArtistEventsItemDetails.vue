<template>
  <section v-if="detailsVisible" class="has-helper artist-event-detials">
    <div class="component-helper">{{ $options.name }}</div>

    <v-card
      v-for="(v, k) in item"
      :key="k"
      class="item-inner grey darken-4 pa-2 my-2"
    >
      <v-container fluid="fluid" pt-0="pt-0" pb-0="pb-0">
        <v-row :align="'start'" :justify="'start'">
          <div class="subtitle-1 data-k">{{ k }} :</div>
          <div class="subtitle-1 data-v">
            <div v-if="typeof v === 'object' && v instanceof Array">
              <div v-for="(vv, kk) in v[1]" v-bind:key="kk">
                <v-container fluid="fluid" pt-0="pt-0" pb-0="pb-0" class="grey">
                  <v-row :align="'start'" :justify="'start'">
                    <strong>{{ kk }}:</strong>
                    <span>{{ vv }}</span>
                  </v-row>
                </v-container>
              </div>
            </div>

            <div v-else-if="typeof v === 'object' && !(v instanceof Array)">
              <div v-for="(vv, kk) in v" v-bind:key="kk">
                <v-container fluid="fluid" py-0 px-6 class="blue-grey darken-4">
                  <v-row :align="'start'" :justify="'start'">
                    <strong class="data-k">{{ kk }}:</strong>
                    <span class="data-v">{{ vv }}</span>
                  </v-row>
                </v-container>
              </div>
            </div>
            <div v-else="v-else">
              <span>{{ v }}</span>
            </div>
          </div>
        </v-row>
      </v-container>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'ArtistEventsItemDetails',
  components: {},
  props: {
    item: {
      type: Object || Array,
      required: true
    },
    k: {
      type: String
    },
    detailsVisible: {
      type: Boolean
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
