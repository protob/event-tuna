export default {
  setCurrentArtist(vuexContext, artistObj) {
    vuexContext.commit('SET_CURRENT_ARTIST', {
      artistObj
    })
  },

  getArtistEvents(vuexContext, artistObj) {
    const queryId = artistObj.artistId
    const token = this.state.apiKey
    return this.$axios
      .$get(
        'https://api.songkick.com/api/3.0/artists/' +
          queryId +
          '/calendar.json?apikey=' +
          token
      )
      .then((data) => {
        vuexContext.commit('UPDATE_EVENTS_BY_ARTIST', {
          artistObj,
          data
        })

        vuexContext.commit('UPDATE_CURRENT_EVENTS', {
          artistObj,
          data
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }
}
