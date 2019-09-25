<template>
  <section class="has-helper toolbar-event-single">
    <div class="component-helper">{{ $options.name }}</div>
    <v-card class="ma-1 pa-2 elevation-0">
      <span
        v-if="country"
        class="flag-icon"
        :class="['flag-icon-' + country.code2]"
      ></span>
      <font-awesome-icon
        class="red--text"
        :icon="['fas', 'map-marker-alt']"
      ></font-awesome-icon>
      <font-awesome-icon
        class="red--text"
        :icon="['fas', 'star']"
      ></font-awesome-icon>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'EventSingleToolbar',
  components: {},
  props: ['country'],
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
