import actions from '@/actions/profile'
import { SET_ARTICLE, SET_COMMENTS } from './mutations.type'

export const state = {
  article: {},
  comments: []
}

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_ARTICLE] (state, article) {
    state.article = article
  },
  [SET_COMMENTS] (state, comments) {
    state.comments = comments
  }
}

export default {
  state,
  actions,
  mutations
}
