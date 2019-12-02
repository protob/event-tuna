<template>
  <section class="has-helper toolbar-event-single" :data-name="$options.name">
    <a target="_blank" :href="googleMapUrl">
      <font-awesome-icon
        class="red--text d-inline-block mx-1"
        :icon="['fas', 'map-marker-alt']"
      ></font-awesome-icon>
    </a>
    <span
      v-if="country"
      class="flag-icon d-inline-block mr-1"
      :class="['flag-icon-' + country.code2]"
    ></span>

    <font-awesome-icon
      class="red--text d-inline-block mr-1"
      :icon="['fas', 'star']"
    ></font-awesome-icon>
  </section>
</template>

<script>
export default {
  name: 'EventSingleToolbar',
  components: {},
  props: ['country', 'item'],
  data() {
    return {}
  },
  computed: {
    googleMapUrl() {
      const url = this.item.venue
        ? 'https://maps.google.com/?q=' +
          this.item.venue.lat +
          ',' +
          this.item.venue.lng
        : ''
      return url
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
