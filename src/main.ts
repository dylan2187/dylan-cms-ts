import { createApp } from 'vue'
import 'normalize.css' //样式初始化
import './assets/css/index.less'

import App from './App.vue'
import router from './router'
import pinia from './store'
// 全局注册element plus组件
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
// app.use(ElementPlus)

app.mount('#app')
