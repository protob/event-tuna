// apiKey: process.env.SONGKICK_API_KEY
export const state = () => ({
  modalVisible: false,
  modalComponent: null
})

export const mutations = {
  showModal(state, componentName) {
    state.modalVisible = true
    state.modalComponent = componentName
  },
  hideModal(state) {
    state.modalVisible = false
  }
}

export const getters = {
  getState(state) {
    return state
  }
}
