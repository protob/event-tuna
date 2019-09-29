<template>
  <div>
    <div class="text-center">
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">{{ user.userName }}</v-btn>
        </template>

        <v-list>
          <v-list-item>
            <a @click.prevent="$store.dispatch('auth/logOut')">Log Out</a>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserWidget',
  components: {},
  props: ['user'],
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
