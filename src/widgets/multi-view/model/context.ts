import { createContext } from 'react'
import type { MultiViewContextValue } from './types'

/**
 * 多视图管理上下文
 */
export const MultiViewContext = createContext<MultiViewContextValue | null>(
  null
)
