<template>
  <div>
    <form @submit.prevent="onSave">
      <v-card>
        <v-card-title class="headline text-capitalize">
          {{ formatedName }}
        </v-card-title>
        <v-card-text>Are you sure?</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green darken-1" text @click="deleteCat">Proceed</v-btn>
          <v-btn color="blue darken-1" text @click="hideModal">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['formName'],
  data() {
    return {
      userData: {}
    }
  },
  computed: {
    formatedName() {
      return this.formName.split('_').join(' ')
    }
  },
  methods: {
    hideModal() {
      this.$emit('hideModal')
    }
  }
}
</script>

<style scoped></style>
