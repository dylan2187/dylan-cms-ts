import {
  deleteUserById,
  editUserData,
  newUserData,
  postUserListData
} from '@/service/main/system/system'
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
    },
    async newUserDataAction(userInfo: any) {
      // 创建新的用户
      const { code } = await newUserData(userInfo)
      // 重新请求数据
      if (code === 1) {
        this.postUsersListAction({ size: 10, offset: 0 })
      }
    },
    async editUserDataAction(id: number, userInfo: any) {
      const { code } = await editUserData(id, userInfo)
      if (code === 1) {
        this.postUsersListAction({ size: 10, offset: 0 })
      }
    }
  }
})

export default useSystemStore
