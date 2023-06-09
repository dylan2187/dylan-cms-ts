export interface IUser {
  id: number
  name: string
  password: string
  cellphone: string
  departmentId: number
  enable: number
  roleId: number
  createAt: string
  updateAt: string
  realname: string
}

export interface ISystemState {
  usersList: IUser[]
  usersTotalCount: number

  pageList: any[]
  pageTotalCount: number
  menuIds: any[]
}
