export const menuData = [
  {
    id: 'dashboard',
    name: '仪表盘',
    icon: 'IconGauge',
    initiallyOpened: true,
    children: [
      {
        id: 'dashboard-workplace',
        name: '工作台',
        path: '/dashboard',
        order: 1,
      },
      {
        id: 'dashboard-monitor',
        name: '实时监控',
        path: '/dashboard/monitor',
        order: 2,
      },
    ],
    order: 1,
  },
  {
    id: 'visualization',
    name: '数据可视化',
    icon: 'IconChartLine',
    initiallyOpened: true,
    children: [
      {
        id: 'visualization-analysis',
        name: '数据分析',
        path: '/visualization/analysis',
        order: 1,
      },
      {
        id: 'visualization-multi',
        name: '多维分析',
        path: '/visualization/multi',
        order: 2,
      },
    ],
    order: 2,
  },
  {
    id: 'list',
    name: '列表页',
    icon: 'IconTable',
    initiallyOpened: true,
    children: [
      { id: 'list-basic', name: '基础列表', path: '/list/basic', order: 1 },
      { id: 'list-card', name: '卡片列表', path: '/list/card', order: 2 },
    ],
    order: 3,
  },
  {
    id: 'form',
    name: '表单页',
    icon: 'IconForms',
    initiallyOpened: true,
    children: [
      { id: 'form-group', name: '分组表单', path: '/form/group', order: 1 },
      { id: 'form-step', name: '分步表单', path: '/form/step', order: 2 },
    ],
    order: 4,
  },
  {
    id: 'profile',
    name: '详情页',
    icon: 'IconFileText',
    initiallyOpened: true,
    children: [
      {
        id: 'profile-basic',
        name: '基础详情',
        path: '/profile/basic',
        order: 1,
      },
    ],
    order: 5,
  },
  {
    id: 'result',
    name: '结果页',
    icon: 'IconChecklist',
    initiallyOpened: true,
    children: [
      {
        id: 'result-success',
        name: '成功页',
        path: '/result/success',
        order: 1,
      },
      { id: 'result-error', name: '失败页', path: '/result/error', order: 2 },
    ],
    order: 6,
  },
  {
    id: 'exception',
    name: '异常页',
    icon: 'IconAlertCircle',
    initiallyOpened: true,
    children: [
      { id: 'exception-403', name: '403', path: '/exception/403', order: 1 },
      { id: 'exception-404', name: '404', path: '/exception/404', order: 2 },
      { id: 'exception-500', name: '500', path: '/exception/500', order: 3 },
    ],
    order: 7,
  },
  {
    id: 'user',
    name: '个人中心',
    icon: 'IconUser',
    initiallyOpened: true,
    children: [
      { id: 'user-profile', name: '个人资料', path: '/user/profile', order: 1 },
      {
        id: 'user-security',
        name: '安全设置',
        path: '/user/security',
        order: 2,
      },
    ],
    order: 8,
  },
  {
    id: 'system',
    name: '系统管理',
    icon: 'IconSettings',
    initiallyOpened: true,
    children: [
      { id: 'system-users', name: '用户管理', path: '/users', order: 1 },
      { id: 'system-settings', name: '系统设置', path: '/settings', order: 2 },
    ],
    order: 9,
  },
]
