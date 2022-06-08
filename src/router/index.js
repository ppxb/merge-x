import { createWebHashHistory } from 'vue-router'
import { createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/HomePage.vue') },
  { path: '/discover', component: () => import('../pages/DiscoverPage.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
