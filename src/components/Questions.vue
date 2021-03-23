<template>
  <transition name="slide" appear>
    <PageLayout
      :class="[
        $style.questions,
        $style['questions__bg-img'],
        theme === 'science-theme'
          ? $style['questions__bg-img_science']
          : ['bg-color-1', $style['questions__bg-img_game']]]">
      <div
        slot="header"
        :class="[$style['questions__text'], $style['questions__text_theme']]"
        class="p">
        <div>{{ category }}</div>
        <div :class="$style['questions__text-level']">Level: {{ capitalizeFirstChar(level) }}</div>
      </div>
      <template slot="content">
        <transition name="fade" mode="out-in">
          <div
            :key="questionsAnswered"
            :class="$style['questions__wrapper']"
            class="flex-column flex-justify-center flex-items-center">
            <p
              v-if="hasQuestions"
              :class="$style['questions__text']">
              {{ currentQuestion.number }} of {{ questions.length }}
            </p>
            <h2
              v-if="hasQuestions"
              :class="$style['questions__text']"
              class="margin-10-btm padding-10">
              {{ decodeBase64(currentQuestion.question) }}
            </h2>
            <div :class="$style['questions__grid']">
              <Grid v-if="hasQuestions">
                <template v-for="(answer, index) in currentQuestion.answers">
                  <button
                    ref="answer"
                    :key="index"
                    :class="[
                      $style['questions__answer'], `bg-color-${index + 2}`,
                      {[$style['questions__answer_wrong']]: shakeAnswer === index}
                    ]"
                    :disabled="lockAnswers"
                    class="p padding-8 text-center"
                    @click="isAnswerCorrect(answer, index)">
                      <transition name="slide">
                        <div v-if="checkAnswer !== index">
                          {{ decodeBase64(answer) }}
                        </div>
                        <FontIcon
                          v-else
                          ligature="check_circle"
                          :class="$style['questions__answer_correct']"
                          class="margin-2-left"/>
                      </transition>
                  </button>
                </template>
              </Grid>
            </div>
          </div>
        </transition>
      </template>
    </PageLayout>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import PageLayout from '@/components/core/PageLayout'
import Grid from '@/components/core/Grid'
import FontIcon from '@/components/core/FontIcon'
import { capitalizeFirstChar } from '@/helpers/string'

export default {
  name: 'Questions',
  components: {
    PageLayout,
    Grid,
    FontIcon
  },
  data () {
    return {
      questionsAnswered: 0,
      amountCorrect: 0,
      shakeAnswer: false, // index of answer if true
      checkAnswer: false, // index of answer if true
      lockAnswers: false
    }
  },
  computed: {
    ...mapState([
      'theme',
      'questions',
      'level'
    ]),
    hasQuestions () {
      return this.questions.length > 0
    },
    currentQuestion () {
      return this.questions[this.questionsAnswered]
    },
    currentCorrectAnswer () {
      const { answers, idxOfCorrectAnwser } = this.currentQuestion
      return answers[idxOfCorrectAnwser]
    },
    score () {
      return (Math.round((this.amountCorrect / this.questions.length) * 100))
    },
    category () {
      return this.theme === 'science-theme' ? 'Science & Nature' : 'Video Games'
    }
  },
  beforeMount () {
    // TODO make more explicit
    // No categorie choosen
    if (this.theme === 'default-theme') {
      this.$router.push('/')
    }
  },
  methods: {
    ...mapMutations([
      'storeScore'
    ]),
    capitalizeFirstChar,
    nextQuestion (answer) {
      if (this.questionsAnswered >= this.questions.length - 1) {
        const { level, amountCorrect, score } = this
        this.storeScore({
          category: this.category,
          level,
          amountCorrect,
          score
        })
        this.$router.push({ name: 'Scores' })
      } else {
        this.lockAnswers = false
        this.questionsAnswered++
      }
    },
    isAnswerCorrect (answer, index) {
      this.lockAnswers = true
      const isCorrect = answer === this.currentCorrectAnswer
      if (isCorrect) { this.amountCorrect++ }
      const action = isCorrect ? 'checkAnswer' : 'shakeAnswer'
      setTimeout(() => {
        this[action] = index
        setTimeout(() => {
          this[action] = false
          this.nextQuestion()
        }, 1500)
      }, 350)
    },
    decodeBase64 (str) {
      return window.atob(str)
    }
  }
}
</script>
<style lang="scss" module>
  .questions {
    &__bg-img {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
    }
    &__bg-img_science {
      background-image: url('../assets/img/science.jpg');
    }
    &__bg-img_game {
      background-image: url('../assets/img/mario.png');
      background-size: 125px;
      background-position-y: 90%;
      background-position-x: 9%;
    }
    &__wrapper {
      height: 100%;
    }
    &__text {
      color: white;
      word-wrap: break-word;
      text-shadow : 2px 2px 5px black;
      text-align: center;
    }
    &__text_theme {
      position: absolute;
      right: 0;
      top: 30px;
      font-size: 16px;
      padding: 18px 40px 20px;
      background-color: rgba(252, 231, 1, 0.1);
    }
    &__text-level {
      padding-top: 10px;
      font-size: 12px;
    }
    &__grid {
      width: 650px;
      @media(max-width: 961px) { // tablet
        width: 450px;
      }
      @media(max-width: 685px) { // mobile
        width: 300px;
      }
    }
    &__answer {
      border-radius: 0.75rem;
      overflow: hidden;
      box-shadow: 0 5px 10px rgba(0,0,0,0.3); // TODO: replace with rem
      transition-duration: 0.3s;
      transition-property: transform, box-shadow;
      position: relative;
      color: white;
      text-shadow: 2px 2px 0px rgba(0,0,0,0.20);
      border: none;
      outline: none;
      &:hover {
        box-shadow: 0 8px 16px 3px rgba(0,0,0,0.3); // TODO: replace with rem
        transform: translateY( -2px ) scale( 1.04 );
        cursor: pointer;
      }
      &:active {
        transform: translateY( 2px ) scale( 1 );
        cursor: pointer;
      }
      &:disabled {
        &:hover, &:active {
          box-shadow: 0 8px 16px 3px rgba(0,0,0,0.3); // TODO: replace with rem
          transform: none;
          cursor: default;
        }
      }
    }
    &__answer_wrong {
      animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    }
    &__answer_correct {
      color: rgb(3, 201, 3);
      font-size: 30px !important;
    }
  }

  /** Animation for wrong answer given */
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
