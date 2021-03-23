<template>
  <transition name="slide" appear>
    <PageLayout
      :class="[
        $style.scores,
        $style['scores__bg-img'],
        theme === 'science-theme'
          ? $style['scores__bg-img_science']
          : ['bg-color-1', $style['scores__bg-img_game']]]"
      class="bg-color-1">
      <div slot="header"/>
      <div
        slot="content"
        :class="$style['scores__card']"
        class="flex-column flex-justify-center flex-items-center bg-color-1-darker padding-10">
        <h1 class="margin-1-btm">YOUR SCORE</h1>
        <h1>{{totalScore}}</h1>
        <!-- TODO: Move table to own reusable component -->
        <table :class="$style['scores__table']" class="margin-5-top">
          <thead>
            <tr>
              <th :class="$style['scores__table__head-cell']" class="h2 padding-4">Category</th>
              <th :class="$style['scores__table__head-cell']" class="h2 padding-4">Level</th>
              <th :class="$style['scores__table__head-cell']" class="h2 padding-4">Total correct</th>
              <th :class="$style['scores__table__head-cell']" class="h2 padding-4">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(score, index) in scores"
              :key="index">
              <td :class="$style['scores__table__cell']" class="h2 padding-4">{{ score.category }}</td>
              <td :class="$style['scores__table__cell']" class="h2 padding-4">{{ capitalizeFirstChar(score.level) }}</td>
              <td :class="$style['scores__table__cell']" class="h2 padding-4 text-center">{{ score.amountCorrect }}</td>
              <td :class="$style['scores__table__cell']" class="h2 padding-4">{{ score.score }}</td>
            </tr>
          </tbody>
        </table>
        <button
          class="button button_1-inverse margin-10-top flex-self-center"
          @click.prevent="startQuiz">Try again</button>
      </div>
      <div slot="footer">
      </div>
    </PageLayout>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import PageLayout from '@/components/core/PageLayout'
import { capitalizeFirstChar } from '@/helpers/string'
export default {
  name: 'Scores',
  components: {
    PageLayout
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'theme',
      'scores'
    ]),
    hasAnyScores () {
      return this.scores.length > 0
    },
    totalScore () {
      let total = 0
      for (const { score } of this.scores) {
        total = total + score
      }
      return Math.round(total / this.scores.length)
    }
  },
  beforeMount () {
    if (this.scores.length === 0) {
      this.startQuiz()
    }
  },
  methods: {
    capitalizeFirstChar,
    startQuiz () {
      this.$router.push({ name: 'QuizSetup' })
    }
  }
}
</script>

<style lang="scss" module>
  .scores {
    overflow: auto;
    &__card {
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
    }
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
      background-position-x: 97%;
    }
    &__table {
      &__head-cell,
      &__cell {
        border-bottom: 1px solid;
        border-collapse:collapse;
        border-spacing:0;
      }
      &__head-cell {
        text-align: left;
      }
      &__cell:last-child {
        border-right: 1px solid;
      }
      &__cell:first-child {
        border-left: 1px solid;
      }
    }
  }
</style>
