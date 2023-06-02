import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount, ILoginState } from '@/types'
import { localCache } from '@/utils/cache1'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import type { RouteRecordRaw } from 'vue-router'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('menuInfo') ?? []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      const name = loginResult.data.name
      this.token = loginResult.data.token
      // 后面的网络请求都需要使用localstorge里的token，所以要先存下
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息（role信息）
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      // console.log(this.userInfo.role)

      // 3.根据角色请求用户的权限（菜单menus）
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 重要：动态的添加路由
      const localRoutes: RouteRecordRaw[] = []

      // 读取router/main下所有的ts文件
      const files: Record<string, any> = import.meta.glob(
        '@/router/main/**/*.ts',
        { eager: true }
      )
      // 动态获取所有的路由对象，放到数组中
      for (const key in files) {
        const module = files[key]
        localRoutes.push(module)
        router.addRoute('main', module.default)
      }
      // 根据菜单去匹配正确的路由
      for (const menu of userMenus) {
        for (const submenu of menu.children) {
          const route = localRoutes.find((item) => item.path === submenu.url)
          //类型缩小
          if (route) {
            router.addRoute('main', route)
          }
        }
      }
      // 4.进行本地缓存

      localCache.setCache('userInfo', userInfo)
      localCache.setCache('menuInfo', userMenus)
      // 跳转到main
      router.push('/main')
    }
  }
})

export default useLoginStore
