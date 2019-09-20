export const state = () => ({
  counter: 0,
  apiKey: process.env.API_KEY
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
