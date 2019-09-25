import { mock } from '../apiMock.js'

export default {
  getCurrentEvents(state, rootGetters, rootState) {
    return state.currentEvents
    // const eventsArr = state.currentEvents
    // const userId = rootState.auth.authId
    // const filteredArr = []
    // // foreach nad map methods  dont work
    // for (let i = 0; i < eventsArr.length; i++) {
    //   if (eventsArr[i].userId === userId) {
    //     filteredArr.push(eventsArr[i])
    //   }
    // }

    // return filteredArr
  },

  getCatIsDetailVisible(state) {
    return state.options.ui.cat.hasVisibleDetails
  },
  getCurrentCountryCode(state) {
    return state.currentCountryCode
  },
  getOrder(state) {
    return state.order
  },
  getOrderKey(state) {
    return state.orderKey
  },

  getStartDate(state) {
    return state.startDate
  },
  getEndDate(state) {
    return state.endDate
  }
}
