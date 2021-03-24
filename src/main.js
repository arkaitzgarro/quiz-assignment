import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { createRouter } from './router'
import '@/styles/globals.scss'

Vue.config.productionTip = false
const router = createRouter()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
