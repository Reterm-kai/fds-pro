/**
 * 认证特性 Public API
 */

// UI
export { ProtectedRoute } from './ui/ProtectedRoute'

// Model
export { useAuth } from './model/useAuth'
export { AuthInitializer } from './model/AuthInitializer'
export {
  useAuthStore,
  selectUser,
  selectIsAuthenticated,
} from './model/authStore'

// API
export { useCurrentUserQuery, authQueryKeys } from './api/useCurrentUserQuery'
export type {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
} from './api/authApi'
