// firebase/collections.js
import { fireDb } from './firebase'

export const users = fireDb.collection('users')
export const matches = fireDb.collection('matches')
// store/index.js
import { vuexfireMutations as mutations } from 'vuexfire'

export const state = () => ({})

export { mutations }
