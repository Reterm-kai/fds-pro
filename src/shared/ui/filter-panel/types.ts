/**
 * FilterPanel 组件类型定义
 */

/**
 * 筛选字段类型
 */
export type FilterFieldType =
  | 'text'
  | 'select'
  | 'multiSelect'
  | 'date'
  | 'dateRange'
  | 'number'
  | 'numberRange'

/**
 * 下拉选项
 */
export interface FilterFieldOption {
  value: string
  label: string
}

/**
 * 筛选字段配置
 */
export interface FilterFieldConfig<
  TValues extends Record<string, unknown> = Record<string, unknown>,
> {
  /** 字段名 */
  name: string

  /** 显示标签 */
  label: string

  /** 字段类型 */
  type: FilterFieldType

  /** 占位符 */
  placeholder?: string

  /** 下拉选项 (type='select' | 'multiSelect' 时必需) */
  options?: FilterFieldOption[]

  /** 栅格布局配置 */
  span?: { base?: number; md?: number; lg?: number }

  /** 是否必填 */
  required?: boolean

  /** 是否禁用 */
  disabled?: boolean | ((values: TValues) => boolean)

  /** 是否显示 (支持条件显示) */
  show?: (values: TValues) => boolean

  /** 是否可清除 */
  clearable?: boolean
}

/**
 * FilterPanel 组件属性
 */
export interface FilterPanelProps<TValues extends Record<string, unknown>> {
  /** 筛选字段配置 */
  fields: FilterFieldConfig<TValues>[]

  /** 当前筛选值 */
  values: TValues

  /** 加载状态 */
  loading?: boolean

  /** 是否可折叠 */
  collapsible?: boolean

  /** 默认折叠状态 */
  defaultCollapsed?: boolean

  /** 字段值变化回调 */
  onChange: (name: keyof TValues, value: TValues[keyof TValues]) => void

  /** 查询按钮点击回调 */
  onSearch: () => void

  /** 重置按钮点击回调 */
  onReset: () => void

  /** 自定义查询按钮文本 */
  searchText?: string

  /** 自定义重置按钮文本 */
  resetText?: string

  /** 是否显示操作按钮 */
  showActions?: boolean
}
