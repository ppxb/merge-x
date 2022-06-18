<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-notification-provider>
      <n-message-provider>
        <AppController />
        <AppHeader />
        <router-view v-slot="{ Component }">
          <keep-alive exclude="AnimePage">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppController from './components/AppController.vue'

const themeOverrides = {
  Scrollbar: {
    color: 'rgba(255, 255, 255, 0)',
    colorHover: 'rgba(255, 255, 255, 0)'
  }
}
</script>
