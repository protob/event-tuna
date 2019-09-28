<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="12"
    >
      <v-text-field
        :label="this.$attrs.label"
        :value="value"
        @input="update($event)"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script>
import { FormMixin } from 'formvuelatte'
export default {
	mixins: [FormMixin],
	methods: {
		log(data) {
			console.log(data)
		}
	}
}
</script>
