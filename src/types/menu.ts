import type { ReactNode } from 'react'

/**
 * 菜单项配置接口
 */
export interface MenuItem {
  /** 菜单项唯一标识 */
  key: string
  /** 菜单项显示文本 */
  label: string
  /** 图标组件 */
  icon?: ReactNode
  /** 路由路径 */
  path?: string
  /** 子菜单项 */
  children?: MenuItem[]
  /** 是否禁用 */
  disabled?: boolean
}
