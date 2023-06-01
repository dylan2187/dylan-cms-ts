/**
 * @desc: 账号密码登录
 * @return: {*}
 */
export interface IAccount {
  name: string
  password: string
}

export interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  // userInfo: {
  //   id: number
  //   name: string
  //   cellphone: string
  //   createAt: string
  //   updateAt: string
  //   role: {
  //     id: number
  //     name: string
  //     intro: string
  //     createAt: string
  //     updateAt: string
  //   }
  //   department: {
  //     id: number
  //     name: string
  //     createAt: string
  //     updateAt: string
  //   }
  // }
}
