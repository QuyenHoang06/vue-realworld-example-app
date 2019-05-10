import Vuex from 'vuex'

Vuex.Store.prototype.app = function () {
  return this._vm
}

export default Vuex
