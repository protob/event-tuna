<template>
  <v-row>
    <v-col cols="12" sm="6" md="12">
      <ValidationProvider :rules="rules">
        <v-text-field
          slot-scope="{ errors, valid }"
          :value="value"
          :name="label"
          :error-messages="errors"
          :success="valid"
          :label="label"
          required
          @input="update($event)"
        ></v-text-field>
      </ValidationProvider>
    </v-col>
  </v-row>
</template>
<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import FormMixin from '~/mixins/FormMixin.js'
import { required, email, max } from '~/plugins/vee-validate-rules.js'
// vee validate

extend('asyncRuleEmailNotExist', {
  async validate(value) {
    const refs = fireDb.collection('users')

    const filteredArr = []
    await refs
      .where('email', '==', value)

      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          filteredArr.push({ ...doc.data() })
        })
      })

    const cond = !!filteredArr.length
    return cond
  },
  message: 'The email is not registred in the system'
})

extend('max', {
  ...max,
  message: 'max length 20'
})

extend('email', {
  ...email,
  message: 'Please enter correct email'
})
extend('required', {
  ...required,
  message: 'The field is required'
})

export default {
  components: {
    ValidationProvider
  },
  mixins: [FormMixin],
  data() {
    return {
      label: '',
      rules: ''
    }
  },
  computed: {
    // rules() {}
  },
  mounted() {
    this.label = this.$attrs.label
    this.rules = this.$attrs.rules
  },
  methods: {
    genId() {
      return new Date().getTime()
    }
  }
}
</script>
