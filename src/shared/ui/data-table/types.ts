/**
 * DataTable 组件类型定义
 */

import type { ReactNode } from 'react'

/**
 * 列配置
 */
export interface ColumnConfig<T> {
  /** 列 key */
  key: keyof T | 'actions' | string

  /** 列标题 */
  title: string

  /** 数据字段 (默认同 key) */
  dataIndex?: keyof T

  /** 列宽度 */
  width?: string | number

  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'

  /** 是否可排序 */
  sortable?: boolean

  /** 超长省略 */
  ellipsis?: boolean

  /** 自定义渲染 */
  render?: (value: any, record: T, index: number) => ReactNode
}

/**
 * 表格行操作
 */
export interface TableAction<T> {
  /** 操作 key */
  key: string

  /** 操作标签 */
  label: string

  /** 操作图标 */
  icon?: ReactNode

  /** 按钮颜色 */
  color?: string

  /** 按钮变体 */
  variant?: 'filled' | 'light' | 'outline' | 'subtle'

  /** 点击回调 */
  onClick: (record: T) => void | Promise<void>

  /** 是否显示 */
  show?: (record: T) => boolean

  /** 是否禁用 */
  disabled?: (record: T) => boolean
}

/**
 * 分页配置
 */
export interface PaginationConfig {
  /** 当前页码 */
  page: number

  /** 每页条数 */
  pageSize: number

  /** 总条数 */
  total: number

  /** 页码变化回调 */
  onChange: (page: number) => void

  /** 每页条数变化回调 */
  onPageSizeChange?: (pageSize: number) => void

  /** 显示总数 */
  showTotal?: boolean

  /** 显示跳转 */
  showJumper?: boolean

  /** 显示每页条数选择 */
  showSizeChanger?: boolean

  /** 位置 */
  position?: 'top' | 'bottom' | 'both'
}

/**
 * 排序配置
 */
export interface SortConfig {
  /** 排序字段 */
  field?: string

  /** 排序顺序 */
  order?: 'asc' | 'desc'

  /** 排序变化回调 */
  onChange: (field: string) => void
}

/**
 * DataTable 组件属性
 */
export interface DataTableProps<T> {
  /** 列配置 */
  columns: ColumnConfig<T>[]

  /** 数据源 */
  data: T[]

  /** 加载状态 */
  loading?: boolean

  /** 行 key 字段 */
  rowKey: keyof T

  /** 分页配置 */
  pagination?: PaginationConfig

  /** 排序配置 */
  sortable?: SortConfig

  /** 行操作 */
  actions?: TableAction<T>[]

  /** 空状态文本 */
  emptyText?: string

  /** 空状态图标 */
  emptyImage?: ReactNode | 'search' | 'nodata' | 'error'

  /** 是否斑马纹 */
  striped?: boolean

  /** 是否高亮 hover */
  highlightOnHover?: boolean

  /** 是否显示边框 */
  withBorder?: boolean

  /** 表格尺寸 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}
