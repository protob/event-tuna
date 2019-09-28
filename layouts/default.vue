<template>
  <v-app dark>
    <!---nav left-->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item>
          <v-btn color="primary" dark @click="triggerForm('login')"
            >LOGIN</v-btn
          >
        </v-list-item>

        <v-list-item>
          <v-btn color="primary" @click="triggerForm('register')" dark
            >REGISTER</v-btn
          >
        </v-list-item>

        <v-list-item>
          <v-btn color="primary" @click="triggerForm('recovery')" dark
            >RECOVERY</v-btn
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <!-- top toolbars-->

      <v-container fluid>
        <v-row d-flex justify-space-between class="top-bar-area">
          <v-col cols="12" lg="3" md="3" sm="4" class="hidden-sm-and-down">
            <v-btn depressed="depressed" class="mx-1" color="primary">
              <font-awesome-icon
                :icon="['fas', 'cloud-download-alt']"
                class="hidden-lg-and-up"
              ></font-awesome-icon>
              <span class="hidden-md-and-down">Update</span>
            </v-btn>

            <v-btn color="primary" dark class="mx-1">
              <font-awesome-icon
                :icon="['fas', 'clipboard-list']"
                class="hidden-lg-and-up"
              ></font-awesome-icon>
              <span class="hidden-md-and-down">Planner</span>
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            lg="6"
            md="6"
            sm="4"
            class="d-none d-md-flex justify-center hidden-sm-and-down"
          >
            <geo-time-toolbar class="hidden-sm-and-down" />
            <v-btn color="primary" class="mx-1 hidden-md-and-up" dark>
              <font-awesome-icon
                :icon="['fas', 'calendar-alt']"
              ></font-awesome-icon>
            </v-btn>
          </v-col>

          <v-col cols="12" lg="3" md="3" sm="12" class="d-flex justify-end">
            <nuxt-link to="/">
              <v-btn color="primary" class="mx-1 d-none d-lg-flex" dark>
                <span class="hidden-sm-and-down">HOME</span>
              </v-btn>
            </nuxt-link>

            <v-btn
              depressed="depressed"
              class="mx-1"
              color="primary hidden-md-and-up"
            >
              <font-awesome-icon
                :icon="['fas', 'cloud-download-alt']"
                class="hidden-lg-and-up"
              ></font-awesome-icon>
              <span class="hidden-md-and-down">Update</span>
            </v-btn>

            <v-btn
              color="primary"
              class="mx-1"
              dark
              @click="showModal('Login')"
            >
              <font-awesome-icon
                :icon="['fas', 'user']"
                class="hidden-lg-and-up"
              ></font-awesome-icon>
              <span class="hidden-md-and-down">LOGIN</span>
            </v-btn>
            <v-btn
              color="primary"
              class="mx-1"
              dark
              @click="showModal('Register')"
            >
              <font-awesome-icon
                :icon="['fas', 'user-plus']"
                class="hidden-lg-and-up"
              ></font-awesome-icon>
              <span class="hidden-md-and-down">REGISTER</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <!-- /top toolbars-->
    </v-app-bar>

    <!--content-->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <form-modal />
    <!--footer-->
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
import GeoTimeToolbar from '~/components/molecules/toolbar/GeoTimeToolbar'
import FormModal from '~/components/molecules/form/FormModal'
export default {
  components: {
    GeoTimeToolbar,
    FormModal
  },
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    ...mapMutations(['showModal'])
  }
}
</script>
<style></style>
