import Vue from 'vue'
import actions from '@/actions/article'
import {
  RESET_STATE,
  SET_ARTICLE,
  SET_COMMENTS,
  TAG_ADD,
  TAG_REMOVE
} from './mutations.type'

const initialState = {
  article: {
    author: {},
    title: '',
    description: '',
    body: '',
    tagList: []
  },
  comments: []
}

export const state = Object.assign({}, initialState)

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_ARTICLE] (state, article) {
    state.article = article
  },
  [SET_COMMENTS] (state, comments) {
    state.comments = comments
  },
  [TAG_ADD] (state, tag) {
    state.article.tagList = state.article.tagList.concat([tag])
  },
  [TAG_REMOVE] (state, tag) {
    state.article.tagList = state.article.tagList.filter(t => t !== tag)
  },
  [RESET_STATE] () {
    for (let f in state) {
      Vue.set(state, f, initialState[f])
    }
  }
}

const getters = {
  article (state) {
    return state.article
  },
  comments (state) {
    return state.comments
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
