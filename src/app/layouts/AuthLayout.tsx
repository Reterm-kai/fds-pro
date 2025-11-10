import { Outlet } from 'react-router-dom'
import { AuthProvider } from '@/features/auth'

/**
 * AuthLayout 包装组件
 * 为所有路由提供认证上下文
 */
export function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
