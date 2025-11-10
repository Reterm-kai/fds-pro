import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../model/useAuth'
import * as React from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

/**
 * 受保护路由组件
 * 用于保护需要身份验证才能访问的页面
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // 重定向到登录页面，并保存原始路径作为状态
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
