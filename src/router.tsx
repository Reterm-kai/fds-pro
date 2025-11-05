import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { Users } from './pages/Users'
import { Settings } from './pages/Settings'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { menuItems } from './config/menu'

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
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'data',
        children: [
          {
            path: 'list',
            element: <PlaceholderPage title="数据列表" />,
          },
          {
            path: 'import',
            element: <PlaceholderPage title="数据导入" />,
          },
        ],
      },
      {
        path: 'analytics',
        children: [
          {
            path: 'overview',
            element: <PlaceholderPage title="数据概览" />,
          },
          {
            path: 'reports',
            element: <PlaceholderPage title="数据报表" />,
          },
        ],
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
])
