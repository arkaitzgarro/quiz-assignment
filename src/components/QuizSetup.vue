<template>
  <transition name="slide" appear>
    <PageLayout
      class="bg-color-3">
      <div slot="header"/>
      <template slot="content">
        <form
          :class="$style['quiz-setup']"
          class="flex-column flex-justify-around">
          <h1 class="flex-self-center color-3-white">Enjoy our little quiz</h1>
          <div
            :class="$style['quiz-setup__fieldset']"
            class="margin-10 flex-self-center">
            <DropDown
              :options="categories"
              :required="true"
              :value="selectedCategory"
              id="categories"
              label="Categories"
              placeholder="Select a category"
              class="margin-5-btm"
              @select="selectedCategory = $event, validationMessage = ''"
            />
            <DropDown
              v-if="levels.length > 0"
              :options="levels"
              :required="true"
              :value="selectedLevel"
              id="levels"
              label="Levels"
              placeholder="Select a level"
              @select="selectedLevel = $event, storeLevel($event), validationMessage = ''"
            />
          </div>
          <transition name="fade">
            <div
              v-if="validationMessage.length > 0"
              class="text-center margin-10-btm color-3-white">
              {{ validationMessage }}
            </div>
          </transition>
          <button
            ref="startQuiz"
            class="button button_2-inverse flex-self-center"
            @click.prevent="startQuiz">Start Quiz</button>
        </form>
      </template>
      <div slot="footer"/>
    </PageLayout>
  </transition>
</template>

<script>
// TODO: Maybe make every view have these helpers
import { mapGetters, mapActions } from 'vuex'
import DropDown from '@/components/core/DropDown'
import PageLayout from '@/components/core/PageLayout'

export default {
  name: 'QuizSetup',
  components: {
    DropDown,
    PageLayout
  },
  data () {
    return {
      levels: [
        'easy',
        'medium',
        'hard'
      ],
      selectedCategory: {
        id: null,
        name: null
      },
      selectedLevel: null,
      validationMessage: ''
    }
  },
  computed: {
    ...mapGetters([
      'categories'
    ]),
    gameSettings () {
      return {
        category: this.selectedCategory.id,
        difficulty: this.selectedLevel,
        token: this.token
      }
    }
  },
  created () {
    this.fetchToken()
    this.fetchCategories()
    // this.storeTheme('default-theme')
    // if (this.categories.length === 0) {
    //   this.fetchCategories()
    // }
    // if (!this.token) {
    //   this.fetchToken()
    // }
  },
  methods: {
    ...mapActions([
      'fetchToken',
      'fetchCategories'
    ])
    // ...mapMutations([
    //   'storeTheme',
    //   'storeToken',
    //   'storeQuestion',
    //   'storeLevel'
    // ]),
    // setTheme () {
    //   const themeName = this.THEME_MAPPING[this.selectedCategory.name] || 'default-theme'
    //   this.storeTheme(themeName)
    // },
    // validate () {
    //   // TODO: Make validation smarter
    //   const { category, difficulty, token } = this.gameSettings
    //   this.isValid =
    //     category && typeof category === 'number' &&
    //     difficulty && difficulty.length > 0 &&
    //     token && token.length > 0
    // },
    // startQuiz () {
    //   this.validate()
    //   if (this.isValid) {
    //     this.validationMessage = ''
    //     this.$api.trivia.getQuestions(this.gameSettings)
    //       .then(({ data }) => {
    //         const responseCode = data.response_code
    //         if (
    //           responseCode === 0 &&
    //           data.results &&
    //           data.results.length > 0
    //         ) {
    //           this.storeQuestion(data.results)
    //           this.setTheme()
    //           this.$router.push({ name: 'Questions' })
    //         } else {
    //           // TODO: Show toast message via a helper
    //           const responseStatus = [ // Index correspond with response code
    //             'Success',
    //             'The selected category doesn\'t have that amount of questions',
    //             'Something went wrong',
    //             'Invalid token',
    //             'You\'ve got all questions aswered'
    //           ]
    //           return responseStatus[responseCode]
    //         }
    //       })
    //       .catch(error => {
    //         throw error
    //       })
    //   } else {
    //     this.validationMessage = 'Please select level and category'
    //   }
    // }
  }
}
</script>

<style lang="scss" module>
.quiz-setup {
  height: 100%;
  border-radius: 5px;
  &__fieldset {
    width: 300px;
  }
}
</style>
