import hyRequest from '@/service'

/**
 * @desc: 获取用户列表
 * @return: {*}
 * @param {any} queryInfo
 */
export function postUserListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
