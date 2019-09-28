<template>
  <div>
    <v-container class="form-wrap">
      <base-form @hideModal="hideModal" :form-name="'Login'" />
    </v-container>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import BaseForm from '~/components/molecules/form/BaseForm'
export default {
  components: { BaseForm },
  methods: {
    ...mapMutations(['hideModal'])
  }
}
</script>

<style lang="scss" scoped>
.form-wrap {
  max-width: 400px;
}
</style>
