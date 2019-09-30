<template>
  <div>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title class="headline text-capitalize">{{
          formatedName
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="text-center push-top">
          <v-btn color="white darken-1" text @click="hideModal">Close</v-btn>
        </div>
      </v-toolbar>
      <ValidationObserver ref="obs">
        <SchemaForm v-model="userData" :schema="schema">
          <!-- login/register -->
          <v-card-actions v-if="isLogin">
            <v-container>
              <v-layout justify-center class="pb-4">
                <v-btn @click="clear">Clear</v-btn>
                <v-btn class="blue" @click="submit">Submit</v-btn>
              </v-layout>

              <v-layout justify-center>
                <v-flex xs12 class="btns-wrap">
                  <div class="text-center push-top">
                    <button class="btn-red btn-xsmall" @click="resetPassword">
                      <i class="fa fa-google fa-btn"></i>Reset password
                    </button>
                  </div>
                  <div class="text-center push-top">
                    <button class="btn-red btn-xsmall" @click="loginWithGoogle">
                      <i class="fa fa-google fa-btn"></i>Login with Google
                    </button>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-actions>
        </SchemaForm>
      </ValidationObserver>
    </v-card>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import SchemaForm from './SchemaForm'
import FormText from './FormTextField'

const LOGIN_SCHEMA = {
  email: {
    component: FormText,
    required: true,
    label: 'Email',
    rules: 'required|email'
  },
  password: {
    component: FormText,
    label: 'Password',
    rules: 'required'
  }
}

const REGISTER_SCHEMA = {
  name: {
    component: FormText,
    label: 'Name',
    rules: 'required|max:20|asyncRuleUserExist'
  },
  email: {
    component: FormText,
    label: 'Email',
    rules: 'required|email|asyncRuleEmailNotExist'
  },
  password: {
    component: FormText,
    label: 'Password',
    rules: 'required'
  }
}

export default {
  components: { SchemaForm, ValidationObserver },
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
        this.formName.toLowerCase() === 'login' ? LOGIN_SCHEMA : REGISTER_SCHEMA

      return schema
    }
  },

  methods: {
    // general methods
    hideModal() {
      this.$emit('hideModal')
    },

    // login methods
    clear() {
      this.userData = {}
      this.$nextTick(() => {
        this.$refs.obs.reset()
      })
    },

    resetPassword() {},

    async submit() {
      const result = await this.$refs.obs.validate()
      if (result) {
        this.loginWithEmail()
      }
    },
    loginWithEmail() {
      this.$store
        .dispatch('auth/loginWithEmailAndPassword', {
          email: this.userData.email,
          password: this.userData.password
        })
        .then(() => {
          this.successRedirect()
          this.hideModal()
        })
        .catch((error) => alert(error.message))
    },
    loginWithGoogle() {
      this.$store
        .dispatch('auth/loginWithGoogle')
        .then(() => this.successRedirect())
        .catch((error) => alert(error.message))
    },

    successRedirect() {
      const redirectTo = this.$route.query.redirectTo || { path: '/' }
      this.$router.push(redirectTo)
    }
  }
}
</script>
