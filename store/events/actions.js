export default {
  setList(vuexContext, obj) {
    vuexContext.commit('SET_LIST', {
      obj
    })
  }
}
