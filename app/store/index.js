export const state = () => ({
  apiKey: process.env.SONGKICK_API_KEY,
  modalVisible: false,
  modalComponent: null,
  isConfirm: false,
  isArtist: false,
  editedItemId: null,
  artistCatId: null,
  isLoading: false
})

export const mutations = {
  SET_LOADING_STATE(state, payload) {
    state.isLoading = payload.isLoading
  },

  showModal(state, payload) {
    state.modalVisible = true
    state.modalComponent = payload.name ? payload.name : payload // componentname
    state.isConfirm = state.modalComponent.includes('confirm')
    state.editedItemId = payload.id ? payload.id : null
    state.isArtist = payload.isArtist ? payload.isArtist : null
    state.artistCatId = payload.artistCatId ? payload.artistCatId : null
    if (payload.name === 'add_artist') {
      state.editedItemId = null
    }
  },
  hideModal(state) {
    state.modalVisible = false
  }
}

export const getters = {
  isArtist(state) {
    return state.isArtist
  },

  getArtistCatId(state) {
    return state.artistCatId
  },
  getEditedItemId(state) {
    return state.editedItemId
  },
  getState(state) {
    return state
  },
  getIsLoading(state) {
    return state.isLoading
  }
}
