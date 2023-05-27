import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  //hash | history 选择
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 映射关系 ： paht -> component
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue'),
    },
    {
      path: '/main',
      component: () => import('@/views/main/Main.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/NotFound.vue'),
    },
  ],
})

// 导航守卫： 进main时如果发现未登录，则跳login

export default router
