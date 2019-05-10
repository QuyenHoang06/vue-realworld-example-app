import { ArticlesService, CommentsService } from '@/services/api.service'
import { FETCH_ARTICLE, FETCH_COMMENTS } from './actions.type'
import { SET_ARTICLE, SET_COMMENTS } from './mutations.type'

export const actions = {
  [FETCH_ARTICLE] (context, articleSlug) {
    const { backend } = this.services
    return backend.getArticle(articleSlug)
      .then(({ data }) => {
        context.commit(SET_ARTICLE, data.article)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  [FETCH_COMMENTS] (context, articleSlug) {
    const { backend } = this.services
    return backend.getComment(articleSlug)
      .then(({ data }) => {
        context.commit(SET_COMMENTS, data.comments)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

export default actions
