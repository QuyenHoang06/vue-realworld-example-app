import { FETCH_PROFILE, FETCH_PROFILE_FOLLOW, FETCH_PROFILE_UNFOLLOW } from './actions.type'
import { SET_PROFILE } from './mutations.type'

const actions = {
  [FETCH_PROFILE] (context, payload) {
    const {username} = payload
    const { backend } = this.services
    return backend
      .get('profiles', username)
      .then(({data}) => {
        context.commit(SET_PROFILE, data.profile)
        return data
      })
      .catch(({response}) => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      })
  },
  [FETCH_PROFILE_FOLLOW] (context, payload) {
    const {username} = payload
    const { backend } = this.services
    return backend
      .post(`profiles/${username}/follow`)
      .then(({data}) => {
        context.commit(SET_PROFILE, data.profile)
        return data
      })
      .catch(({response}) => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      })
  },
  [FETCH_PROFILE_UNFOLLOW] (context, payload) {
    const {username} = payload
    const { backend } = this.services
    return backend
      .delete(`profiles/${username}/follow`)
      .then(({data}) => {
        context.commit(SET_PROFILE, data.profile)
        return data
      })
      .catch(({response}) => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      })
  }
}

export default actions
