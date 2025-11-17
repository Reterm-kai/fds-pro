/**
 * 集合实体 Public API
 *
 * FSD 规范: 通过 index 文件统一导出公共接口
 */

// Model
export * from './model/types'
export * from './model/keys'

// Lib
export {
  getContentTypeLabel,
  getStrategyLabel,
  getStatusLabel,
  getStatusColor,
} from './lib/collectionUtils'
