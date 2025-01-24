// 管理 Vue 的應用程式層級、Vue 特定功能或元件

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// tailwind
import './assets/tailwind.css'

import App from './App.vue'
import router from './router'

library.add(fas, far, fab)

const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
