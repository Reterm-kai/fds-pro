import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import {
  useMenu,
  type MenuViewItem,
  type MenuCacheScope,
} from '@/features/menu'
import { useMultiView } from './useMultiView'

function normalizeLink(path?: string) {
  if (!path) return undefined
  return path.startsWith('/') ? path : `/${path}`
}

/**
 * 根据路径从菜单配置中查找对应的标题
 * 支持多级菜单匹配：
 * 1. 精确匹配：优先查找 path 完全匹配的菜单项
 * 2. 父级匹配：如果路径是某个父级菜单的子路径，返回父级菜单标题
 */
function findMenuTitle(items: MenuViewItem[], path: string): string | null {
  // 第一遍：精确匹配
  for (const item of items) {
    if (normalizeLink(item.link) === path) {
      return item.label
    }
    if (item.links) {
      for (const child of item.links) {
        if (normalizeLink(child.link) === path) {
          return child.label
        }
      }
    }
  }

  // 第二遍：检查是否为某个一级菜单的子路径
  // 例如：路径 /dashboard 应该匹配到 "仪表盘" 菜单下的第一个子菜单
  for (const item of items) {
    if (!item.links || item.links.length === 0) continue
    for (const child of item.links) {
      const normalized = normalizeLink(child.link)
      if (!normalized) continue
      const childSegments = normalized.split('/').filter(Boolean)
      if (childSegments.length === 0) continue
      const parentPath = `/${childSegments[0]}`
      if (path === parentPath) {
        return item.label
      }
    }
  }

  return null
}

/**
 * 根据路径生成默认标题
 * 将路径转换为可读标题
 */
function generateDefaultTitle(path: string): string {
  const segments = path.split('/').filter(Boolean)
  if (segments.length === 0) return '首页'

  const lastSegment = segments[segments.length - 1]
  // 简单的路径到中文映射
  const pathMap: Record<string, string> = {
    dashboard: '仪表盘',
    monitor: '实时监控',
    users: '用户管理',
    settings: '系统设置',
    login: '登录',
    register: '注册',
  }

  return pathMap[lastSegment] || lastSegment
}

/**
 * 路由与 Tab 同步 Hook
 * 监听路由变化，自动添加对应的 Tab
 */
interface UseRouteSyncOptions {
  cacheScope?: MenuCacheScope
}

export function useRouteSync(options?: UseRouteSyncOptions) {
  const location = useLocation()
  const { addView, views } = useMultiView()
  const { cacheScope } = options ?? {}
  const { data: menuData, isLoading } = useMenu({ cacheScope })
  const menuItems = useMemo(() => menuData ?? [], [menuData])

  useEffect(() => {
    const currentPath = location.pathname

    // 忽略登录、注册等非应用页面
    if (
      currentPath === '/login' ||
      currentPath === '/register' ||
      currentPath === '/'
    ) {
      return
    }

    if (isLoading && menuItems.length === 0) {
      return
    }

    // 查找或生成标题
    const title =
      findMenuTitle(menuItems, currentPath) || generateDefaultTitle(currentPath)

    // 检查是否已存在该 Tab
    const existingView = views.find(view => view.path === currentPath)

    if (!existingView) {
      // 添加新 Tab（所有 Tab 都可关闭）
      addView({
        path: currentPath,
        title,
        closable: true,
      })
    }

    // 注意：不在这里调用 setActiveView，避免循环导航
    // activeView 状态会在 MultiViewContext 中自动更新
  }, [location.pathname, menuItems, isLoading, views, addView])
}
