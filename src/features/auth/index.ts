/**
 * 认证特性 Public API
 *
 * FSD 规范: 通过 index 文件统一导出公共接口
 */

// Model
export { AuthProvider } from './model/AuthProvider'
export { useAuth } from './model/useAuth'
export type { AuthContextType } from './model/AuthContext'

// UI
export { ProtectedRoute } from './ui/ProtectedRoute'

// API
export type {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
} from './api/authApi'
