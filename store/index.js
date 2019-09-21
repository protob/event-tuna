export const state = () => ({
  counter: 0,
  apiKey: process.env.SONGKICK_API_KEY
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
