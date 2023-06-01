import hyRequest from '..'
import type { IAccount } from '@/types'

/**
 * @desc: 用户登录的接口
 * @return: {*}
 * @param {IAccount} account
 */
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

/**
 * @desc: 通过用户的Id获取用户的角色等信息(须携带token)
 * @return: {*}
 * @param {number} id
 */
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}
