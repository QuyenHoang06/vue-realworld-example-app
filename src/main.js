// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './views/App'
import router from '@/router'
import { CHECK_AUTH } from '@/actions/actions.type'
import Service from '@/core/plugins/service'
import Vuex from '@/core/store'
import modules from '@/mutations'
import services from '@/services'

import DateFilter from '@/services/date.filter'
import ErrorFilter from '@/services/error.filter'

Vue.config.productionTip = false

// Services and
Vue.use(Vuex)
Vue.use(Service)

const store = new Vuex.Store({
  modules
})

// Filters
Vue.filter('date', DateFilter)
Vue.filter('error', ErrorFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  services,
  template: '<App/>',
  components: { App }
})

// Ensure we checked auth before each page load.
router.beforeEach(
  (to, from, next) => {
    return Promise
      .all([store.dispatch(CHECK_AUTH)])
      .then(next)
  }
)
