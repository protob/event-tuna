<template>
  <div>
    <v-container class="form-wrap">
      <base-form :form-name="'Login'" />
    </v-container>
  </div>
</template>

<script>
import BaseForm from '~/components/molecules/form/BaseForm'
export default {
  components: { BaseForm },
  methods: {}
}
</script>

<style lang="scss" scoped>
.form-wrap {
  max-width: 400px;
}
</style>
