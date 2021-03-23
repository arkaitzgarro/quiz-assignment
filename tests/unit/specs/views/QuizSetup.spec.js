import { mount, createLocalVue } from '@vue/test-utils'
import QuizSetup from '@/components/QuizSetup'
import VueRouter from 'vue-router'
import { createRouter } from '@/router'
import categories from '../../scenarios/categories'
import questions from '../../scenarios/questionsBase64'
// import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = createRouter()
process.env.NODE_ENV = 'test'
// Mocks
const token = { data: '12' }
const defaultState = {
  theme: '',
  token: '',
  questions: [],
  scores: [],
  level: ''
}
const getCategories = jest.fn().mockResolvedValue(categories)
const getToken = jest.fn().mockResolvedValue(token)
const getQuestions = jest.fn().mockResolvedValue(questions)

function factory (
  state = defaultState,
  SUPPORTED_CATEGORIES = [
    'General Knowledge',
    'Entertainment: Musicals & Theatres'
  ]
) {
  return mount(QuizSetup, {
    localVue,
    router,
    mocks: {
      $store: {
        state,
        mutations: {
          storeTheme: jest.fn(),
          storeToken: jest.fn(),
          storeQuestion: jest.fn(),
          storeLevel: jest.fn()
        },
        commit: jest.fn()
      },
      $api: {
        trivia: {
          getCategories,
          getToken,
          getQuestions
        }
      }
    },
    propsData: {
      SUPPORTED_CATEGORIES
    }
  })
}

let wrapper
describe('QuizSetup', () => {
  afterEach(() => {
    wrapper.destroy()
    jest.clearAllMocks()
  })

  describe('no token: ', () => {
    it('Should fetch token', async () => {
      wrapper = factory()
      expect(wrapper.vm.$api.trivia.getToken).toHaveBeenCalled()
      expect(wrapper.vm.$api.trivia.getToken).toHaveBeenCalledTimes(1)
    })
  })

  describe('with token: ', () => {
    it('Shouldn\'t fetch token', () => {
      wrapper = factory({ token: '12' })
      expect(wrapper.vm.$api.trivia.getToken).toHaveBeenCalledTimes(0)
    })
  })

  describe('categories: ', () => {
    beforeEach(() => {
      wrapper = factory(defaultState, ['General Knowledge', 'Entertainment: Musicals & Theatres'])
    })
    it('fetches categories when no categories are available', () => {
      expect(wrapper.vm.$api.trivia.getCategories).toHaveBeenCalled()
      expect(wrapper.vm.$api.trivia.getCategories).toHaveBeenCalledTimes(1)
    })
    it('filters the api categories with categories we support ', () => {
      expect(wrapper.vm.categories).toEqual([
        { id: 9, name: 'General Knowledge' },
        { id: 13, name: 'Entertainment: Musicals & Theatres' }
      ])
    })
  })

  describe('start quiz: ', () => {
    const cases = [
      [null, { id: 9, name: 'General Knowledge' }, 'medium', 'QuizSetup'],
      ['12', null, 'medium', 'QuizSetup'],
      ['12', { id: 9, name: 'General Knowledge' }, null, 'QuizSetup'],
      ['12', { id: 9, name: 'General Knowledge' }, 'medium', 'Questions']
    ]
    test.each(cases)('should go to $routName when $token || $category || $level is Null',
      async (token, category, level, route) => {
        wrapper = factory(token ? { token: '12' } : defaultState)
        expect(wrapper.vm.$route.name).toEqual('QuizSetup')
        wrapper.setData({ selectedCategory: category || { id: null } })
        wrapper.setData({ selectedLevel: level })
        const startButton = wrapper.findComponent({ ref: 'startQuiz' })
        await startButton.trigger('click')
        if (route === 'QuizSetup') {
          expect(wrapper.vm.validationMessage).toEqual('Please select level and category')
        }
        expect(wrapper.vm.$route.name).toEqual(route)
      })
  })
})
