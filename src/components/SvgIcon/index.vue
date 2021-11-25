<template>
  <svg :class="['min-svg-icon', customClass]" :style="svgStyle" aria-hidden="true">
    <use :xlink:href="icon" />
  </svg>
</template>
<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'
const props = defineProps({
  customClass: {
    type: String,
    default: ''
  },
  prefix: {
    type: String,
    default: 'svg'
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 18
  },
  width: {
    type: [Number, String],
    default: 20
  },
  height: {
    type: [Number, String],
    default: 20
  },
  color: {
    type: String,
    default: ''
  }
})

const svgStyle = computed(
  (): CSSProperties => {
    const { size, color } = props
    return {
      width: `${size}px`,
      height: `${size}px`,
      color
    }
  }
)
const icon = computed(() => `#${props.prefix}-${props.name}`)
</script>
<style lang="scss" scoped>
.min-svg-icon {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
