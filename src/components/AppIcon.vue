<template>
  <svg
    :class="svgClass"
    v-bind="$attrs"
    :style="{ color }"
    @mouseenter="color = '#fff'"
    @mouseleave="color = 'rgba(255,255,255,.7)'"
  >
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'rgba(255,255,255,.7)'
  }
})

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`
  }
  return 'svg-icon'
})
</script>
<style>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  -webkit-app-region: no-drag;
}

.svg-icon:hover {
  cursor: pointer;
}
</style>
