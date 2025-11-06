import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/app/layouts/AppLayout'
import { DashboardPage } from '@/pages/dashboard'
import { UsersPage } from '@/pages/users'
import { SettingsPage } from '@/pages/settings'
import { Placeholder } from '@/shared/ui/placeholder'
import { menuItems } from '@/shared/navigation/menu'

/**
 * 路由配置
 * 使用 React Router v7 的 createBrowserRouter
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout menuItems={menuItems} />,
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
])
