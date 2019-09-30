import firebase from 'firebase/app'
import { fireDb } from '~/plugins/firebase.js'

export default {
  registerUser(vuexContext, form) {
    const ref = fireDb.collection('users').doc(form.id)

    ref.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        ref.onSnapshot((doc) => {
          alert('user already exist')
        })
      } else {
        ref.set(form)
      }
    })

    vuexContext.commit('REGISTER_USER', {
      form
    })
  },

  // vscool
  initAuthentication({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      // unsubscribe observer if already listening
      if (state.unsubscribeAuthObserver) {
        state.unsubscribeAuthObserver()
      }

      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch('fetchAuthUser').then((dbUser) => resolve(dbUser))
        } else {
          resolve(null)
        }
      })
      commit('setUnsubscribeAuthObserver', unsubscribe)
    })
  },

  registerUserWithEmailAndPassword({ dispatch }, form) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((response) => {
        return dispatch(
          'users/createUser',
          {
            uid: response.user.uid,
            id: form.id,
            email: form.email,
            lastMod: form.lastMod,
            userName: form.userName,
            password: form.password,
            avatar: null
          },
          {
            root: true
          }
        )
      })
      .then(() => dispatch('fetchAuthUser'))
  },

  loginWithEmailAndPassword({ dispatch }, { email, password }) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => dispatch('fetchAuthUser'))
  },
  // SIGN IN WITH GOOGLE
  signInWithGoogle({ dispatch }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((data) => {
        const user = data.user
        firebase
          .database()
          .ref('users')
          .child(user.uid)
          .once('value', (snapshot) => {
            if (!snapshot.exists()) {
              return dispatch(
                'users/createUser',
                {
                  id: user.uid,
                  name: user.displayName,
                  email: user.email,
                  username: user.email,
                  avatar: user.photoURL
                },
                {
                  root: true
                }
              ).then(() => dispatch('fetchAuthUser'))
            }
          })
      })
  },
  // LOGIN WITH GOOGLE
  loginWithGoogle({ dispatch }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
        const user = response.user

        const ref = fireDb.collection('users').doc(user.uid)
        ref.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            return dispatch(
              'users/createUser',
              {
                uid: user.uid,
                id: user.uid,
                email: user.email,
                lastMod: +new Date(),
                userName: user.email,
                password: '',
                avatar: null
              },
              {
                root: true
              }
            ).then(() => dispatch('fetchAuthUser'))
          }
        })
      })
  },

  // LOG OUT
  logOut({ commit }) {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        commit('SET_AUTH_ID', {
          userId: null
        })
      })
  },

  fetchAuthUser({ dispatch, commit }) {
    const userId = firebase.auth().currentUser.uid

    return new Promise((resolve, reject) => {
      // check if user exists in the database

      const ref = fireDb.collection('users').doc(userId)
      setTimeout(() => {
        ref.get().then((docSnapshot) => {
          if (docSnapshot.exists) {
            return dispatch(
              'users/fetchUser',
              {
                id: userId
              },
              {
                root: true
              }
            ).then((user) => {
              commit('SET_AUTH_ID', {
                userId
              })

              this.$cookies.set('authId', userId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
              })

              resolve(user)
            })

            // ref.onSnapshot(doc => {})
          } else {
            console.error('error')
            resolve(null)
          }
        })
      }, 500)
    })
  }
}
