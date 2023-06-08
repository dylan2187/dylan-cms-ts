import hyRequest from '..'

/**
 * @desc:获取角色列表
 * @return: {*}
 */
export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list'
  })
}

/**
 * @desc: 获取部门列表
 * @return: {*}
 */
export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}

/**
 * @desc: 获取菜单（权限）列表
 * @return: {*}
 */
export function getEntireMenus() {
  return hyRequest.post({
    url: '/menu/list'
  })
}
