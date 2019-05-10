import actions from '@/actions/profile'
import { SET_PROFILE } from './mutations.type'

const state = {
  errors: {},
  profile: {}
}

const getters = {
  profile (state) {
    return state.profile
  }
}

const mutations = {
  // [SET_ERROR] (state, error) {
  //   state.errors = error
  // },
  [SET_PROFILE] (state, profile) {
    state.profile = profile
    state.errors = {}
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
