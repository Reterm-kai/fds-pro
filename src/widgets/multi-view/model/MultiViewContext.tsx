import { useState, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { ViewPage, MultiViewContextValue } from './types'
import { MultiViewContext } from './context'

const STORAGE_KEY = 'fds-pro-multi-views'

interface MultiViewProviderProps {
  children: ReactNode
}

function loadViewsFromStorage(): ViewPage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item: unknown) =>
            item &&
            typeof item === 'object' &&
            'path' in item &&
            'title' in item &&
            'closable' in item
        )
      }
    }
  } catch {
    // 解析失败
  }
  return []
}

function saveViewsToStorage(views: ViewPage[]) {
  try {
    const toSave = views.map(({ path, title, closable }) => ({
      path,
      title,
      closable,
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  } catch {
    // 存储失败
  }
}

/**
 * 多视图状态管理 Provider
 * 管理所有打开的视图状态,支持持久化
 */
export function MultiViewProvider({ children }: MultiViewProviderProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const [views, setViews] = useState<ViewPage[]>(() => loadViewsFromStorage())
  const activeView = location.pathname

  useEffect(() => {
    saveViewsToStorage(views)
  }, [views])

  // 添加新视图
  const addView = useCallback((view: ViewPage) => {
    setViews(prev => {
      const exists = prev.find(v => v.path === view.path)
      if (exists) {
        return prev
      }
      return [...prev, view]
    })
  }, [])

  // 关闭指定视图
  const closeView = useCallback(
    (path: string) => {
      const closingView = views.find(v => v.path === path)
      if (!closingView?.closable) {
        return
      }

      const newViews = views.filter(v => v.path !== path)
      setViews(newViews)

      if (newViews.length === 0) {
        navigate('/')
        return
      }

      const removedWasActive = activeView === path
      const stillContainsActive = newViews.some(v => v.path === activeView)

      if (removedWasActive || !stillContainsActive) {
        const nextView = newViews[newViews.length - 1]
        navigate(nextView.path)
      }
    },
    [views, activeView, navigate]
  )

  // 关闭其他视图
  const closeOtherViews = useCallback(
    (path: string) => {
      const currentView = views.find(v => v.path === path)
      if (!currentView) return

      const newViews = views.filter(v => v.path === path || !v.closable)
      setViews(newViews)

      if (!newViews.find(v => v.path === activeView)) {
        navigate(path)
      }
    },
    [views, activeView, navigate]
  )

  // 关闭所有可关闭的视图
  const closeAllViews = useCallback(() => {
    const newViews = views.filter(v => !v.closable)
    setViews(newViews)

    if (newViews.length === 0) {
      navigate('/')
      return
    }

    if (!newViews.find(v => v.path === activeView)) {
      navigate(newViews[0].path)
    }
  }, [views, activeView, navigate])

  // 设置激活的视图
  const setActiveView = useCallback(
    (path: string) => {
      navigate(path)
    },
    [navigate]
  )

  const value: MultiViewContextValue = {
    views,
    activeView,
    addView,
    closeView,
    closeOtherViews,
    closeAllViews,
    setActiveView,
  }

  return (
    <MultiViewContext.Provider value={value}>
      {children}
    </MultiViewContext.Provider>
  )
}
