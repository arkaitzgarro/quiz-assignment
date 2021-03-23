<template>
  <transition>
    <div
      id="app"
      :class="[theme, $style.app ]"
      class="app">
      <router-view/>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState([
      'theme'
    ])
  }
}
</script>
<style lang="scss" module>
  .app {
    height: 100vh;
  }
</style>
