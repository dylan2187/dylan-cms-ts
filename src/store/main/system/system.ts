import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUserListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from '@/types/index'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
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
    },

    // 针对页面的数据：增删改查
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const { code } = await deletePageById(pageName, id)
      if (code === 1) {
        this.postPageListAction(pageName, { offset: 0, size: 10 })
      }
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const { code } = await newPageData(pageName, pageInfo)
      if (code === 1) {
        this.postPageListAction(pageName, { offset: 0, size: 10 })
      }
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const { code } = await editPageData(pageName, id, pageInfo)
      if (code === 1) {
        this.postPageListAction(pageName, { offset: 0, size: 10 })
      }
    }
  }
})

export default useSystemStore
