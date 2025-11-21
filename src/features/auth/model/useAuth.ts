import { useShallow } from 'zustand/shallow'
import { useAuthStore } from './authStore'

/**
 * 访问认证状态和操作的 Hook
 *
 * 使用 useShallow 避免不必要的重渲染
 */
export function useAuth() {
  return useAuthStore(
    useShallow(state => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      login: state.login,
      logout: state.logout,
      register: state.register,
    }))
  )
}
