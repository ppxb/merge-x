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
  width: 1.875em;
  height: 1.875em;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 2px 2px;
  margin-left: 1rem;
  backdrop-filter: blur(20px);
  -webkit-app-region: no-drag;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.svg-icon:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
</style>
