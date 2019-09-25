// apiKey: process.env.SONGKICK_API_KEY
export const state = () => ({
  test: 1
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}

export const getters = {
  getState(state) {
    return state
  }
}
