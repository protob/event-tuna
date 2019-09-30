export default {
  REGISTER_USER(state, payload) {
    const form = payload.form
    state.currentUser.name = form.name
    state.currentUser.email = form.email
    state.currentUser.password = form.password
    state.currentUser.id = form.id
    // state.currentCountryCode = payload.isoCode
  },

  SET_AUTH_ID(state, payload) {
    state.authId = payload.userId
  },
  setUnsubscribeAuthObserver(state, unsubscribe) {
    state.unsubscribeAuthObserver = unsubscribe
  }
}
