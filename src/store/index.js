import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // TODO: Refactor to have less states
  state: {
    theme: 'default-theme',
    token: '',
    questions: [],
    scores: [],
    level: ''
  },
  getters: {
    numberOfQuizCompleted: state => {
      return state.scores.length
    }
  },
  mutations: {
    storeTheme (state, theme) {
      state.theme = theme
    },
    storeToken (state, token) {
      state.token = token
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

function parseQuestions (questions) {
  // Create random number between array index range
  const newQuestion = questions.map((question, index) => {
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
  return newQuestion
}
