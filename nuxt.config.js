const colors = require('vuetify/es5/util/colors').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const glob = require('glob-all')
const path = require('path')
const purgecss = require('@fullhuman/postcss-purgecss')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const webpack = require('webpack')
// import glob from 'glob-all'
// import path from 'path'
// import purgecss from '@fullhuman/postcss-purgecss'
// import PurgecssPlugin from 'purgecss-webpack-plugin'
module.exports = {
  server: {
    port: 3003, // default: 3000
    host: '127.0.0.1' // default: localhost
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    {
      // node_modules
      src: '~/assets/global.scss',
      lang: 'scss'
    },
    {
      // node_modules
      src: '~/assets/third-party.scss',
      lang: 'scss'
    },

    {
      // node_modules
      src: 'flag-icon-css/css/flag-icon.css',
      lang: 'css'
    }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // '~plugins/core-components.js',
    // '~plugins/date-filter.js',
    // '~/plugins/vuefire.js',
    // '~/plugins/vee-validate.js', //v3 has duffernt
    // '~/plugins/helpers.js',
    '~/plugins/vue-inject.js',
    '~/plugins/firebase.js',
    '~/plugins/vue-bar.js',
    '~/plugins/vue2-filters.js'
  ],

  /*
   ** Nuxt.js dev-modules
   */
  devModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
    '@nuxtjs/axios',

    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            // icons: ['fas'],
            icons: [
              'faCalendarAlt',
              'faSearch',
              'faBars',
              'faThLarge',
              'faMapMarker',
              'faTimesCircle',
              'faTimes',
              'faEdit',
              'faPlus',
              'faThList',
              'faMapMarkerAlt',
              'faCloudDownloadAlt',
              'faClipboardList',
              'faStar',
              'faUser',
              'faUserPlus'
            ]
          }
          // {
          //   set: '@fortawesome/free-brands-svg-icons',
          //   // icons: ['fab']
          // }
        ]
      }
    ],
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL || 'evlx-238ed.firebaseapp.com',
    credentials: false
  },

  env: {
    baseUrl: process.env.BASE_URL || 'evlx-238ed.firebaseapp.com',
    fbAPIKey: 'AIzaSyCLUQ8RehSvutadxfzKHHpJGNX66tu_cU8'
  },
  // transition: {
  //   name: 'fade',
  //   mode: 'out-in'
  // },
  // serverMiddleware: [
  //   bodyParser.json(),
  //   "~/api"

  // ],

  // generate: {
  //   routes: function () {
  //     return axios
  //       .get("https://evlx-238ed.firebaseapp.com/posts.json")
  //       .then(res => {
  //         const routes = [];
  //         for (const key in res.data) {
  //           routes.push({
  //             route: "/posts/" + key,
  //             payload: {
  //               postData: res.data[key]
  //             }
  //           });
  //         }
  //         return routes;
  //       });
  //   },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // '$': 'jquery',
        _: 'lodash'
        // ...etc.
      })
    ],

    // extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    // postcss: {
    //   plugins: [
    //     purgecss({
    //       content: ['./pages/**/*.vue', './layouts/**/*.vue', './components/**/*.vue'],
    //       whitelist: ['html', 'body'],
    //     })
    //   ]
    // },

    extend(config, ctx) {
      // if (!isDev) {
      // if (process.env.NODE_ENV === 'production') {
      //   // Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
      //   // for more information about purgecss.
      //   config.plugins.push(
      //     new PurgecssPlugin({
      //       paths: glob.sync([
      //         path.join(__dirname, './pages/**/*.vue'),
      //         path.join(__dirname, './layouts/**/*.vue'),
      //         path.join(__dirname, './components/**/*.vue')
      //       ]),
      //       whitelist: ['html', 'body']
      //     })
      //   )
      // }
      // config.resolve.alias['~src'] = projectSrc
    }
  }
}
