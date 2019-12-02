import Vue from 'vue'
import { fireDb } from '~/plugins/firebase.js'
const { query } = require('what-country')
const crg = require('country-reverse-geocoding').country_reverse_geocoding()
const getCountryISO2 = require('country-iso-3-to-2')
export default {
  ADD_CAT(state, payload) {
    state.items.push(payload.catObj)
  },

  FIRE_DIALOG(state, payload) {
    state.dialogActive = payload.active
    state.dialogMsg = payload.msg
  },

  SORT_CATS(state, order) {
    if (order == 'asc') {
      state.order = 1
    } else {
      state.order = -1
    }
  },
  UPDATE_ARTIST_EVENTS(state, payload) {
    const userId = this.$cookies.get('authId') + ''

    const catId = payload.artistObj.catId
    const artistId = payload.artistObj.artistId
    const index = state.items
      .map(function(item) {
        return item.id
      })
      .indexOf(catId)

    const simpleEvents = payload.data.resultsPage.results.event.map(function(
      item
    ) {
      const lat = item.location.lat
      const lng = item.location.lng
      let countryInfo = crg.get_country(lat, lng)
      if (countryInfo) {
        const lc = countryInfo.code.toLowerCase()
        countryInfo.code2 = getCountryISO2(countryInfo.code).toLowerCase()
        countryInfo.code = lc
      } else {
        countryInfo = {
          name: '',
          icode2: ''
        }
      }

      const city = item.venue.metroArea.displayName
      // const country = item.venue.metroArea.country.displayName;
      const simpleEvent = {
        city,
        country: countryInfo.name,
        id: item.id,
        isoCode: countryInfo.code2 ? countryInfo.code2 : '',
        name: item.displayName,
        userId
      }

      return simpleEvent
    })
    const simpleEventsObj = {
      ...simpleEvents
    } // convert arr to obj

    // opate all events
    payload.data.resultsPage.results.event.forEach(function(item) {
      const id = item.id + '' // cast string
      const ref = fireDb.collection('events').doc(id)

      try {
        item.userId = userId
        ref.set(item)
      } catch (e) {
        console.error(e)
      }
    })

    // firebase
    const artistObj = payload.artistObj
    const ref = fireDb.collection('cats').doc(artistObj.catId)

    const dataObj = {
      artistEvents: simpleEventsObj,
      id: artistObj.artistId,
      artistName: artistObj.artistName,
      userId
    }
    try {
      const objUpdate = {}
      objUpdate[`artistsEvents.${artistObj.artistId}`] = dataObj

      ref.update(objUpdate)
    } catch (e) {
      console.error(e)
    }

    // state.items[index].artistsEvents[artistId].artistEvents = simpleEventsObj
    Vue.set(
      state.items[index].artistsEvents[artistId],
      'artistEvents',
      simpleEventsObj
    )
    // continents

    const continents = {
      AF: 'Africa',
      AN: 'Antarctica',
      AS: 'Asia',
      EU: 'Europe',
      NA: 'North America',
      OC: 'Oceania',
      SA: 'South America'
    }
    const countriesObj = {}
    Object.values(simpleEventsObj).forEach((item) => {
      const kk = item.isoCode
      if (!kk) return // dont bother

      const countryInfo = query(kk)

      const continentKey = countryInfo[0].continent

      const continentName = continents[continentKey]

      if (!(continentName in countriesObj)) {
        countriesObj[continentName] = {}
      }
      if (!(kk in countriesObj[continentName])) {
        countriesObj[continentName][kk] = 0
      }
      countriesObj[continentName][kk]++
    })

    Vue.set(
      state.items[index].artistsEvents[artistId],
      'countries',
      countriesObj
    )

    // firebase

    // const dataObjCountries = {
    //   countries: countriesObj
    // }
    try {
      const objUpdate = {}
      objUpdate[`artistsEvents.${artistObj.artistId}.countries`] = countriesObj

      ref.update(objUpdate)
    } catch (e) {
      console.error(e)
    }
  },

  CALCULATE_CAT_STATS(state, payload) {
    const index = state.items
      .map(function(item) {
        return item.id
      })
      .indexOf(payload.catId)
    const items = state.items[index]
    const totalArtists = Object.keys(items.artistsIds).length

    let total = 0

    Object.keys(items.artistsEvents).forEach((k) => {
      const item = items.artistsEvents[k]
      const events = item.artistEvents

      Object.values(events).forEach((el) => {
        total++
      })
    })
    const totalEvents = total
    const statsObj = {
      artists: totalArtists,
      events: totalEvents
    }
    state.catsStats[payload.catId] = statsObj

    // firebase

    const ref = fireDb.collection('catsStats').doc(payload.catId)

    try {
      ref.set(statsObj)
    } catch (e) {
      console.error(e)
    }
  },

  DELETE_ARTIST_FROM_CAT(state, payload) {
    const catId = payload.delObj.catId
    const artistId = payload.delObj.artistId
    const removeIndex = state.items
      .map(function(item) {
        return item.id
      })
      .indexOf(catId)

    delete state.items[removeIndex].artistsEvents[artistId]
    const index = state.items[removeIndex].artistsIds.indexOf(artistId)
    if (index !== -1) {
      state.items[removeIndex].artistsIds.splice(index, 1)
    }
  },

  ADD_ARTIST_TO_MAP(state, payload) {
    state.artistIdNameMap[payload.artist.id] = payload.artist.displayName
  },

  ADD_ARTIST_TO_CAT(state, payload) {
    const catIndex = state.items
      .map(function(item) {
        return item.id
      })
      .indexOf(payload.artist.catId)

    const tempalte = {
      artistEvents: [],
      artistName: payload.artist.displayName,
      id: payload.artist.id
    }

    state.items[catIndex].artistsIds.push(payload.artist.id)
    state.items[catIndex].artistsEvents[payload.artist.id] = tempalte
  },

  EDIT_CAT(state, payload) {
    const itemIndex = state.items
      .map(function(item) {
        return item.id
      })
      .indexOf(payload.catObj.id)

    state.items[itemIndex].displayName = payload.catObj.displayName
  },

  DELETE_CAT(state, payload) {
    const removeIndex = state.items
      .map(function(item) {
        return item.id
      })
      .indexOf(payload.catId)

    ~removeIndex && state.items.splice(removeIndex, 1)
  },

  POPULATE_ID_NAME_MAP(state, payload) {
    state.artistIdNameMap = payload.map
  },
  POPULATE_CATS(state, payload) {
    state.items = payload.catsObj
  },
  POPULATE_CATS_STATS(state, payload) {
    state.catsStats = payload.catsStatsObj
  }
}
