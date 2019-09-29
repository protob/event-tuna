export default {
  getAuthUser(state, getters, rootState) {
    console.log('Xxxx', {
      users: rootState.users,
      auth: state.authId
    })
    return state.authId ? rootState.users.currentUser : null // check if it wot for conurent user
    // return state.authId ? rootState.users.items[state.authId] : null
  }
}
