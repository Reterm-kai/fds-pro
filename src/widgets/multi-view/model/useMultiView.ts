import { useContext } from 'react'
import { MultiViewContext } from './context'

/**
 * 获取多视图状态管理上下文
 */
export function useMultiView() {
  const context = useContext(MultiViewContext)
  if (!context) {
    throw new Error('useMultiView must be used within a MultiViewProvider')
  }
  return context
}
