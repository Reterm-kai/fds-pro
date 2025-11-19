import type { Icon as TablerIcon } from '@tabler/icons-react'

/**
 * 后端返回的原始菜单项数据
 */
export interface RemoteMenuItem {
  /** 唯一标识 */
  id: string
  /** 菜单显示名称 */
  name: string
  /** 对应的路由路径 */
  path?: string
  /** 图标名称(Tabler Icon 组件名) */
  icon?: string
  /** 子菜单 */
  children?: RemoteMenuItem[]
  /** 是否默认展开 */
  initiallyOpened?: boolean
  /** 排序字段(越小越靠前) */
  order?: number
  /** 是否在菜单中隐藏 */
  hidden?: boolean
}

/**
 * 侧边栏渲染所需的菜单结构
 */
export interface MenuViewItem {
  id: string
  label: string
  icon?: TablerIcon
  link?: string
  links?: { label: string; link: string }[]
  initiallyOpened?: boolean
}
