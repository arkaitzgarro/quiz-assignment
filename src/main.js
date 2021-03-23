import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { createApi } from './api'
import { createRouter } from './router'
import '@/styles/globals.scss'
// import '@/styles/themes/video-games'
// import '@/styles/themes/science-nature'

Vue.config.productionTip = false
const api = createApi()
const router = createRouter()

new Vue({
  router,
  store,
  api,
  render: h => h(App)
}).$mount('#app')
