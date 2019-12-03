// import Vue from 'vue'
// import VeeValidate from 'vee-validate'

// Vue.use(VeeValidate, {
//   inject: true,
//   fieldsBagName: 'veeFields'
// })

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from '~/plugins/vee-validate-rules.js'
// Add a rule.

extend('required', {
  ...required,
  message: 'The field is required'
})

extend('secret', {
  validate: (value) => value === 'example',
  message: 'This is not the magic word'
})

// Register it globally
// export default Vue.component('ValidationProvider', ValidationProvider)
export default {
  ValidationProvider,
  ValidationObserver
}
