import firebase from 'firebase/app'
import { fireDb } from '~/plugins/firebase.js'
export default {
  // ADD CAT
  async addCat(vuexContext, catObj) {
    vuexContext.commit('ADD_CAT', {
      catObj
    })
    const ref = fireDb.collection('cats')
    try {
      await ref.doc(catObj.id).set(catObj)
    } catch (e) {
      console.error(e)
    }
  },

  // POPULATE STATE
  populateCats(vuexContext, catsObj) {
    vuexContext.commit('POPULATE_CATS', {
      catsObj
    })
  },
  populateCatsSats(vuexContext, catsStatsObj) {
    vuexContext.commit('POPULATE_CATS_STATS', {
      catsStatsObj
    })
  },
  populateIdNameMap(vuexContext, map) {
    vuexContext.commit('POPULATE_ID_NAME_MAP', {
      map
    })
  },

  fetchArtistEvetns(vuexContext, artistObj) {
    const token = this.state.apiKey
    const queryId = artistObj.artistId

    return this.$axios
      .$get(
        'https://api.songkick.com/api/3.0/artists/' +
          queryId +
          '/calendar.json?apikey=' +
          token
      )
      .then((data) => {
        vuexContext.commit('UPDATE_ARTIST_EVENTS', {
          artistObj,
          data
        })

        const catId = artistObj.catId
        vuexContext.commit('CALCULATE_CAT_STATS', {
          catId
        })
      })
      .catch((e) => {
        console.error(e)
      })
  },

  calculateCatStats(vuexContext, catId) {
    vuexContext.commit('CALCULATE_CAT_STATS', {
      catId
    })
  },

  // add artist
  addArtist(vuexContext, artistObj) {
    const token = this.state.apiKey

    const queryName = artistObj.displayName
      .trim()
      .split(' ')
      .join('-')

    return this.$axios
      .$get(
        'https://api.songkick.com/api/3.0/search/artists.json?query=' +
          queryName +
          '&apikey=' +
          token
      )
      .then((data) => {
        const totalResults = data.resultsPage.totalEntries
        if (totalResults == 0) {
          vuexContext.commit('FIRE_DIALOG', {
            active: true,
            msg: 'ARTIST NOT FOUND IN SONGKICK'
          })

          return false
        }

        const artist = data.resultsPage.results.artist[0]
        artist.updatedDate = '' + +new Date() // convert ot simestap
        artist.userId = artistObj.userId
        artist.catId = artistObj.catId
        vuexContext.commit('ADD_ARTIST_TO_MAP', {
          artist
        })
        vuexContext.commit('ADD_ARTIST_TO_CAT', {
          artist
        })

        // firebase
        const ref = fireDb.collection('cats').doc(artist.catId)
        try {
          ref.update({
            artistsIds: firebase.firestore.FieldValue.arrayUnion(artist.id) // update array
          })

          const objUpdate = {}
          objUpdate[`artistsEvents.${artist.id}`] = {
            artistEvents: []
          }

          ref.update(objUpdate)
        } catch (e) {
          console.error(e)
        }

        //  artists
        const artistId = artist.id + '' // casr String
        const refArtists = fireDb.collection('artists').doc(artistId)

        try {
          refArtists.set(artist)
        } catch (e) {
          console.error(e)
        }

        /// 
        const catId = artistObj.catId
        vuexContext.commit('CALCULATE_CAT_STATS', {
          catId
        })
      })
      .catch((e) => {
        console.error(e)
      })
  },

  deleteArtistFromCat(vuexContext, delObj) {
    vuexContext.commit('DELETE_ARTIST_FROM_CAT', {
      delObj
    })
    const catId = delObj.catId
    const artistId = delObj.artistId

    const ref = fireDb.collection('cats').doc(catId)

    try {
      ref.update({
        ['artistsEvents.' + artistId]: firebase.firestore.FieldValue.delete() // update array
      })
      ref.update({
        artistsIds: firebase.firestore.FieldValue.arrayRemove(artistId) // update array
      })
      // ref.update({
      //   ['artistsEvents.' + artistId]: firebase.firestore.FieldValue.delete() // update array
      // })
    } catch (e) {
      console.error(e)
    }

    vuexContext.commit('CALCULATE_CAT_STATS', {
      catId
    })
  },

  async editCat(vuexContext, catObj) {
    vuexContext.commit('EDIT_CAT', {
      catObj
    })

    const ref = fireDb.collection('cats')
    try {
      await ref.doc(catObj.id).set(
        {
          displayName: catObj.displayName
        },
        {
          merge: true
        }
      )
    } catch (e) {
      console.error(e)
    }
  },

  async deleteCat(vuexContext, catId) {
    vuexContext.commit('DELETE_CAT', {
      catId
    })

    const ref = fireDb.collection('cats')
    try {
      await ref.doc(catId).delete()
    } catch (e) {
      console.error(e)
    }
  },

  sortCats(vuexContext, order) {
    vuexContext.commit('SORT_CATS', order)
  }
}
