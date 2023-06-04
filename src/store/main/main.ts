import { getEntireDepartments, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    async fetchEntireData() {
      const roleResult = await getEntireRoles()
      const departmentResult = await getEntireDepartments()
      this.entireRoles = roleResult.data.list
      this.entireDepartments = departmentResult.data.list
    }
  }
})

export default useMainStore
