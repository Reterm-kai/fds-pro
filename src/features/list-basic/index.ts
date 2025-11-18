/**
 * 基础列表特性 Public API
 *
 * FSD 规范: 通过 index 文件统一导出公共接口
 */

// API
export { useListData } from './api/useListData'

// Model
export type {
  ListItem,
  ListParams,
  ListResponse,
  ListContentType,
  ListStrategy,
  ListStatus,
} from './model/types'
export { listKeys } from './model/keys'

// Lib
export {
  getContentTypeLabel,
  getStrategyLabel,
  getStatusLabel,
  getStatusColor,
} from './lib/utils'
