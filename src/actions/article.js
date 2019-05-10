import {
  FETCH_ARTICLE,
  FETCH_COMMENTS,
  COMMENT_CREATE,
  COMMENT_DESTROY,
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  ARTICLE_PUBLISH,
  ARTICLE_EDIT,
  ARTICLE_EDIT_ADD_TAG,
  ARTICLE_EDIT_REMOVE_TAG,
  ARTICLE_DELETE,
  ARTICLE_RESET_STATE
} from './actions.type'
import {
  RESET_STATE,
  SET_ARTICLE,
  SET_COMMENTS,
  TAG_ADD,
  TAG_REMOVE,
  UPDATE_ARTICLE_IN_LIST
} from './mutations.type'

export const actions = {
  [FETCH_ARTICLE] (context, articleSlug, prevArticle) {
    console.log(this.app(), 'this.app')
    // avoid extronuous network call if article exists
    if (prevArticle !== undefined) {
      return context.commit(SET_ARTICLE, prevArticle)
    }
    const { backend } = this.services
    return backend.getArticle(articleSlug)
      .then(({ data }) => {
        context.commit(SET_ARTICLE, data.article)
        return data
      })
  },
  [FETCH_COMMENTS] (context, articleSlug) {
    const { backend } = this.services
    return backend.getComment(articleSlug)
      .then(({ data }) => {
        context.commit(SET_COMMENTS, data.comments)
      })
  },
  [COMMENT_CREATE] (context, payload) {
    const { backend } = this.services
    return backend
      .postComment(payload.slug, payload.comment)
      .then(() => { context.dispatch(FETCH_COMMENTS, payload.slug) })
  },
  [COMMENT_DESTROY] (context, payload) {
    const { backend } = this.services
    return backend
      .destroyComment(payload.slug, payload.commentId)
      .then(() => {
        context.dispatch(FETCH_COMMENTS, payload.slug)
      })
  },
  [FAVORITE_ADD] (context, payload) {
    const {backend} = this.services
    return backend
      .addFavorite(payload)
      .then(({ data }) => {
        // Update list as well. This allows us to favorite an article in the Home view.
        context.commit(
          UPDATE_ARTICLE_IN_LIST,
          data.article,
          { root: true }
        )
        context.commit(SET_ARTICLE, data.article)
      })
  },
  [FAVORITE_REMOVE] (context, payload) {
    const {backend} = this.services
    return backend
      .removeFavorite(payload)
      .then(({ data }) => {
        // Update list as well. This allows us to favorite an article in the Home view.
        context.commit(
          UPDATE_ARTICLE_IN_LIST,
          data.article,
          { root: true }
        )
        context.commit(SET_ARTICLE, data.article)
      })
  },
  [ARTICLE_PUBLISH] ({ state }) {
    const { backend } = this.services
    return backend.createArticle(state.article)
  },
  [ARTICLE_DELETE] (context, slug) {
    const { backend } = this.services
    return backend.destroyArticle(slug)
  },
  [ARTICLE_EDIT] ({ state }) {
    const { backend } = this.services
    return backend.updateArticle(state.article.slug, state.article)
  },
  [ARTICLE_EDIT_ADD_TAG] (context, tag) {
    context.commit(TAG_ADD, tag)
  },
  [ARTICLE_EDIT_REMOVE_TAG] (context, tag) {
    context.commit(TAG_REMOVE, tag)
  },
  [ARTICLE_RESET_STATE] ({ commit }) {
    commit(RESET_STATE)
  }
}

export default actions
