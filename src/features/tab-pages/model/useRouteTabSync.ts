import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { menuItems } from '@/shared/navigation/menu'
import type { MenuItem } from '@/shared/navigation/types'
import { useTabPages } from './useTabPages'

/**
 * 根据路径从菜单配置中查找对应的标题
 */
function findMenuTitle(items: MenuItem[], path: string): string | null {
  for (const item of items) {
    if (item.path === path) {
      return item.label
    }
    if (item.children) {
      const childTitle = findMenuTitle(item.children, path)
      if (childTitle) {
        return childTitle
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
export function useRouteTabSync() {
  const location = useLocation()
  const { addTab, tabs } = useTabPages()

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

    // 查找或生成标题
    const title =
      findMenuTitle(menuItems, currentPath) || generateDefaultTitle(currentPath)

    // 检查是否已存在该 Tab
    const existingTab = tabs.find(tab => tab.path === currentPath)

    if (!existingTab) {
      // 添加新 Tab（所有 Tab 都可关闭）
      addTab({
        path: currentPath,
        title,
        closable: true,
      })
    }

    // 注意：不在这里调用 setActiveTab，避免循环导航
    // activeTab 状态会在 TabContext 中自动更新
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, addTab])
}
