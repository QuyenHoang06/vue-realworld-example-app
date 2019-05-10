import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from '@/services/config'

function requiredAuth (target, key, discriptor) {
  return discriptor
}

class ApiService {
  initialize () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL

    // const {jwt} = app.services
    // if (jwt.getToken()) {
    //   this.setHeader(jwt.getToken())
    // }
  }

  setHeader (token) {
    Vue.axios.defaults.headers['Authorization'] = `Token ${token}`
  }
  @requiredAuth
  query (resource, params) {
    return Vue.axios
      .get(resource, params)
      .catch((error) => {
        throw new Error(`[RWV] this ${error}`)
      })
  }

  get (resource, slug = '') {
    return Vue.axios
      .get(`${resource}/${slug}`)
      .catch((error) => {
        throw new Error(`[RWV] this ${error}`)
      })
  }
  post (resource, params) {
    return Vue.axios.post(`${resource}`, params)
  }

  update (resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params)
  }

  put (resource, params) {
    return Vue.axios
      .put(`${resource}`, params)
  }

  delete (resource) {
    return Vue.axios
      .delete(resource)
      .catch((error) => {
        throw new Error(`[RWV] this ${error}`)
      })
  }

  queryArticles (type, params) {
    return this
      .query(
        'articles' + (type === 'feed' ? '/feed' : ''),
        { params: params }
      )
  }
  getArticle (slug) {
    return this.get('articles', slug)
  }
  createArticle (params) {
    return this.post('articles', {article: params})
  }
  updateArticle (slug, params) {
    return this.update('articles', slug, {article: params})
  }
  destroyArticle (slug) {
    return this.delete(`articles/${slug}`)
  }

  getTags () {
    return this.get('tags')
  }

  getComment (slug) {
    if (typeof slug !== 'string') {
      throw new Error('[RWV] CommentsService.get() article slug required to fetch comments')
    }
    return this.get('articles', `${slug}/comments`)
  }

  postComment (slug, payload) {
    return this.post(
      `articles/${slug}/comments`, { comment: { body: payload } })
  }

  destroyComment (slug, commentId) {
    return this
      .delete(`articles/${slug}/comments/${commentId}`)
  }

  addFavorite (slug) {
    return this.post(`articles/${slug}/favorite`)
  }
  removeFavorite (slug) {
    return this.delete(`articles/${slug}/favorite`)
  }
}

export default ApiService
