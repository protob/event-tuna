<template>
  <div>
    <v-container class="form-wrap">
      <login-form :form-name="'Register'" />
    </v-container>
  </div>
</template>

<script>
import LoginForm from '~/components/molecules/form/LoginForm'
export default {
  components: { LoginForm },
  methods: {}
}
</script>

<style lang="scss" scoped>
.form-wrap {
  max-width: 400px;
}
</style>
