import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { AuthLayout, AppLayout } from '@/app/layouts'
import { DashboardPage } from '@/pages/dashboard'
import { UsersPage } from '@/pages/users'
import { SettingsPage } from '@/pages/settings'
import LoginPage from '@/pages/login'
import { RegisterPage } from '@/pages/register'
import { Placeholder } from '@/shared/ui/placeholder'
import { ProtectedRoute } from '@/features/auth'
import {
  IconGauge,
  IconChartLine,
  IconTable,
  IconForms,
  IconFileText,
  IconChecklist,
  IconAlertCircle,
  IconUser,
  IconSettings,
  IconDatabase,
} from '@tabler/icons-react'
import type { Icon as TablerIcon } from '@tabler/icons-react'

/**
 * 路由元信息接口
 */
export interface RouteMeta {
  /** 菜单显示标题 */
  title?: string
  /** 菜单图标组件 */
  icon?: TablerIcon
  /** 是否在菜单中隐藏 */
  hideInMenu?: boolean
  /** 是否默认展开(有子菜单时) */
  initiallyOpened?: boolean
}

/**
 * 扩展的路由对象接口
 */
export interface AppRouteObject extends Omit<RouteObject, 'children'> {
  meta?: RouteMeta
  children?: AppRouteObject[]
}

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

// 需要认证的路由(带菜单元信息)
export const protectedRoutes: AppRouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
        meta: { hideInMenu: true },
      },
      {
        path: 'dashboard',
        meta: {
          title: '仪表盘',
          icon: IconGauge,
          initiallyOpened: true,
        },
        children: [
          {
            index: true,
            element: <DashboardPage />,
            meta: { title: '工作台' },
          },
          {
            path: 'monitor',
            element: <Placeholder title="实时监控" />,
            meta: { title: '实时监控' },
          },
        ],
      },
      {
        path: 'visualization',
        meta: {
          title: '数据可视化',
          icon: IconChartLine,
          initiallyOpened: true,
        },
        children: [
          {
            path: 'analysis',
            element: <Placeholder title="数据分析" />,
            meta: { title: '数据分析' },
          },
          {
            path: 'multi',
            element: <Placeholder title="多维分析" />,
            meta: { title: '多维分析' },
          },
        ],
      },
      {
        path: 'list',
        meta: {
          title: '列表页',
          icon: IconTable,
          initiallyOpened: true,
        },
        children: [
          {
            path: 'search-table',
            element: <Placeholder title="查询表格" />,
            meta: { title: '查询表格' },
          },
          {
            path: 'card',
            element: <Placeholder title="卡片列表" />,
            meta: { title: '卡片列表' },
          },
        ],
      },
      {
        path: 'form',
        meta: {
          title: '表单页',
          icon: IconForms,
          initiallyOpened: true,
        },
        children: [
          {
            path: 'group',
            element: <Placeholder title="分组表单" />,
            meta: { title: '分组表单' },
          },
          {
            path: 'step',
            element: <Placeholder title="分步表单" />,
            meta: { title: '分步表单' },
          },
        ],
      },
      {
        path: 'profile',
        meta: {
          title: '详情页',
          icon: IconFileText,
          initiallyOpened: true,
        },
        children: [
          {
            path: 'basic',
            element: <Placeholder title="基础详情页" />,
            meta: { title: '基础详情页' },
          },
        ],
      },
      {
        path: 'result',
        meta: {
          title: '结果页',
          icon: IconChecklist,
          initiallyOpened: true,
        },
        children: [
          {
            path: 'success',
            element: <Placeholder title="成功页" />,
            meta: { title: '成功页' },
          },
          {
            path: 'error',
            element: <Placeholder title="失败页" />,
            meta: { title: '失败页' },
          },
        ],
      },
      {
        path: 'exception',
        meta: {
          title: '异常页',
          icon: IconAlertCircle,
          initiallyOpened: true,
        },
        children: [
          {
            path: '403',
            element: <Placeholder title="403" />,
            meta: { title: '403' },
          },
          {
            path: '404',
            element: <Placeholder title="404" />,
            meta: { title: '404' },
          },
          {
            path: '500',
            element: <Placeholder title="500" />,
            meta: { title: '500' },
          },
        ],
      },
      {
        path: 'user',
        meta: {
          title: '个人中心',
          icon: IconUser,
          initiallyOpened: true,
        },
        children: [
          {
            path: 'info',
            element: <Placeholder title="个人信息" />,
            meta: { title: '个人信息' },
          },
          {
            path: 'settings',
            element: <Placeholder title="个人设置" />,
            meta: { title: '个人设置' },
          },
        ],
      },
      {
        path: 'users',
        element: <UsersPage />,
        meta: {
          title: '用户管理',
          icon: IconDatabase,
          hideInMenu: false,
        },
      },
      {
        path: 'settings',
        element: <SettingsPage />,
        meta: {
          title: '系统设置',
          icon: IconSettings,
          hideInMenu: false,
        },
      },
    ],
  },
]

// 合并所有路由，使用 AuthLayout 包装以提供认证上下文
export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [...publicRoutes, ...protectedRoutes] as RouteObject[],
  },
])
