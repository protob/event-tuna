import { fireDb } from '~/plugins/firebase.js'
const { query } = require('what-country')

export default {
  async filterEventsByCountry(vuexContext, isoCode) {
    let fullName = query(isoCode)[0].name
    if (fullName == 'United Kingdom') {
      fullName = 'UK'
    }
    if (fullName == 'United States') {
      fullName = 'US'
    }

    const refs = fireDb.collection('events')
    const userId = this.$cookies.get('authId') + ''
    const filteredArr = []
    await refs
      .where('venue.metroArea.country.displayName', '==', fullName)
      .where('userId', '==', userId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          filteredArr.push({
            ...doc.data()
          })
        })
      })

    vuexContext.commit('FILTER_EVENTS_BY_COUNTRY', {
      isoCode,
      filteredArr
    })
  },

  toggleCatDetails(vuexContext, hasCatsVisible) {
    vuexContext.commit('TOGGLE_CAT_IS_VISIBLE', {
      hasCatsVisible
    })
  },

  setCurrentCountryCode(vuexContext, isoCode) {
    vuexContext.commit('SET_CURRENT_COUNTRY_CODE', {
      isoCode
    })
  },

  sortEvents(vuexContext, order) {
    vuexContext.commit('SORT_EVENTS', order)
  },

  updateStartDate(vuexContext, startDate) {
    vuexContext.commit('UPDATE_START_DATE', {
      startDate
    })
  },

  updateEndDate(vuexContext, endDate) {
    vuexContext.commit('UPDATE_END_DATE', {
      endDate
    })
  },

  async filterEventsByTimeRange(vuexContext, range) {
    const refs = fireDb
      .collection('events')
      .orderBy('start.date')
      .startAt(range.startDate)
      .endAt(range.endDate)

    const filteredArr = []
    await refs.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        filteredArr.push({
          ...doc.data()
        })
      })
    })

    vuexContext.commit('FILTER_EVENTS_BY_TIME_RANGE', {
      filteredArr,
      range
    })
  }
}
