import {
  FETCH_ARTICLES,
  FETCH_TAGS
} from './actions.type'
import {
  FETCH_START,
  FETCH_END,
  SET_TAGS
} from './mutations.type'

const actions = {
  [FETCH_ARTICLES] ({ commit, ...context }, params) {
    console.log(context, this)
    const { backend } = this.services
    commit(FETCH_START)
    return backend.queryArticles(params.type, params.filters)
      .then(({ data }) => {
        commit(FETCH_END, data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  [FETCH_TAGS] ({ commit }) {
    const { backend } = this.services
    return backend.getTags()
      .then(({ data }) => {
        commit(SET_TAGS, data.tags)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export default actions
