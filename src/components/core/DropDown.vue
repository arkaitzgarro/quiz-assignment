<template>
  <div class="flex-column flex-items-center">
    <!-- TODO: Build one from scratch. Used select to save time -->
    <select
      v-model="selected"
      :id="id"
      :class="$style.select"
      class="margin-4 padding-6 color-1-black p">
      <option
        disabled
        value="">
        {{ placeholder }}
      </option>
      <template
        v-for="option in options">
        <option
          :key="option.id || option"
          :value="option">
          {{ option.name || option }}
        </option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    required: {
      type: Boolean,
      required: true
    },
    /** Initial value selected */
    value: {
      type: [Object, String],
      default: () => {},
      required: false
    },
    placeholder: {
      type: String,
      default: 'Please select one',
      required: false
    },
    label: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    selected: {
      get () {
        return this.default || ''
      },
      set (newValue) {
        this.$emit('select', newValue)
        return newValue
      }
    }
  }
}
</script>
<style lang="scss" module>
  .select {
    appearance: none;
    outline: none;
    background-color: white;
    border: none;
    width: 500px;
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }
</style>
