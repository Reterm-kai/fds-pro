import { useState, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { TabPage, TabContextValue } from './types'
import { TabContext } from './context'

const STORAGE_KEY = 'fds-pro-tabs'

interface TabProviderProps {
  children: ReactNode
}

/**
 * 从 localStorage 加载 Tab 状态
 */
function loadTabsFromStorage(): TabPage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // 验证数据格式
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (tab: unknown) =>
            tab &&
            typeof tab === 'object' &&
            'path' in tab &&
            'title' in tab &&
            'closable' in tab
        )
      }
    }
  } catch {
    // 解析失败时返回空数组
  }
  return []
}

/**
 * 保存 Tab 状态到 localStorage
 */
function saveTabsToStorage(tabs: TabPage[]) {
  try {
    // 只保存必要字段，不保存 refreshKey
    const toSave = tabs.map(({ path, title, closable }) => ({
      path,
      title,
      closable,
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  } catch {
    // 存储失败时静默处理
  }
}

/**
 * Tab 状态管理 Provider
 * 管理所有打开的标签页状态，支持持久化
 */
export function TabProvider({ children }: TabProviderProps) {
  const navigate = useNavigate()
  const location = useLocation()

  // 从 localStorage 初始化 Tab 状态
  const [tabs, setTabs] = useState<TabPage[]>(() => loadTabsFromStorage())
  const activeTab = location.pathname

  // 当 tabs 变化时，保存到 localStorage
  useEffect(() => {
    saveTabsToStorage(tabs)
  }, [tabs])

  // 添加新 Tab
  const addTab = useCallback((tab: TabPage) => {
    setTabs(prev => {
      const exists = prev.find(t => t.path === tab.path)
      if (exists) {
        return prev
      }
      return [...prev, tab]
    })
  }, [])

  // 关闭指定 Tab
  const closeTab = useCallback(
    (path: string) => {
      const tab = tabs.find(t => t.path === path)
      if (!tab || !tab.closable) {
        return
      }

      const closedIndex = tabs.findIndex(t => t.path === path)
      const newTabs = tabs.filter(t => t.path !== path)
      setTabs(newTabs)

      // 如果没有剩余 Tab，跳转到首页
      if (newTabs.length === 0) {
        navigate('/')
        return
      }

      // 如果关闭的是当前激活的 Tab，切换到上一个 Tab（优先）或下一个
      if (path === activeTab) {
        // 优先切换到上一个标签，如果没有则切换到当前位置的标签（原来的下一个）
        const newActiveIndex = closedIndex > 0 ? closedIndex - 1 : 0
        const newActivePath = newTabs[newActiveIndex].path
        navigate(newActivePath)
      }
    },
    [tabs, activeTab, navigate]
  )

  // 关闭其他 Tab
  const closeOtherTabs = useCallback(
    (path: string) => {
      const currentTab = tabs.find(t => t.path === path)
      if (!currentTab) return

      // 保留当前 Tab 和不可关闭的 Tab
      const newTabs = tabs.filter(t => t.path === path || !t.closable)
      setTabs(newTabs)

      // 如果当前激活的不在新列表中，切换到指定的 Tab
      if (!newTabs.find(t => t.path === activeTab)) {
        navigate(path)
      }
    },
    [tabs, activeTab, navigate]
  )

  // 关闭所有可关闭的 Tab
  const closeAllTabs = useCallback(() => {
    const newTabs = tabs.filter(t => !t.closable)
    setTabs(newTabs)

    // 如果没有剩余 Tab，跳转到首页
    if (newTabs.length === 0) {
      navigate('/')
      return
    }

    // 切换到第一个不可关闭的 Tab
    if (!newTabs.find(t => t.path === activeTab)) {
      const firstTab = newTabs[0]
      navigate(firstTab.path)
    }
  }, [tabs, activeTab, navigate])

  // 刷新指定 Tab
  const refreshTab = useCallback((path: string) => {
    setTabs(prev =>
      prev.map(tab =>
        tab.path === path ? { ...tab, refreshKey: Date.now() } : tab
      )
    )
  }, [])

  // 设置激活的 Tab
  const setActiveTab = useCallback(
    (path: string) => {
      navigate(path)
    },
    [navigate]
  )

  const value: TabContextValue = {
    tabs,
    activeTab,
    addTab,
    closeTab,
    closeOtherTabs,
    closeAllTabs,
    refreshTab,
    setActiveTab,
  }

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>
}
