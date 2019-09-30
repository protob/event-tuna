const x = 2 // offset
const CurrentDate = new Date()
CurrentDate.setMonth(CurrentDate.getMonth() + x)

export default () => ({
  list: [],
  order: 1,
  orderKey: 'start.date', // 'displayName',
  startDate: new Date().toISOString().substring(0, 10),
  endDate: CurrentDate.toISOString().substring(0, 10),
  currentCountryCode: 'pl',
  currentEvents: [],
  options: {
    ui: {
      cat: {
        hasVisibleDetails: true
      }
    }
  }
})
