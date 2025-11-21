# ViewBar & Navbar 快速参考

## 文件位置

### ViewBar（多视图标签栏）

- 主文件：`src/widgets/multi-view/ui/ViewBar.tsx` (259 行)
- 样式：`src/widgets/multi-view/ui/ViewBar.module.css`
- 状态管理：`src/widgets/multi-view/model/MultiViewContext.tsx`
- Hook 获取状态：`useMultiView()` 从 `src/widgets/multi-view/model/useMultiView.ts`

### Navbar（侧边导航栏）

- 主文件：`src/widgets/app-navbar/ui/AppNavbar.tsx` (247 行)
- 样式：`src/widgets/app-navbar/ui/AppNavbar.module.css`
- 菜单项组件：`src/shared/ui/links-group/LinksGroup.tsx` (205 行)
- 菜单查询：`src/features/menu/api/useMenu.ts`

### 菜单数据管理

- 数据类型：`src/features/menu/model/types.ts`
- 数据转换：`src/features/menu/model/menuMapper.ts`
- 缓存管理：`src/features/menu/model/menuCache.ts`

### 整体集成

- 布局文件：`src/app/layouts/AppLayout.tsx` (102 行)
- 路由同步：`src/widgets/multi-view/model/useRouteSync.ts` (136 行)

---

## 核心数据结构

### Tab 数据（ViewPage）

```typescript
interface ViewPage {
  path: string // 路由："/dashboard"
  title: string // 标签标题："仪表盘"
  closable: boolean // 是否可关闭：true
}
```

### 菜单项数据（MenuViewItem）

```typescript
interface MenuViewItem {
  id: string
  label: string // "仪表盘"
  icon?: TablerIcon // 图标组件
  link?: string // "/dashboard"
  links?: { label: string; link: string }[] // 子菜单
  initiallyOpened?: boolean
}
```

### 后端菜单数据（RemoteMenuItem）

```typescript
interface RemoteMenuItem {
  id: string
  name: string // "仪表盘"
  path?: string // "/dashboard"
  icon?: string // "IconGauge" 字符串
  children?: RemoteMenuItem[]
  order?: number
  hidden?: boolean
}
```

---

## 关键 API

### ViewBar 使用 useMultiView()

```typescript
const {
  views, // ViewPage[]
  activeView, // string (当前路由)
  setActiveView, // (path: string) => void
  closeView, // (path: string) => void
  closeOtherViews, // (path: string) => void
  closeAllViews, // () => void
  addView, // (view: ViewPage) => void
} = useMultiView()
```

### AppNavbar 使用 useMenu()

```typescript
const {
  data: menuData, // MenuViewItem[] (已转换)
  isLoading,
  isError,
  isFetching,
  reload,
} = useMenu({ cacheScope: { userId: '123' } })
```

### LinksGroup 使用 useLocation()

```typescript
const location = useLocation()
const isActive = location.pathname === link
const hasActiveChild = links?.some(l => location.pathname === l.link)
```

### useRouteSync() 路由同步

```typescript
useRouteSync({ cacheScope: { userId: '123' } })
// 自动：
// 1. 监听路由变更
// 2. 查找菜单标题
// 3. addView() 创建 Tab
```

---

## 核心流程

### 1. 初始化

```
AppLayout
  ├─ MultiViewProvider
  │  ├─ 从 localStorage 加载 views
  │  └─ 监听 location.pathname → activeView
  ├─ RouteSyncWrapper (useRouteSync)
  │  └─ 监听路由变更 → addView 创建 Tab
  ├─ AppNavbar (useMenu)
  │  └─ 获取菜单 → LinksGroup 渲染
  ├─ ViewBar (useMultiView)
  │  └─ 显示所有 views
  └─ RefreshableOutlet <Outlet />
```

### 2. 用户点击菜单项

```
LinksGroup.onClick
  ↓ navigate(path)
  ↓ location.pathname 变更
  ↓ useRouteSync 监听
  ↓ findMenuTitle() 查找标题
  ↓ addView() 创建 Tab
  ↓ localStorage 持久化
  ↓ ViewBar 重新渲染
  ↓ activeView = location.pathname (自动)
```

### 3. 用户点击 Tab

```
ViewBar.tab.onClick
  ↓ setActiveView(path)
  ↓ navigate(path)
  ↓ location.pathname 变更
  ↓ RefreshableOutlet 渲染新页面
  ↓ activeView = location.pathname (自动)
  ↓ ViewBar 该 Tab 高亮
```

### 4. 用户关闭 Tab

```
ViewBar 关闭按钮或右键菜单
  ↓ closeView(path)
  ↓ setViews(views.filter(...))
  ↓ localStorage 更新
  ↓ 如果是当前 Tab → navigate(lastView.path)
  ↓ ViewBar 重新渲染
```

---

## 菜单激活检测

### 展开模式（完整菜单）

```typescript
const isActive = link && location.pathname === link
const hasActiveChild = links?.some(l => location.pathname === l.link)

// 样式：
// 激活菜单项 → .control.active → 蓝色背景 + 蓝色文字
// 有激活子菜单的父菜单 → .control.controlWithLinks.active → 仅蓝色文字（无背景）
```

### 收缩模式（仅图标）

```typescript
const isCollapsedActive = isActive || hasActiveChild
// 样式：
// .collapsedControl.active → 蓝色图标 + 背景
```

### 子菜单激活

```typescript
// 生成 NavLink
<NavLink
  to={subLink.link}
  className={({ isActive }) => isActive ? classes.linkActive : ''}
>
// 激活：.linkActive → 蓝色文字 + 背景
```

---

## ViewBar 滚动机制

### 检测是否需要显示滚动按钮

```typescript
const checkScrollState = () => {
  const { scrollLeft, scrollWidth, clientWidth } = container
  setCanScrollLeft(scrollLeft > 0) // 已滚动
  setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1) // 未滚到底
}
```

### 滚动距离

- 每次滚动 200px (SCROLL_DISTANCE)
- 平滑滚动 (behavior: 'smooth')

### 监听

- 容器 scroll 事件
- 窗口 resize 事件
- views 变更时重新检查

---

## 右键菜单

### 菜单项

1. 关闭 - 关闭单个 Tab
2. 关闭其他 - 仅保留当前 Tab
3. 全部关闭 - 关闭所有可关闭的 Tab

### 交互

- 右键点击 Tab → setContextMenu({ visible: true, x, y, viewPath })
- 点击菜单项外 → closeContextMenu()
- 点击菜单项 → 执行操作 + closeContextMenu()

---

## 状态持久化

### 存储位置

- localStorage 键：`fds-pro-multi-views`
- 存储内容：`ViewPage[]` JSON 序列化

### 时机

- 初始化：从 localStorage 加载
- 每次 views 变更时自动存储

### 恢复

- 刷新页面 → 从 localStorage 恢复
- 无效数据 → 自动过滤

---

## 菜单标题查找

### findMenuTitle() 的两轮查找

#### 第一轮：精确匹配

```typescript
for (const item of items) {
  if (item.link === path) return item.label // ← 直接菜单项
  if (item.links?.find(l => l.link === path)) return l.label // ← 子菜单项
}
```

#### 第二轮：父级匹配

```typescript
// 如果路径 /dashboard/users 找不到，
// 尝试找 /dashboard 这样的父级菜单
for (const item of items) {
  for (const child of item.links) {
    if (path.startsWith(childParentPath)) return item.label
  }
}
```

### Fallback：generateDefaultTitle()

```typescript
const pathMap = {
  dashboard: '仪表盘',
  users: '用户管理',
  ...
}
// 如果都找不到，返回 pathMap[lastSegment] 或原 path
```

---

## 常见问题

### Q: 为什么点击菜单项没有创建 Tab？

A: 检查 useRouteSync 是否在 MultiViewProvider 内部。useRouteSync 必须使用 useMultiView Hook，所以需要在 Provider 内。

### Q: Tab 的标题从哪里来？

A:

1. 首先查找菜单配置（useMenu）
2. 如果找到精确匹配的菜单项，使用其 label
3. 否则查找子菜单的 label
4. 最后 fallback 到生成默认标题

### Q: 如何让某个 Tab 不可关闭？

A: 在 addView 时设置 `closable: false`。目前只有首页和登录页不可关闭（代码中硬编码）。

### Q: 菜单激活状态如何工作？

A: 完全由 React Router 的 NavLink 组件驱动，自动比较 location.pathname 与 link，不需要手动管理。

### Q: 能否自定义 Tab 的显示顺序？

A: 目前按打开顺序显示，无法自定义。可以通过修改 MultiViewContext 的 addView 方法实现。

### Q: Tab 数据丢失了怎么办？

A: 检查 localStorage 的 `fds-pro-multi-views` 键。如果数据损坏，需要手动清除：

```javascript
localStorage.removeItem('fds-pro-multi-views')
location.reload()
```

---

## 设计约定

### 高度定义

- ViewBar 高度：`calc(var(--mantine-spacing-lg) * 1.75)` 约 35px
- 其中 lg = 20px，所以 20px \* 1.75 = 35px

### 颜色约定

- 激活文字：蓝色-7（浅色）或蓝色-4（深色）
- 激活背景：`--layout-surface-selected-bg`
- 阴影：`--mantine-shadow-sm` 到 `--mantine-shadow-md`

### 滚动按钮宽度

- `calc(var(--mantine-spacing-xl) * 1.5)` 约 48px

### Tab 间距

- 水平间距：`calc(var(--mantine-spacing-xs) * 0.4)` 约 4px

---

## 改进建议清单

- [ ] 支持自定义 Tab 顺序（拖拽排序）
- [ ] 支持 Tab 名称编辑
- [ ] 支持快捷键关闭（Ctrl+W）
- [ ] 支持双击 Tab 关闭
- [ ] 支持收起菜单项时关闭相关的 Tab
- [ ] 支持 Tab 预览（hover 显示页面缩略图）
- [ ] 支持 Tab 分组（按功能模块）
