export default {
  SET_CURRENT_USER(state, payload) {
    const form = payload.form ? payload.form : payload //
    state.currentUser.userName = form.userName
    state.currentUser.email = form.email
    state.currentUser.password = form.password
    state.currentUser.id = form.id
    state.currentUser.uid = form.uid
    state.currentCountryCode = payload.isoCode
  }
}
