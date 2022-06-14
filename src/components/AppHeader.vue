<template>
  <div class="app-header">
    <div class="app-header-logo">
      <div>MERGE</div>
      <div class="subtitle">ANIME</div>
    </div>
    <div class="app-header-nav">
      <router-link to="/" exact>HOME</router-link>
      <router-link to="/discover">DISCOVER</router-link>
      <router-link to="/about">ABOUT</router-link>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const currentRoute = router.currentRoute.value.path

const close = () => window.ipc.closeApp()
</script>

<style scoped>
.app-header {
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2.5rem 2rem 6rem;
  background: transparent;
  z-index: 9999;
}

.app-header-logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.875rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.5rem;
  -webkit-app-region: no-drag;
}

.subtitle {
  font-size: 1.225rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.app-header-nav {
  display: flex;
}

.app-header-nav a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  font-weight: 500;
  margin-left: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-app-region: no-drag;
}

.active {
  color: #fff !important;
}

.app-header-nav a:hover {
  color: #fff;
}
</style>
