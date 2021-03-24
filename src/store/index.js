import Vue from 'vue'
import Vuex from 'vuex'

import Trivia from '../api/trivia'

Vue.use(Vuex)

export default new Vuex.Store({
  // TODO: Refactor to have less states
  state: {
    theme: 'default-theme',
    token: '',
    categories: [],
    questions: [],
    scores: [],
    level: ''
  },
  getters: {
    token (state) {
      return state.token
    },
    categories (state) {
      return state.categories
    },
    numberOfQuizCompleted: state => {
      return state.scores.length
    }
  },
  actions: {
    async fetchToken ({ commit }) {
      const { token } = await Trivia.getToken().then(getData)

      commit('storeToken', token)
    },
    async fetchCategories ({ commit }) {
      const SUPPORTED_CATEGORIES = [
        'Entertainment: Video Games',
        'Science & Nature'
      ]

      const { trivia_categories: triviaCategories } = await Trivia.getCategories().then(getData)

      const categories = triviaCategories.filter((category) => {
        return SUPPORTED_CATEGORIES.includes(category.name)
      })

      commit('storeCategories', categories)
    }
  },
  mutations: {
    storeTheme (state, theme) {
      state.theme = theme
    },
    storeToken (state, token) {
      state.token = token
    },
    storeCategories (state, categories) {
      state.categories = categories
    },
    storeQuestion (state, questions) {
      state.questions = parseQuestions(questions)
    },
    storeScore (state, score) {
      state.scores.push(score)
    },
    storeLevel (state, level) {
      state.level = level
    }
  }
})

function getData ({ data }) {
  return data
}

function parseQuestions (questions) {
  // Create random number between array index range
  return questions.map((question, index) => {
    // Add correct answer to all answers list at random index
    const answers = [...question.incorrect_answers]
    const randomIndex = Math.round(Math.random() * (question.incorrect_answers.length - 1))
    answers.splice(randomIndex, 0, question.correct_answer)
    return {
      number: index + 1,
      question: question.question,
      idxOfCorrectAnwser: randomIndex,
      answers
    }
  })
}
