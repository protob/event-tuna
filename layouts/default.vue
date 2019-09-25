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
          <v-btn color="primary" dark>LOGIN</v-btn>
        </v-list-item>

        <v-list-item>
          <v-btn color="primary" dark>REGISTER</v-btn>
        </v-list-item>

        <v-list-item>
          <v-btn color="primary" dark>RECOVERY</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <!-- top toolbars-->

      <v-row>
        <v-btn depressed="depressed" color="primary">Update</v-btn>

        <v-btn color="primary" dark>PLANNER</v-btn>
        <v-btn color="primary" dark>GEO TIME 1</v-btn>
        <v-btn color="primary" dark>GEO TIME 2</v-btn>
        <v-btn color="primary" dark>SEARCH</v-btn>
        <v-btn color="primary" dark>REGION</v-btn>

        <nuxt-link to="/">
          <v-btn color="primary" dark>HOME</v-btn>
        </nuxt-link>
        <v-btn color="primary" dark>LOGIN</v-btn>
        <v-btn color="primary" dark>REGISTER</v-btn>
      </v-row>

      <!-- /top toolbars-->
      <v-spacer />
    </v-app-bar>

    <!--content-->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <!--footer-->
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
// import updaterBox from '~/components/molecules/toolbars/updaterBox'
import geoTimeFilter from '~/components/molecules/toolbar/GeoTimeToolbar'
import planner from '~/components/molecules/toolbar/PlannerToolbar'

// import registerForm from '~/components/molecules/forms/registerForm'
// import loginForm from '~/components/molecules/forms/loginForm'
// import recoveryForm from '~/components/molecules/forms/recoveryForm'
import userWidget from '~/components/molecules/user/userWidget'

export default {
  components() {
    // loginForm,
    //   recoveryForm,
    //   registerForm,
    updaterBox, geoTimeFilter, planner, userWidget
  },
  data() {
    return {
      clipped: false,
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
  }
}
</script>
