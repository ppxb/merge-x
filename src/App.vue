<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-notification-provider>
      <n-message-provider>
        <AppHeader />
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'

const themeOverrides = {
  Scrollbar: {
    color: 'rgba(255, 255, 255, 0)'
  }
}
</script>
