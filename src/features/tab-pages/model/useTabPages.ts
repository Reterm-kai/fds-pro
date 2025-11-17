import { useContext } from 'react'
import { TabContext } from './context'

/**
 * 获取 Tab 状态管理上下文
 */
export function useTabPages() {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error('useTabPages must be used within a TabProvider')
  }
  return context
}
