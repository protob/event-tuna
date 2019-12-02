export default {
  SORT_EVENTS(state, order) {
    let o = 0
    let k = 'displayName'

    switch (order) {
      case 'asc':
        o = 1
        k = 'displayName'
        break
      case 'desc':
        o = -1
        k = 'displayName'
        break
      case 'date asc':
        o = 1
        k = 'start.date'
        break

      case 'date desc':
        o = -1
        k = 'start.date'
        break
    }

    state.order = o
    state.orderKey = k
  },

  FILTER_EVENTS_BY_TIME_RANGE(state, payload) {
    state.currentEvents = payload.filteredArr
  },

  UPDATE_START_DATE(state, payload) {
    state.startDate = payload.startDate
  },

  UPDATE_END_DATE(state, payload) {
    state.endDate = payload.endDate
  },

  FILTER_EVENTS_BY_COUNTRY(state, payload) {
    state.currentEvents = payload.filteredArr
  },

  SET_CURRENT_COUNTRY_CODE(state, payload) {
    state.currentCountryCode = payload.isoCode
  }
}
