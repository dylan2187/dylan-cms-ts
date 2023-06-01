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

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      const name = loginResult.data.name
      this.token = loginResult.data.token

      // 2.进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3.获取登录用户的详细信息（role信息）
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data
      // console.log(this.userInfo.role)

      // 4.根据角色请求用户的权限（菜单menus）
      const menuInfoResult = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = menuInfoResult.data
      console.log(menuInfoResult.data)
      // 3. 跳转到main
      router.push('/main')
    }
  }
})

export default useLoginStore
