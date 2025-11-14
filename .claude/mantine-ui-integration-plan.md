# Mantine UI 集成到 AppShell 的完整方案

## 执行日期

2025-11-14

## 一、可用组件分析

### 1. Navbar 组件 (9个)

根据你的项目需求,推荐以下组件:

#### ✅ **NavbarNested** (强烈推荐 - 适合后台管理)

- **特点**: 支持嵌套菜单、可折叠分组、带用户信息底部栏
- **位置**: `/tmp/mantine-ui/lib/NavbarNested/`
- **适用场景**: 功能模块较多的后台管理系统
- **依赖组件**:
  - `LinksGroup` - 可折叠链接组
  - `UserButton` - 用户信息按钮
  - `ScrollArea` - 可滚动区域

**核心代码结构**:

```tsx
<nav className={classes.navbar}>
  <div className={classes.header}>
    <Logo />
    <Code>v3.1.2</Code>
  </div>

  <ScrollArea className={classes.links}>
    {/* 可滚动菜单区域 */}
    <LinksGroup {...item} />
  </ScrollArea>

  <div className={classes.footer}>
    <UserButton />
  </div>
</nav>
```

#### ✅ **NavbarSearch** (推荐)

- **特点**: 内置搜索框、用户信息、Collection 分组
- **位置**: `/tmp/mantine-ui/lib/NavbarSearch/`
- **适用场景**: 需要快速搜索功能的系统

#### ⚠️ **NavbarMinimal** (极简风格)

- **特点**: 仅图标导航、带 Tooltip
- **位置**: `/tmp/mantine-ui/lib/NavbarMinimal/`
- **适用场景**: 需要更多内容展示空间

#### 🔄 **NavbarSimple** (简单版本)

- **特点**: 基础导航链接、底部用户操作
- **位置**: `/tmp/mantine-ui/lib/NavbarSimple/`

### 2. Header 组件 (7个)

#### ✅ **HeaderSimple** (推荐 - 简洁清晰)

- **特点**: Logo + 导航链接 + Burger 菜单
- **位置**: `/tmp/mantine-ui/lib/HeaderSimple/`
- **响应式**: 移动端自动切换为 Burger

**核心代码**:

```tsx
<header className={classes.header}>
  <Container size="md">
    <MantineLogo size={28} />
    <Group gap={5} visibleFrom="xs">
      {navigationLinks}
    </Group>
    <Burger opened={opened} onClick={toggle} hiddenFrom="xs" />
  </Container>
</header>
```

#### ✅ **HeaderSearch** (带搜索功能)

- **位置**: `/tmp/mantine-ui/lib/HeaderSearch/`

#### ✅ **HeaderTabs** (Tab 导航)

- **位置**: `/tmp/mantine-ui/lib/HeaderTabs/`

### 3. Stats/Grid 组件

#### ✅ **StatsGrid** (统计卡片 - 强烈推荐)

- **特点**: 4列统计卡片、趋势箭头、对比百分比
- **位置**: `/tmp/mantine-ui/lib/StatsGrid/`
- **适用场景**: Dashboard 首页

**核心代码**:

```tsx
<SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
  <Paper withBorder p="md" radius="md">
    <Group justify="space-between">
      <Text size="xs" c="dimmed">
        {title}
      </Text>
      <Icon size={22} />
    </Group>
    <Group align="flex-end" gap="xs" mt={25}>
      <Text className={classes.value}>{value}</Text>
      <Text c={diff > 0 ? 'teal' : 'red'}>
        <span>{diff}%</span>
        <DiffIcon size={16} />
      </Text>
    </Group>
  </Paper>
</SimpleGrid>
```

## 二、与 AppShell 的集成方式

### ✅ **完美兼容** - 无需修改即可使用

Mantine UI 的组件设计理念就是配合 AppShell 使用:

```tsx
<AppShell
  header={{ height: 60 }}
  navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
>
  {/* 直接使用 Mantine UI 的 Header 组件 */}
  <AppShell.Header>
    <HeaderSimple />
  </AppShell.Header>

  {/* 直接使用 Mantine UI 的 Navbar 组件 */}
  <AppShell.Navbar>
    <NavbarNested />
  </AppShell.Navbar>

  {/* 主内容区域 */}
  <AppShell.Main>
    <StatsGrid />
    {/* 其他内容 */}
  </AppShell.Main>
</AppShell>
```

### ⚠️ 注意事项

1. **CSS Modules**: 所有组件都使用 CSS Modules,需要复制对应的 `.module.css` 文件
2. **依赖组件**: 某些组件依赖其他组件(如 `NavbarNested` 依赖 `LinksGroup`)
3. **图标库**: 需要安装 `@tabler/icons-react`

## 三、在你的 FSD 项目中的集成步骤

### 第 1 步: 安装依赖

```bash
pnpm add @tabler/icons-react
```

### 第 2 步: 目录结构建议

```
src/
├── widgets/
│   └── app-shell/
│       ├── ui/
│       │   ├── Header/
│       │   │   ├── Header.tsx          # 基于 HeaderSimple 改造
│       │   │   └── Header.module.css
│       │   ├── Navbar/
│       │   │   ├── Navbar.tsx          # 基于 NavbarNested 改造
│       │   │   ├── Navbar.module.css
│       │   │   ├── LinksGroup.tsx      # 依赖组件
│       │   │   └── UserButton.tsx      # 依赖组件
│       │   └── AppShell.tsx            # 组合 Header + Navbar
│       └── index.ts
│
├── shared/
│   └── ui/
│       └── stats-grid/                 # StatsGrid 组件
│           ├── StatsGrid.tsx
│           └── StatsGrid.module.css
│
└── pages/
    └── dashboard/
        └── index.tsx                   # 使用 StatsGrid
```

### 第 3 步: 改造示例

#### widgets/app-shell/ui/Navbar/Navbar.tsx

```tsx
import { Code, Group, ScrollArea } from '@mantine/core'
import {
  IconGauge,
  IconNotes,
  IconCalendarStats,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from '@tabler/icons-react'
import { LinksGroup } from './LinksGroup'
import { UserButton } from './UserButton'
import { Logo } from '@/shared/ui/logo'
import classes from './Navbar.module.css'

// 根据你的项目配置菜单数据
const menuData = [
  { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
  {
    label: '用户管理',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: '用户列表', link: '/users' },
      { label: '角色管理', link: '/roles' },
    ],
  },
  { label: '设置', icon: IconAdjustments, link: '/settings' },
]

export function Navbar() {
  const links = menuData.map(item => <LinksGroup {...item} key={item.label} />)

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Logo style={{ width: 120 }} />
          <Code fw={700}>v1.0.0</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  )
}
```

#### app/layouts/AppLayout.tsx

```tsx
import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Header } from '@/widgets/app-shell/ui/Header/Header'
import { Navbar } from '@/widgets/app-shell/ui/Navbar/Navbar'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
```

#### pages/dashboard/index.tsx

```tsx
import { StatsGrid } from '@/shared/ui/stats-grid'

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <StatsGrid />
      {/* 其他内容 */}
    </div>
  )
}
```

## 四、所需复制的文件清单

### 从 `/tmp/mantine-ui/lib/` 复制:

1. **NavbarNested/**
   - `NavbarNested.tsx`
   - `NavbarNested.module.css`
   - `Logo.tsx` (可选,可用你的 Logo)

2. **NavbarLinksGroup/**
   - `NavbarLinksGroup.tsx`
   - `NavbarLinksGroup.module.css`

3. **UserButton/**
   - `UserButton.tsx`
   - `UserButton.module.css`

4. **HeaderSimple/**
   - `HeaderSimple.tsx`
   - `HeaderSimple.module.css`

5. **StatsGrid/**
   - `StatsGrid.tsx`
   - `StatsGrid.module.css`

## 五、优势总结

### ✅ 优点

1. **开箱即用**: 无需从零开发布局组件
2. **响应式完善**: 移动端自动适配
3. **样式统一**: 遵循 Mantine 设计规范
4. **可维护性高**: 代码结构清晰,易于理解
5. **FSD 兼容**: 完全符合你的架构规范

### ⚠️ 需要注意

1. **CSS Modules**: 确保 rolldown-vite 支持 CSS Modules
2. **图标定制**: 根据业务需求替换图标
3. **数据对接**: 将 mock 数据替换为真实数据
4. **权限控制**: 在 LinksGroup 中添加权限判断

## 六、下一步行动

1. ✅ 安装 `@tabler/icons-react`
2. ✅ 从 `/tmp/mantine-ui/lib/` 复制所需组件
3. ✅ 按 FSD 规范整理到 `widgets/app-shell/`
4. ✅ 修改 `app/layouts/AppLayout.tsx` 集成组件
5. ✅ 在 Dashboard 页面测试 StatsGrid
6. ✅ 配置真实菜单数据和路由

## 七、验证清单

- [ ] AppShell 布局正常渲染
- [ ] 移动端 Navbar 折叠功能正常
- [ ] Header Burger 菜单可切换
- [ ] NavbarNested 菜单可折叠/展开
- [ ] StatsGrid 统计卡片正常显示
- [ ] CSS 样式加载正确
- [ ] 路由跳转功能正常

---

**结论**: Mantine UI 的预制组件可以**直接用于 AppShell**,无需额外适配。只需复制对应文件,按 FSD 规范整理即可快速构建后台管理布局。
