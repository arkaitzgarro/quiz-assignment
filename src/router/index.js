import Vue from 'vue'
import VueRouter from 'vue-router'
import QuizSetup from '@/components/QuizSetup.vue'
import Questions from '@/components/Questions'
import Scores from '@/components/Scores'

Vue.use(VueRouter)

// TODO: Move all routes as child of QuizSetup so we can have less props in store (maybe)
const routes = [
  {
    path: '/',
    name: 'QuizSetup',
    component: QuizSetup
  },
  {
    path: '/questions',
    name: 'Questions',
    component: Questions
  },
  {
    path: '/scores',
    name: 'Scores',
    component: Scores
  }
]

/** Router factory function */
export function createRouter (analytics) {
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  return router
}

export default createRouter
