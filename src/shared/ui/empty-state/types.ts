/**
 * EmptyState 组件类型定义
 */

import type { ReactNode } from 'react'

/**
 * 预设的空状态图标类型
 */
export type EmptyStateImageType = 'search' | 'nodata' | 'error' | 'folder'

/**
 * EmptyState 组件属性
 */
export interface EmptyStateProps {
  /** 标题 */
  title?: string

  /** 描述文本 */
  description?: string

  /** 图标/图片 */
  image?: ReactNode | EmptyStateImageType

  /** 操作按钮配置 */
  action?: {
    label: string
    onClick: () => void
    icon?: ReactNode
    variant?: 'filled' | 'light' | 'outline' | 'default'
  }

  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg'

  /** 自定义样式 */
  className?: string
}
