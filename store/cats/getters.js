export default {
  getArtistStats: (state) => (catId, artistId) => {
    const cat = state.items.find((item) => item.id === catId)
    const artist = cat.artistsEvents[artistId]
    const obj = {
      countries: artist.countries
    }
    return obj
  },

  getTotalArtistEvents: (state) => (catId, artistId) => {
    const cat = state.items.find((item) => item.id === catId)
    const artist = cat.artistsEvents[artistId]
    return Object.keys(artist.artistEvents).length
  },

  getCatsStats(state) {
    return state.catsStats
  },

  getArtistNameById: (state) => (artistId) => {
    const artistName = state.artistIdNameMap[artistId]
    return artistName
  },

  getArtistIdMap(state) {
    return state.artistIdNameMap
  },
  getCats(state, rootGetters, rootState) {
    const catsArr = state.items
    const userId = rootState.auth.authId
    const filteredArr = []
    // foreach nad map methods  dont work
    for (let i = 0; i < catsArr.length; i++) {
      if (catsArr[i].userId === userId) {
        filteredArr.push(catsArr[i])
      }
    }

    return filteredArr
  },

  getOrder(state) {
    return state.order
  },

  getDialogMsg(state) {
    return state.dialogMsg
  },
  getDialogState(state) {
    return state.dialogActive
  }
}
