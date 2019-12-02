export default {
  getAuthUser(state, getters, rootState) {
    return state.authId ? rootState.users.currentUser : null // check if it wot for conurent user
    // return state.authId ? rootState.users.items[state.authId] : null
  }
}
