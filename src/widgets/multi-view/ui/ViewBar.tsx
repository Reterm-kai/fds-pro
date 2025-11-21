import { useState, useEffect, useRef, useCallback } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import {
  X,
  RefreshCw,
  XCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Box } from '@mantine/core'
import { useMultiView } from '@/widgets/multi-view'
import classes from './ViewBar.module.css'

const SCROLL_DISTANCE = 200

interface ContextMenuState {
  visible: boolean
  x: number
  y: number
  viewPath: string
}

export const VIEW_BAR_HEIGHT = 'calc(var(--mantine-spacing-lg) * 1.75)'

interface ViewBarProps {
  /**
   * Tab 容器高度，默认使用设计约定（约 35px）
   */
  height?: string
}

/**
 * 视图标签栏组件
 * 显示所有打开的视图,支持切换、关闭和右键菜单操作
 */
export function ViewBar({ height }: ViewBarProps = {}) {
  const {
    views,
    activeView,
    setActiveView,
    closeView,
    closeOtherViews,
    closeAllViews,
    refreshView,
  } = useMultiView()

  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    viewPath: '',
  })

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const contextMenuRef = useRef<HTMLDivElement>(null)
  const tabListRef = useRef<HTMLDivElement>(null)

  const checkScrollState = useCallback(() => {
    const container = tabListRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
  }, [])

  useEffect(() => {
    const container = tabListRef.current
    if (!container) return

    checkScrollState()
    container.addEventListener('scroll', checkScrollState)
    window.addEventListener('resize', checkScrollState)

    return () => {
      container.removeEventListener('scroll', checkScrollState)
      window.removeEventListener('resize', checkScrollState)
    }
  }, [checkScrollState])

  useEffect(() => {
    checkScrollState()
  }, [views, checkScrollState])

  const scrollLeft = useCallback(() => {
    tabListRef.current?.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' })
  }, [])

  const scrollRight = useCallback(() => {
    tabListRef.current?.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' })
  }, [])

  const handleContextMenu = useCallback(
    (e: MouseEvent<HTMLDivElement>, viewPath: string) => {
      e.preventDefault()
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        viewPath,
      })
    },
    []
  )

  const closeContextMenu = useCallback(() => {
    setContextMenu(prev => ({ ...prev, visible: false }))
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target as Node)
      ) {
        closeContextMenu()
      }
    }

    if (contextMenu.visible) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [contextMenu.visible, closeContextMenu])

  const handleCloseClick = useCallback(
    (e: MouseEvent<HTMLSpanElement>, path: string) => {
      e.stopPropagation()
      closeView(path)
    },
    [closeView]
  )

  const handleRefresh = useCallback(() => {
    refreshView(contextMenu.viewPath)
    closeContextMenu()
  }, [contextMenu.viewPath, refreshView, closeContextMenu])

  const handleClose = useCallback(() => {
    closeView(contextMenu.viewPath)
    closeContextMenu()
  }, [contextMenu.viewPath, closeView, closeContextMenu])

  const handleCloseOthers = useCallback(() => {
    closeOtherViews(contextMenu.viewPath)
    closeContextMenu()
  }, [contextMenu.viewPath, closeOtherViews, closeContextMenu])

  const handleCloseAll = useCallback(() => {
    closeAllViews()
    closeContextMenu()
  }, [closeAllViews, closeContextMenu])

  const currentContextView = views.find(v => v.path === contextMenu.viewPath)
  const hasClosableViews = views.some(v => v.closable)
  const hasOtherClosableViews = views.some(
    v => v.path !== contextMenu.viewPath && v.closable
  )

  const barHeight = height ?? VIEW_BAR_HEIGHT
  const wrapperStyle = {
    '--view-bar-height': barHeight,
  } as CSSProperties

  return (
    <>
      <Box className={classes.tabBarWrapper} style={wrapperStyle}>
        {canScrollLeft && (
          <button
            className={classes.scrollButton}
            onClick={scrollLeft}
            type="button"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        <div className={classes.tabBar} ref={tabListRef}>
          {views.map(view => (
            <div
              key={view.path}
              className={`${classes.tab} ${view.path === activeView ? classes.tabActive : ''}`}
              onClick={() => setActiveView(view.path)}
              onContextMenu={e => handleContextMenu(e, view.path)}
            >
              <span className={classes.tabLabel}>{view.title}</span>
              {view.closable && (
                <span
                  className={classes.closeButton}
                  onClick={e => handleCloseClick(e, view.path)}
                >
                  <X size={14} />
                </span>
              )}
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            className={classes.scrollButton}
            onClick={scrollRight}
            type="button"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </Box>

      {contextMenu.visible && (
        <div
          ref={contextMenuRef}
          className={classes.contextMenu}
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <ContextMenuItem
            icon={<RefreshCw size={12} />}
            label="刷新"
            onClick={handleRefresh}
          />
          <ContextMenuItem
            icon={<X size={12} />}
            label="关闭"
            onClick={handleClose}
            disabled={!currentContextView?.closable}
          />
          <ContextMenuItem
            icon={<XCircle size={12} />}
            label="关闭其他"
            onClick={handleCloseOthers}
            disabled={!hasOtherClosableViews}
          />
          <ContextMenuItem
            icon={<Trash2 size={12} />}
            label="全部关闭"
            onClick={handleCloseAll}
            disabled={!hasClosableViews}
          />
        </div>
      )}
    </>
  )
}

interface ContextMenuItemProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  disabled?: boolean
}

function ContextMenuItem({
  icon,
  label,
  onClick,
  disabled = false,
}: ContextMenuItemProps) {
  return (
    <div
      className={`${classes.contextMenuItem} ${disabled ? classes.contextMenuItemDisabled : ''}`}
      onClick={disabled ? undefined : onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  )
}
