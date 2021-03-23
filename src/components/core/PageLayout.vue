<template>
  <div
    :class="$style['page-layout']"
    class="flex-column">
    <header
      v-if="hasHeaderSlot"
      :class="$style['page-layout__header']"
      class="flex-row">
      <div class="flex-1"/>
      <div
        :class="$style['page-layout__header-content']"
        class="flex-self-center">
        <slot name="header"/>
      </div>
      <div class="flex-1"/>
    </header>
    <main
      :class="$style['page-layout__main']"
      class="flex-row flex-1">
      <aside class="flex-1">
        <slot name='side-left'/>
      </aside>
      <section :class="$style['page-layout__main-content']">
        <slot name='content'/>
      </section>
      <aside class="flex-1">
        <slot name='side-right'/>
      </aside>
    </main>
    <footer v-if="hasFooterSlot">
      <div
        :class="$style['page-layout__footer']">
        <slot name="footer"/>
      </div>
    </footer>
    <!-- TODO: Remove slot and refactor questions view -->
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'PageLayout',
  computed: {
    hasHeaderSlot () {
      return !!this.$slots.header
    },
    hasFooterSlot () {
      return !!this.$slots.footer
    }
  }
}
</script>

<style lang="scss" module>
  .page-layout {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    &__header,
    &__footer {
      height: 7.5rem;
      min-height: 7.5rem;// FF fix
      @media(max-width: 961px) { // tablet
        height: 5.625rem;
        min-height: 5.625rem;
      }

      @media(max-width: 685px) { // mobile
        height: 3.75rem;
        min-height: 3.75rem;
      }
    }
    &__header-content,
    &__main-content {
      transition: min-width 400ms ease-in-out;
      min-width: 56.25rem;
      @media(max-width: 961px) { // tablet
        min-width: 42.1875rem;
      }
      @media(max-width: 685px) { // mobile
        min-width: 100vw;
      }
    }
  }
</style>
