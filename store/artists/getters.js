export default {
  currentArtistId: (state) => {
    return state.currentArtistId
  },
  getEventsByArtist: (state) => (artistId) => {
    const artist = state.artists[artistId]
    return artist
  }
}
