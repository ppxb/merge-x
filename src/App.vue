<template>
  <n-config-provider>
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
</script>
