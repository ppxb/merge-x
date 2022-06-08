<template>
  <div class="app-header">
    <div class="app-header-logo">
      <div>MERGE</div>
      <div class="subtitle">ANIME</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.app-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 2rem 6rem;
  background: transparent;
  z-index: 999;
}

.app-header-logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  line-height: 2rem;
}

.subtitle {
  font-size: 1.5rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}
</style>
