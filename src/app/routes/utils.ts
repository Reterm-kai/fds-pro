import type { Icon as TablerIcon } from '@tabler/icons-react'
import type { AppRouteObject } from './router'

/**
 * 菜单项接口
 */
export interface MenuItem {
  /** 菜单项标签 */
  label: string
  /** 菜单图标 */
  icon?: TablerIcon
  /** 路由路径 */
  link?: string
  /** 子菜单 */
  links?: { label: string; link: string }[]
  /** 是否默认展开 */
  initiallyOpened?: boolean
}

/**
 * 从路由配置生成菜单数据
 * @param routes 路由配置数组
 * @param parentPath 父级路径
 * @returns 菜单项数组
 */
export function generateMenuFromRoutes(
  routes: AppRouteObject[],
  parentPath = ''
): MenuItem[] {
  const menuItems: MenuItem[] = []

  for (const route of routes) {
    // 跳过没有 meta 或被隐藏的路由
    if (!route.meta || route.meta.hideInMenu) {
      continue
    }

    // 计算当前路径
    const currentPath = route.path
      ? route.path.startsWith('/')
        ? route.path
        : `${parentPath}/${route.path}`
      : parentPath

    // 如果有子路由,递归生成子菜单
    if (route.children && route.children.length > 0) {
      const childMenuItems = route.children
        .filter(child => child.meta && !child.meta.hideInMenu)
        .map(child => {
          const childPath = child.path
            ? child.path === ''
              ? currentPath
              : `${currentPath}/${child.path}`
            : currentPath

          return {
            label: child.meta!.title || '',
            link: childPath,
          }
        })

      if (childMenuItems.length > 0) {
        menuItems.push({
          label: route.meta.title || '',
          icon: route.meta.icon,
          links: childMenuItems,
          initiallyOpened: route.meta.initiallyOpened,
        })
      }
    } else {
      // 没有子路由的单个菜单项
      menuItems.push({
        label: route.meta.title || '',
        icon: route.meta.icon,
        link: currentPath,
        initiallyOpened: route.meta.initiallyOpened,
      })
    }
  }

  return menuItems
}
