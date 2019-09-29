import firebase from 'firebase/app'
import {
  fireDb
} from '~/plugins/firebase.js'

export default {
  async fetchUser(vuexContext, { id }) {
    console.log('id', id)
    const ref = fireDb.collection('users').doc(id)

    await ref.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        ref.onSnapshot((doc) => {
          const data = doc.data()
          vuexContext.commit('SET_CURRENT_USER', data)
        })
      } else {
        console.log('user doas not exists')
      }
    })
  },

  createUser(vuexContext, form) {
    console.log(form)

    const ref = fireDb.collection('users').doc(form.uid)

    ref.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        ref.onSnapshot((doc) => {
          alert('user already exist')
        })
      } else {
        ref.set(form)
      }
    })

    vuexContext.commit('SET_CURRENT_USER', {
      form
    })
  }
}
