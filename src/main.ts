import { createApp } from 'vue'
import 'normalize.css' //样式初始化
import './assets/css/index.less'

import App from './App.vue'
import router from './router'
import pinia from './stores'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
