import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { AuthLayout, AppLayout } from '@/app/layouts'
import { DashboardPage } from '@/pages/dashboard'
import { UsersPage } from '@/pages/users'
import { SettingsPage } from '@/pages/settings'
import LoginPage from '@/pages/login'
import { RegisterPage } from '@/pages/register'
import {
  Exception403,
  Exception404,
  Exception500,
  Placeholder,
  ResultError,
  ResultSuccess,
} from '@/shared/ui'
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
} from '@tabler/icons-react'
import type { Icon as TablerIcon } from '@tabler/icons-react'
import { ProfileBasicPage } from '@/pages/profile-basic'
import { FormGroupPage } from '@/pages/form-group'
import { FormStepPage } from '@/pages/form-step'

/**
 * Route meta information
 */
export interface RouteMeta {
  title?: string
  icon?: TablerIcon
  hideInMenu?: boolean
  initiallyOpened?: boolean
}

/**
 * Extended route object with meta and strongly typed children
 */
export interface AppRouteObject extends Omit<RouteObject, 'children'> {
  meta?: RouteMeta
  children?: AppRouteObject[]
}

/**
 * Public routes (do not require auth)
 */
const publicRoutes: AppRouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />, 
  },
  {
    path: '/register',
    element: <RegisterPage />, 
  },
]

/**
 * Protected routes (require auth, with menu meta)
 */
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
            path: 'basic',
            element: <Placeholder title="基础列表" />, 
            meta: { title: '基础列表' },
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
            element: <FormGroupPage />, 
            meta: { title: '分组表单' },
          },
          {
            path: 'step',
            element: <FormStepPage />, 
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
            element: <ProfileBasicPage />, 
            meta: { title: '基础详情' },
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
            element: <ResultSuccess />, 
            meta: { title: '成功页' },
          },
          {
            path: 'error',
            element: <ResultError />, 
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
            element: <Exception403 />, 
            meta: { title: '403' },
          },
          {
            path: '404',
            element: <Exception404 />, 
            meta: { title: '404' },
          },
          {
            path: '500',
            element: <Exception500 />, 
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
      },
      {
        path: '',
        meta: {
          title: '系统管理',
          icon: IconSettings,
          initiallyOpened: false,
        },
        children: [
          {
            path: 'users',
            element: <UsersPage />, 
            meta: { title: '用户管理' },
          },
          {
            path: 'settings',
            element: <SettingsPage />, 
            meta: { title: '系统设置' },
          },
        ],
      },
    ],
  },
]

/**
 * Root router configuration
 */
export const router = createBrowserRouter([
  {
    element: <AuthLayout />, 
    children: [...publicRoutes, ...protectedRoutes] as RouteObject[],
  },
])
