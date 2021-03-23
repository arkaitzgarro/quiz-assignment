<template>
  <span
    ref="icon"
    class="font-icon material-icons">{{ ligature }}</span>
</template>
<script>

export default {
  name: 'FontIcon',
  props: {
    /** Textual name of icon glyph */
    ligature: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>
