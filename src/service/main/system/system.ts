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

/**
 * @desc: 删除用户
 * @return: {*}
 * @param {number} id
 */
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

/**
 * @desc: 创建用户
 * @return: {*}
 * @param {any} userInfo
 */
export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}

/**
 * @desc: 编辑用户
 * @return: {*}
 * @param {number} id
 * @param {any} userInfo
 */
export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
