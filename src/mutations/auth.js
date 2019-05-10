import actions from '@/actions/auth'
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type'

const state = {
  errors: null,
  user: {},
  isAuthenticated: false
}

const getters = {
  currentUser (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.isAuthenticated
  }
}

const mutations = {
  [SET_ERROR] (state, error) {
    state.errors = error
  },
  [SET_AUTH] (state, user) {
    const {jwt} = this.app().services
    state.isAuthenticated = true
    state.user = user
    state.errors = {}
    jwt.saveToken(state.user.token)
  },
  [PURGE_AUTH] (state) {
    const {jwt} = this.app().services
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    jwt.destroyToken()
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
