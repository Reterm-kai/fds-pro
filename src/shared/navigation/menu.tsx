import {
  LayoutDashboard,
  Settings,
  Table,
  FileText,
  FileEdit,
  ListChecks,
  AlertCircle,
  User,
  TrendingUp,
} from 'lucide-react'
import type { MenuItem } from './types'

/**
 * 菜单配置
 * 参考 Arco Design Pro 设计的完整中后台菜单结构
 */
export const menuItems: MenuItem[] = [
  // Dashboard 仪表盘
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: <LayoutDashboard size={20} />,
    children: [
      {
        key: 'dashboard-workplace',
        label: '工作台',
        path: '/dashboard',
      },
      {
        key: 'dashboard-monitor',
        label: '实时监控',
        path: '/dashboard/monitor',
      },
    ],
  },

  // Data Visualization 数据可视化
  {
    key: 'visualization',
    label: '数据可视化',
    icon: <TrendingUp size={20} />,
    children: [
      {
        key: 'visualization-analysis',
        label: '数据分析',
        path: '/visualization/analysis',
      },
      {
        key: 'visualization-multi',
        label: '多维分析',
        path: '/visualization/multi',
      },
    ],
  },

  // List 列表页
  {
    key: 'list',
    label: '列表页',
    icon: <Table size={20} />,
    children: [
      {
        key: 'list-basic',
        label: '基础列表',
        path: '/list/basic',
      },
      {
        key: 'list-card',
        label: '卡片列表',
        path: '/list/card',
      },
    ],
  },

  // Form 表单页
  {
    key: 'form',
    label: '表单页',
    icon: <FileEdit size={20} />,
    children: [
      {
        key: 'form-group',
        label: '分组表单',
        path: '/form/group',
      },
      {
        key: 'form-step',
        label: '分步表单',
        path: '/form/step',
      },
    ],
  },

  // Profile 详情页
  {
    key: 'profile',
    label: '详情页',
    icon: <FileText size={20} />,
    children: [
      {
        key: 'profile-basic',
        label: '基础详情页',
        path: '/profile/basic',
      },
    ],
  },

  // Result 结果页
  {
    key: 'result',
    label: '结果页',
    icon: <ListChecks size={20} />,
    children: [
      {
        key: 'result-success',
        label: '成功页',
        path: '/result/success',
      },
      {
        key: 'result-error',
        label: '失败页',
        path: '/result/error',
      },
    ],
  },

  // Exception 异常页
  {
    key: 'exception',
    label: '异常页',
    icon: <AlertCircle size={20} />,
    children: [
      {
        key: 'exception-403',
        label: '403',
        path: '/exception/403',
      },
      {
        key: 'exception-404',
        label: '404',
        path: '/exception/404',
      },
      {
        key: 'exception-500',
        label: '500',
        path: '/exception/500',
      },
    ],
  },

  // User 个人中心
  {
    key: 'user',
    label: '个人中心',
    icon: <User size={20} />,
    children: [
      {
        key: 'user-info',
        label: '个人信息',
        path: '/user/info',
      },
      {
        key: 'user-settings',
        label: '个人设置',
        path: '/user/settings',
      },
    ],
  },

  // System 系统管理
  {
    key: 'system',
    label: '系统管理',
    icon: <Settings size={20} />,
    children: [
      {
        key: 'system-users',
        label: '用户管理',
        path: '/users',
      },
      {
        key: 'system-settings',
        label: '系统设置',
        path: '/settings',
      },
    ],
  },
]
