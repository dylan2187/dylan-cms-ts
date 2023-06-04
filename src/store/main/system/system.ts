import { deleteUserById, postUserListData } from '@/service/main/system/system'
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
    },
    async deleteUserAction(id: number) {
      const { code } = await deleteUserById(id)
      if (code === 1) {
        this.postUsersListAction({ size: 10, offset: 0 })
      }
    }
  }
})

export default useSystemStore
