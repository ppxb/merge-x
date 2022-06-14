<template>
  <div class="app-controller">
    <app-icon name="close" @click="closeApp" />
  </div>
</template>

<script setup>
import AppIcon from '../components/AppIcon.vue'

const closeApp = () => window.ipc.closeApp()
</script>

<style scoped>
.app-controller {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem 2rem 1rem 0;
  background: transparent;
  z-index: 99999;
}
</style>
