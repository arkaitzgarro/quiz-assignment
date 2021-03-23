/* Global API handling */

import Vue from 'vue'
import axios from 'axios'

/* API calls */
import trivia from './trivia'

export function createApi () {
  const plugin = new ApiPlugin({
    api: [
      { trivia }
    ]
  })
  return plugin
}

/**
 * API plugin class definition. An instance of this class must be installed
 * in the Vue instance with `Vue.use(..)` before it can be used.
 * The API instance is available through `Vue.api` and (from inside components)
 * can be accessed using `this.$api`.
 */
export class ApiPlugin {
  /**
   * Construct a new API from provided options.
   * @param options { api: Array of objects containing api calls (arrow functions) }
   */
  constructor (options = {}) {
    this.initialized = false
    this.api = Object.assign({}, ...(options.api || []))
    this.http = axios.create()
  }

  initialize (vm) {
    if (this.initialized) {
      return
    }

    // Bind vm instance to API
    for (const [key, fn] of Object.entries(this.api)) {
      if (this.api[key].constructor === Function) {
        this.api[key] = fn.bind(vm)
      } else {
        for (const [objKey, objVal] of Object.entries(this.api[key])) {
          this.api[key][objKey] = typeof objVal === 'function' ? objVal.bind(vm) : objVal
        }
      }
    }

    this.initialized = true
  }
}
ApiPlugin.install = install
ApiPlugin.installed = false

/* Installs this plugin in the main Vue instance. */
function install (Vue) {
  if (Vue.api) {
    return
  }
  Vue.api = ApiPlugin
  Vue.http = axios
  Vue.http.defaults.headers.common.Accept = 'application/json'
  Vue.http.defaults.headers.common['Content-Type'] = 'application/json'
  Vue.http.defaults.withCredentials = false

  Vue.mixin({
    beforeCreate: function () {
      const apiPlugin = this.$options.api
      let api
      let http
      if (apiPlugin) {
        apiPlugin.initialize(this) // Bind API instance to this root component
        api = apiPlugin.api
        http = apiPlugin.http
      } else if (this.$options.parent) {
        api = this.$options.parent.$api
        http = this.$options.parent.$http
      }

      this.$api = api
      this.$http = http
    }
  })
  ApiPlugin.installed = true
}

Vue.use(ApiPlugin)
