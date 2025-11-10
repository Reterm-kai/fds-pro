/**
 * 用户实体 Public API
 *
 * FSD 规范: 通过 index 文件统一导出公共接口
 */

// Model
export * from './model/types'
export * from './model/keys'

// API
export { getUser } from './api/userApi'

// UI
export { UserAvatar } from './ui/UserAvatar'
export { UserCard } from './ui/UserCard'

// Lib
export {
  getRoleLabel,
  getStatusLabel,
  getRoleColor,
  getStatusColor,
  getUserFullName,
  getUserInitials,
} from './lib/userUtils'
