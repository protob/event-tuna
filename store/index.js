// apiKey: process.env.SONGKICK_API_KEY
export const state = () => ({
  modalVisible: false,
  modalComponent: null,
  isConfirm: false
})

export const mutations = {
  showModal(state, componentName) {
    state.modalVisible = true
    state.modalComponent = componentName
    state.isConfirm = componentName.includes('confirm')
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
