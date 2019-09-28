<template>
  <div>
    <form @submit.prevent="onSave">
      <v-card>
        <v-card-title>
          <span class="headline text-capitalize">{{ formatedName }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <SchemaForm v-model="userData" :schema="schema" />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text type="submit">Save</v-btn>
          <v-btn color="blue darken-1" text @click="hideModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
import { SchemaForm } from 'formvuelatte'
import FormText from './FormTextField'

const ADD_ITEM_SCHEMA = {
  name: {
    component: FormText,
    label: 'ITEM'
  }
}
const LOGIN_SCHEMA = {
  email: {
    component: FormText,
    label: 'Email'
  },
  password: {
    component: FormText,
    label: 'Password'
  }
}

const REGISTER_SCHEMA = {
  name: {
    component: FormText,
    label: 'Name'
  },
  email: {
    component: FormText,
    label: 'Email'
  },
  password: {
    component: FormText,
    label: 'Password'
  }
}

export default {
  components: { SchemaForm },
  props: ['formName'],
  data() {
    return {
      userData: {}
    }
  },
  computed: {
    formatedName() {
      return this.formName.split('_').join(' ')
    },
    schema() {
      const schema =
        this.formName.toLowerCase() == 'login'
          ? LOGIN_SCHEMA
          : this.formName.toLowerCase() == 'register'
          ? REGISTER_SCHEMA
          : ADD_ITEM_SCHEMA
      console.log(schema)
      return schema
    }
  },
  methods: {
    hideModal() {
      this.$emit('hideModal')
    }
  }
}
</script>

<style></style>
