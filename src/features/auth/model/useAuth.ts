import { useAuthStore } from './authStore'

/**
 * 自定义 Hook 用于访问认证状态和操作
 * 使用 Zustand store，无需 Provider
 */
export const useAuth = () => {
  const user = useAuthStore(state => state.user)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const login = useAuthStore(state => state.login)
  const logout = useAuthStore(state => state.logout)
  const register = useAuthStore(state => state.register)

  return {
    user,
    isAuthenticated,
    login,
    logout,
    register,
  }
}
