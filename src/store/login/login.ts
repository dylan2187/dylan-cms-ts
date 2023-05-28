import { accountLoginRequest } from '@/service/login/login'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state() {
    return {
      id: '',
      token: '',
      name: '',
      password: '',
    }
  },
  actions: {
    async loginAccountAction(account: any) {
      const name = account.account
      const password = account.password
      const loginRes = await accountLoginRequest({ name, password })
      this.id = loginRes.id
      this.name = loginRes.name
      this.token = loginRes.token
    },
  },
})

export default useLoginStore
