import { Outlet } from 'react-router-dom'
import { AuthInitializer } from '@/features/auth'

/**
 * AuthLayout 包装组件
 * 初始化认证状态（使用 Zustand，无需 Provider）
 */
export function AuthLayout() {
  return (
    <AuthInitializer>
      <Outlet />
    </AuthInitializer>
  )
}
