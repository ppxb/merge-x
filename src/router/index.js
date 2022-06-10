import { createWebHashHistory } from 'vue-router'
import { createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/HomePage.vue') },
  {
    path: '/discover',
    component: () => import('../pages/DiscoverPage.vue'),
    redirect: '/'
  },
  {
    path: '/about',
    component: () => import('../pages/AboutPage.vue'),
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
