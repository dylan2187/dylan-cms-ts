import { postUserListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from '@/types/index'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const userListResult = await postUserListData(queryInfo)
      const { totalCount, list } = userListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    }
  }
})

export default useSystemStore
