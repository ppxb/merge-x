import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createClient } from 'villus'

import lazyImage from './directive/lazyImage'

import App from './App.vue'
import router from './router'
import './App.css'

const app = createApp(App)
const pinia = createPinia()
const client = createClient({
  url: 'https://graphql.anilist.co/',
  cachePolicy: 'cache-and-network'
})

// plugins
app.use(client)
app.use(pinia)
app.use(router)

// directives
app.directive('lazy-image', lazyImage)

// hotkeys
window.addEventListener('keydown', event => {
  if (event.ctrlKey && event.key === '/') console.log(123)
})

app.mount('#app')
