export default {
  UPDATE_CURRENT_EVENTS(state, payload) {
    const data = payload.data.resultsPage.results.event
    const userId = this.$cookies.get('authId') + ''

    data.forEach((item) => {
      item.userId = userId
    })

    this.state.events.currentEvents = data
  },
  UPDATE_EVENTS_BY_ARTIST(state, payload) {
    const data = payload.data.resultsPage.results.event
    const userId = this.$cookies.get('authId') + ''

    data.forEach((item) => {
      item.userId = userId
    })

    state.artists[payload.artistObj.artistId] = data
    state.currentArtistId = payload.artistObj.artistId
  },
  SET_CURRENT_ARTIST(state, payload) {
    state.currentArtistId = payload.artistObj.artistId
  }
}
