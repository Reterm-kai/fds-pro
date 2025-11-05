import {
  IconDashboard,
  IconUsers,
  IconSettings,
  IconTable,
  IconChartBar,
} from '@tabler/icons-react'
import type { MenuItem } from '../types/menu'

/**
 * 菜单配置
 * 定义侧边栏菜单项及其图标
 */
export const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: <IconDashboard size={20} />,
    path: '/dashboard',
  },
  {
    key: 'users',
    label: '用户管理',
    icon: <IconUsers size={20} />,
    path: '/users',
  },
  {
    key: 'data',
    label: '数据管理',
    icon: <IconTable size={20} />,
    children: [
      {
        key: 'data-list',
        label: '数据列表',
        path: '/data/list',
      },
      {
        key: 'data-import',
        label: '数据导入',
        path: '/data/import',
      },
    ],
  },
  {
    key: 'analytics',
    label: '数据分析',
    icon: <IconChartBar size={20} />,
    children: [
      {
        key: 'analytics-overview',
        label: '概览',
        path: '/analytics/overview',
      },
      {
        key: 'analytics-reports',
        label: '报表',
        path: '/analytics/reports',
      },
    ],
  },
  {
    key: 'settings',
    label: '系统设置',
    icon: <IconSettings size={20} />,
    path: '/settings',
  },
]
