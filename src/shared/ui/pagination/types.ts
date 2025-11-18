/**
 * Pagination 组件类型定义
 */

/**
 * Pagination 组件属性
 */
export interface PaginationProps {
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

  /** 每页条数选项 */
  pageSizeOptions?: number[]

  /** 显示总数文本 */
  showTotal?: boolean

  /** 显示跳转输入 */
  showJumper?: boolean

  /** 显示每页条数选择器 */
  showSizeChanger?: boolean

  /** 简洁模式 */
  simple?: boolean

  /** 自定义总数文本 */
  totalText?: (total: number, range: [number, number]) => string

  /** 位置 */
  position?: 'left' | 'center' | 'right'
}
