import { useState, useEffect, useRef, useCallback } from 'react'
import { X, RefreshCw, XCircle, Trash2 } from 'lucide-react'
import { Box } from '@mantine/core'
import { useTabPages } from '../model/useTabPages'
import classes from './TabBar.module.css'
import * as React from "react";

interface ContextMenuState {
  visible: boolean
  x: number
  y: number
  tabPath: string
}

/**
 * Tab 页签栏组件
 * 显示所有打开的标签页，支持切换、关闭和右键菜单操作
 */
export function TabBar() {
  const {
    tabs,
    activeTab,
    setActiveTab,
    closeTab,
    closeOtherTabs,
    closeAllTabs,
    refreshTab,
  } = useTabPages()

  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    tabPath: '',
  })

  const contextMenuRef = useRef<HTMLDivElement>(null)

  // 处理右键菜单
  const handleContextMenu = useCallback(
    (e: React.MouseEvent, tabPath: string) => {
      e.preventDefault()
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        tabPath,
      })
    },
    []
  )

  // 关闭右键菜单
  const closeContextMenu = useCallback(() => {
    setContextMenu(prev => ({ ...prev, visible: false }))
  }, [])

  // 点击外部关闭右键菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target as Node)
      ) {
        closeContextMenu()
      }
    }

    if (contextMenu.visible) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [contextMenu.visible, closeContextMenu])

  // 处理关闭按钮点击
  const handleCloseClick = useCallback(
    (e: React.MouseEvent, path: string) => {
      e.stopPropagation()
      closeTab(path)
    },
    [closeTab]
  )

  // 右键菜单操作
  const handleRefresh = useCallback(() => {
    refreshTab(contextMenu.tabPath)
    closeContextMenu()
  }, [contextMenu.tabPath, refreshTab, closeContextMenu])

  const handleClose = useCallback(() => {
    closeTab(contextMenu.tabPath)
    closeContextMenu()
  }, [contextMenu.tabPath, closeTab, closeContextMenu])

  const handleCloseOthers = useCallback(() => {
    closeOtherTabs(contextMenu.tabPath)
    closeContextMenu()
  }, [contextMenu.tabPath, closeOtherTabs, closeContextMenu])

  const handleCloseAll = useCallback(() => {
    closeAllTabs()
    closeContextMenu()
  }, [closeAllTabs, closeContextMenu])

  // 获取当前右键菜单对应的 Tab
  const currentContextTab = tabs.find(t => t.path === contextMenu.tabPath)
  const hasClosableTabs = tabs.some(t => t.closable)
  const hasOtherClosableTabs = tabs.some(
    t => t.path !== contextMenu.tabPath && t.closable
  )

  return (
    <>
      <Box className={classes.tabBar}>
        {tabs.map(tab => (
          <div
            key={tab.path}
            className={`${classes.tab} ${tab.path === activeTab ? classes.tabActive : ''}`}
            onClick={() => setActiveTab(tab.path)}
            onContextMenu={e => handleContextMenu(e, tab.path)}
          >
            <span className={classes.tabLabel}>{tab.title}</span>
            {tab.closable && (
              <span
                className={classes.closeButton}
                onClick={e => handleCloseClick(e, tab.path)}
              >
                <X size={14} />
              </span>
            )}
          </div>
        ))}
      </Box>

      {/* 右键菜单 */}
      {contextMenu.visible && (
        <div
          ref={contextMenuRef}
          className={classes.contextMenu}
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <div className={classes.contextMenuItem} onClick={handleRefresh}>
            <RefreshCw size={12} />
            <span>刷新</span>
          </div>

          {currentContextTab?.closable ? (
            <div className={classes.contextMenuItem} onClick={handleClose}>
              <X size={12} />
              <span>关闭</span>
            </div>
          ) : (
            <div
              className={`${classes.contextMenuItem} ${classes.contextMenuItemDisabled}`}
            >
              <X size={12} />
              <span>关闭</span>
            </div>
          )}

          {hasOtherClosableTabs ? (
            <div className={classes.contextMenuItem} onClick={handleCloseOthers}>
              <XCircle size={12} />
              <span>关闭其他</span>
            </div>
          ) : (
            <div
              className={`${classes.contextMenuItem} ${classes.contextMenuItemDisabled}`}
            >
              <XCircle size={12} />
              <span>关闭其他</span>
            </div>
          )}

          {hasClosableTabs ? (
            <div className={classes.contextMenuItem} onClick={handleCloseAll}>
              <Trash2 size={12} />
              <span>全部关闭</span>
            </div>
          ) : (
            <div
              className={`${classes.contextMenuItem} ${classes.contextMenuItemDisabled}`}
            >
              <Trash2 size={12} />
              <span>全部关闭</span>
            </div>
          )}
        </div>
      )}
    </>
  )
}
