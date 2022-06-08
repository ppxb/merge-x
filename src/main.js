import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createClient } from 'villus'

import App from './App.vue'
import router from './router'
import './App.css'

const app = createApp(App)
const pinia = createPinia()
const client = createClient({
  url: 'https://graphql.anilist.co/',
  cachePolicy: 'cache-and-network'
})

app.use(client)
app.use(pinia)
app.use(router)

app.mount('#app')
