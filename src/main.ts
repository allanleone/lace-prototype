import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

import VueNumber from 'vue-number-animation'

app.use(router)
app.use(pinia)
app.use(VueNumber)

app.mount('#lace')
