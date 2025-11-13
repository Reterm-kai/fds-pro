/**
 * 认证特性 Public API
 *
 * FSD 规范: 通过 index 文件统一导出公共接口
 */

// Model (Zustand Store)
export {
  useAuthStore,
  selectUser,
  selectIsAuthenticated,
} from './model/authStore'
export { useAuth } from './model/useAuth'
export { AuthInitializer } from './model/AuthInitializer'

// UI
export { ProtectedRoute } from './ui/ProtectedRoute'

// API
export type {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
} from './api/authApi'
