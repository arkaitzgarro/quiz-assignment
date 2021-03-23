<template>
  <div :class="$style.grid">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Grid'
  // TODO: Add prop to support grids with different rows
}
</script>
<style lang="scss" module>
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(size(55), 1fr);
    grid-gap: 1.7rem;
    align-items: center;
  }
</style>
