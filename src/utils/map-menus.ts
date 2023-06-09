import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []

  // 读取router/main下所有的ts文件，不懒加载
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  // 动态获取所有的路由对象，放到数组中
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null
/**
 * @desc: 将菜单映射为路由，用于权限控制
 * @return: {*}
 * @param {any} userMenus
 */
export function mapMenusToRoutes(userMenus: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 1.给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }

        // 2.将二级菜单对应的路径
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 * @desc: 根据路径去匹配需要显示的菜单
 * @return: {*}
 * @param {string} route 所有的菜单
 */
export function mapRouteToMenu(path: string, userMenus: any[]) {
  //从userMenu里找到route对应的菜单item
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
  return undefined
}

/**
 * @desc: 根据当前页面的路径来匹配其父级路径（面包屑的跳转路径）
 * @return: {*}
 * @param {string} path
 * @param {any} userMenus
 */
interface IBreadcrumbs {
  name: string
  path: string
}
export function mapRouteToBreadcrumbs(path: string, userMenus: any[]) {
  // 定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []
  // 遍历获取面包屑的层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url }) //父级的名称和路径
        breadcrumbs.push({ name: submenu.name, path: submenu.url }) //二级的名称和路径
      }
    }
  }
  return breadcrumbs
}

export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)
  // menuList.forEach((item) => {
  //   ids.push(item.id)
  //   if (item.children && item.children.length) {
  //     ids = ids.concat(mapMenuListToIds(item.children))
  //   }
  // })
  return ids
}
