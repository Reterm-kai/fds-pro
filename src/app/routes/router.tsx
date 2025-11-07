import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { AppLayout } from '@/app/layouts/AppLayout'
import { DashboardPage } from '@/pages/dashboard'
import { UsersPage } from '@/pages/users'
import { SettingsPage } from '@/pages/settings'
import LoginPage from '@/pages/login'
import { RegisterPage } from '@/pages/register'
import { Placeholder } from '@/shared/ui/placeholder'
import { menuItems } from '@/shared/navigation/menu'
import { ProtectedRoute } from '@/shared/components/ProtectedRoute'

/**
 * 路由配置
 * 使用 React Router v7 的 createBrowserRouter
 */

// 公共路由（不需要认证）
const publicRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]

// 需要认证的路由
const protectedRoutes = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout menuItems={menuItems} />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'data',
        children: [
          {
            path: 'list',
            element: <Placeholder title="数据列表" />,
          },
          {
            path: 'import',
            element: <Placeholder title="数据导入" />,
          },
        ],
      },
      {
        path: 'analytics',
        children: [
          {
            path: 'overview',
            element: <Placeholder title="数据概览" />,
          },
          {
            path: 'reports',
            element: <Placeholder title="数据报表" />,
          },
        ],
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
]

// 合并所有路由，使用 AuthLayout 包装以提供认证上下文
export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [...publicRoutes, ...protectedRoutes],
  },
])
