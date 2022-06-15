import { createWebHashHistory } from 'vue-router'
import { createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/HomePage.vue') },
  {
    path: '/discover',
    component: () => import('../pages/DiscoverPage.vue')
  },
  {
    path: '/about',
    component: () => import('../pages/AboutPage.vue'),
    redirect: '/'
  },
  {
    path: '/anime/:id',
    name: 'AnimePage',
    component: () => import('../pages/AnimePage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
