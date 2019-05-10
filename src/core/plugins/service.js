export default function (_Vue, services = {}) {
  const version = Number(_Vue.version.split('.')[0])

  if (version >= 2) {
    _Vue.mixin({ beforeCreate: servicesInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = _Vue.prototype._init
    _Vue.prototype._init = function (options) {
      if (options === void 0) options = {}

      options.init = options.init
        ? [servicesInit].concat(options.init)
        : servicesInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function servicesInit () {
    const vm = this
    const options = vm.$options
    // inject services into store
    if (options.services && vm.$store) {
      const services = options.services
      Object.keys(services).forEach(function (key) {
        const service = services[key]
        if (!service._initialized && service.initialize) {
          service.initialize(vm)
          service._initialized = true
        }
      })
      vm.$store.services = typeof services === 'function' ? services() : services
    }
  }
}
