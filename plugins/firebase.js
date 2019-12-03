import firebase from 'firebase/app'
import 'firebase/firestore'

import 'firebase/auth'
// import store from '~/store';

console.log('kk', process.env.FIREBASE_API_KEY)
if (!firebase.apps.length) {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  }

  firebase.initializeApp(config)
  firebase.firestore()

  // firebase.firestore().settings({
  //   // timestampsInSnapshots: true
  // })
}

const fireDb = firebase.firestore()
export default ({ store, app: { $axios } }) => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    if (user) {
      store.dispatch('auth/fetchAuthUser')
    }
  })

  $axios.setToken(store.state.token)
}
export { fireDb }

// // Export utility functions
// export const { Timestamp } = firebase.firestore
