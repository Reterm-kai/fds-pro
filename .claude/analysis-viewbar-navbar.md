# ViewBar 与 Navbar 实现分析

## 目录结构

```
src/
├── widgets/
│   ├── multi-view/                    # 多视图标签栏实现
│   │   ├── ui/
│   │   │   ├── ViewBar.tsx            # 主标签栏组件
│   │   │   ├── ViewBar.module.css     # 标签栏样式
│   │   │   └── RefreshableOutlet.tsx  # 路由出口包装
│   │   └── model/
│   │       ├── MultiViewContext.tsx   # 上下文 Provider（状态管理）
│   │       ├── useMultiView.ts        # Hook 导出
│   │       ├── useRouteSync.ts        # 路由同步 Hook
│   │       ├── context.ts             # 上下文定义
│   │       └── types.ts               # 类型定义
│   │
│   └── app-navbar/                    # 侧边导航栏实现
│       └── ui/
│           ├── AppNavbar.tsx          # 主导航栏组件
│           └── AppNavbar.module.css   # 导航栏样式
│
├── features/
│   └── menu/                          # 菜单数据管理
│       ├── api/
│       │   └── useMenu.ts             # 菜单查询 Hook
│       ├── model/
│       │   ├── types.ts               # 菜单数据类型
│       │   ├── menuMapper.ts          # 数据转换
│       │   └── menuCache.ts           # 缓存管理
│       └── index.ts
│
├── shared/
│   └── ui/
│       └── links-group/
│           ├── LinksGroup.tsx         # 菜单项组件
│           └── LinksGroup.module.css  # 菜单项样式
│
└── app/
    └── layouts/
        └── AppLayout.tsx              # 整体布局集成
```

---

## 1. ViewBar 组件实现

### 核心功能

- 显示所有打开的视图标签
- 支持标签切换、关闭
- 水平滚动（超出容器时）
- 右键菜单（关闭、关闭其他、全部关闭）

### 关键属性

| 属性     | 类型   | 默认值                                   | 说明                  |
| -------- | ------ | ---------------------------------------- | --------------------- |
| `height` | string | `calc(var(--mantine-spacing-lg) * 1.75)` | 标签栏高度（约 35px） |

### 内部状态

```typescript
interface ContextMenuState {
  visible: boolean // 右键菜单可见性
  x: number // 菜单 X 坐标
  y: number // 菜单 Y 坐标
  viewPath: string // 右键点击的视图路径
}

// 滚动状态
const [canScrollLeft, setCanScrollLeft] // 是否能向左滚动
const [canScrollRight, setCanScrollRight] // 是否能向右滚动
```

### 关键方法

```typescript
// 从 useMultiView 获取
- views: ViewPage[]                    // 所有打开的视图
- activeView: string                   // 当前激活的视图路径
- setActiveView(path: string)          // 切换激活视图（触发导航）
- closeView(path: string)              // 关闭指定视图
- closeOtherViews(path: string)        // 关闭其他视图
- closeAllViews()                      // 关闭所有可关闭视图

// 滚动控制
- scrollLeft()                         // 向左滚动 200px
- scrollRight()                        // 向右滚动 200px
```

### 核心交互逻辑

#### 1. 标签激活（切换视图）

```typescript
// ViewBar.tsx, line 179
<div
  key={view.path}
  className={`${classes.tab} ${view.path === activeView ? classes.tabActive : ''}`}
  onClick={() => setActiveView(view.path)}  // 触发导航
>
```

#### 2. 标签关闭

```typescript
// ViewBar.tsx, line 183-189
{view.closable && (
  <span
    className={classes.closeButton}
    onClick={e => handleCloseClick(e, path)}  // 阻止冒泡，关闭此视图
  >
    <X size={14} />
  </span>
)}
```

#### 3. 滚动条显示条件

```typescript
// ViewBar.tsx, line 59-66
const checkScrollState = useCallback(() => {
  const container = tabListRef.current
  if (!container) return

  const { scrollLeft, scrollWidth, clientWidth } = container
  setCanScrollLeft(scrollLeft > 0) // 已滚动，显示左按钮
  setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1) // 未滚到底，显示右按钮
}, [])
```

### 样式关键点

| 类               | 作用                                                    |
| ---------------- | ------------------------------------------------------- |
| `.tabBarWrapper` | 容器，flex 布局，z-index: app                           |
| `.tab`           | 标签项，flex，相对定位（z-index: 1），有底部边线        |
| `.tabActive`     | 激活状态（背景白/深色7，文字蓝色，z-index: 1 覆盖底线） |
| `.tabBar`        | 标签列表，overflow-x: auto，隐藏滚动条                  |
| `.tabBar::after` | 底部连续边线（伪元素，z-index: 0）                      |

---

## 2. Navbar（AppNavbar）组件实现

### 核心功能

- 显示侧边导航菜单
- 支持展开/收缩状态
- 展开：完整菜单文本，图标 + 标签
- 收缩：仅图标，hover 显示 Popover

### 关键属性

| 属性               | 类型           | 默认值  | 说明                                   |
| ------------------ | -------------- | ------- | -------------------------------------- |
| `collapsed`        | boolean        | `false` | 是否收缩状态                           |
| `onToggleCollapse` | function       | -       | 收缩/展开回调                          |
| `onLinkClick`      | function       | -       | 点击菜单项回调（用于移动端关闭侧边栏） |
| `menuCacheScope`   | MenuCacheScope | -       | 菜单缓存作用域（userId, tenantId 等）  |

### 内部结构

```
<nav className="navbar collapsed?">
  <ScrollArea className="links">
    {/* 展开模式：完整菜单 */}
    <div className="linksInner">
      <LinksGroup ... />  // 菜单项组件
    </div>
  </ScrollArea>

  <div className="collapsedContent">
    {/* 收缩模式：图标列表 */}
    <div className="collapsedIconsInner">
      <LinksGroup collapsed={true} ... />
    </div>
  </div>

  <div className="footer">
    {/* 收缩/展开按钮 + 联系方式 */}
    <ActionIcon onClick={onToggleCollapse}>展开/收缩</ActionIcon>
    <ContactButton /> or <IconMail />
  </div>
</nav>
```

### 菜单渲染流程

```typescript
// AppNavbar.tsx, line 45-53
const {
  data: menuData,
  isLoading,
  isError,
} = useMenu({ cacheScope: menuCacheScope })
const items = menuData ?? []

// 核心：menuData 来自 useMenu，包含菜单项数组
// 每个菜单项结构：MenuViewItem
```

---

## 3. 标签与菜单项关联机制

### 3.1 数据类型定义

#### ViewPage（Tab 数据）

```typescript
// src/widgets/multi-view/model/types.ts
interface ViewPage {
  path: string // 路由路径，唯一标识
  title: string // 显示标题（来自菜单或生成）
  closable: boolean // 是否可关闭
}
```

#### MenuViewItem（菜单项数据）

```typescript
// src/features/menu/model/types.ts
interface MenuViewItem {
  id: string // 唯一标识
  label: string // 菜单显示名称
  icon?: TablerIcon // 图标组件
  link?: string // 单个菜单项路由
  links?: { label: string; link: string }[] // 子菜单
  initiallyOpened?: boolean // 是否初始展开
}
```

#### 后端菜单数据

```typescript
// src/features/menu/model/types.ts
interface RemoteMenuItem {
  id: string
  name: string // "仪表盘"
  path?: string // "/dashboard"
  icon?: string // "IconGauge"
  children?: RemoteMenuItem[] // 子菜单
  initiallyOpened?: boolean
  order?: number
  hidden?: boolean
}
```

### 3.2 关键关联过程

#### 步骤 1: 菜单数据获取与转换

```typescript
// src/features/menu/api/useMenu.ts
export function useMenu(options?: UseMenuOptions) {
  const query = useQuery({
    queryFn: async () => {
      const response = await get<RemoteMenuItem[]>('/menus')
      saveMenuCache(response, cacheScope)
      return response
    },
    select: transformMenuResponse, // ← 转换为 MenuViewItem[]
  })
  return { ...query, reload }
}
```

#### 步骤 2: 数据转换（后端格式 → UI 格式）

```typescript
// src/features/menu/model/menuMapper.ts
export function transformMenuResponse(data: RemoteMenuItem[]): MenuViewItem[] {
  return sortByOrder(data).map(transformItem).filter(Boolean) as MenuViewItem[]
}

function transformItem(item: RemoteMenuItem): MenuViewItem | null {
  // 隐藏的菜单项不转换
  if (item.hidden) return null

  const links = mapLinks(item.children)

  // 有子菜单：仅保留 links，不保留 link
  if (links.length > 0) {
    return {
      id: item.id,
      label: item.name,
      icon: resolveIcon(item.icon),
      links, // 子菜单
      initiallyOpened: item.initiallyOpened,
    }
  }

  // 无子菜单：保留 link
  const link = normalizePath(item.path)
  if (!link) return null

  return {
    id: item.id,
    label: item.name,
    icon: resolveIcon(item.icon),
    link, // 路由
    initiallyOpened: item.initiallyOpened,
  }
}
```

#### 步骤 3: 菜单项激活检测

```typescript
// src/shared/ui/links-group/LinksGroup.tsx, line 35-47
export function LinksGroup({ link, links, ...props }: LinksGroupProps) {
  const location = useLocation()

  // 检查子菜单中是否有激活项
  const hasActiveChild = links?.some(
    subLink => location.pathname === subLink.link
  )

  // 精确匹配当前项
  const isActive = link && location.pathname === link

  // 在收缩模式下，本身激活或子菜单有激活项都显示激活状态
  const isCollapsedActive = isActive || hasActiveChild
}
```

#### 步骤 4: Tab 创建（路由同步）

```typescript
// src/widgets/multi-view/model/useRouteSync.ts, line 86-135
export function useRouteSync(options?: UseRouteSyncOptions) {
  const location = useLocation()
  const { addView } = useMultiView()
  const { data: menuData } = useMenu({ cacheScope })

  useEffect(() => {
    const currentPath = location.pathname

    // 忽略特定路由（登录、首页等）
    if (currentPath === '/login' || currentPath === '/' || ...) return

    // ← 关键：根据菜单查找标题
    const title = findMenuTitle(menuData ?? [], currentPath)
      || generateDefaultTitle(currentPath)

    // 检查 Tab 是否已存在
    const existingView = viewsRef.current.find(v => v.path === currentPath)

    if (!existingView) {
      // 创建新 Tab
      addView({
        path: currentPath,
        title,  // ← 来自菜单或默认生成
        closable: true,
      })
    }
  }, [location.pathname, menuData, ...])
}

// 菜单标题查找逻辑
function findMenuTitle(items: MenuViewItem[], path: string): string | null {
  // 第一遍：精确匹配
  for (const item of items) {
    if (normalizeLink(item.link) === path) return item.label
    if (item.links) {
      for (const child of item.links) {
        if (normalizeLink(child.link) === path) return child.label
      }
    }
  }

  // 第二遍：父级匹配
  for (const item of items) {
    if (!item.links || item.links.length === 0) continue
    for (const child of item.links) {
      const normalized = normalizeLink(child.link)
      if (!normalized) continue
      const childSegments = normalized.split('/').filter(Boolean)
      const parentPath = `/${childSegments[0]}`
      if (path === parentPath) return item.label
    }
  }
  return null
}

// 默认标题生成
function generateDefaultTitle(path: string): string {
  const pathMap: Record<string, string> = {
    dashboard: '仪表盘',
    users: '用户管理',
    ...
  }
  return pathMap[lastSegment] || lastSegment
}
```

### 3.3 关联总结图

```
后端菜单 API (/menus)
    ↓
  GET 请求
    ↓
RemoteMenuItem[] (原始格式)
    ↓
[transformMenuResponse] ← 转换、排序、图标映射
    ↓
MenuViewItem[] ← 存储在 useMenu 查询中
    ↓
AppNavbar 渲染
    ├→ LinksGroup (links 模式：展开/子菜单)
    └→ LinksGroup (collapsed 模式：图标 + popover)

    每个 LinksGroup 使用:
    ├→ link/links 定义路由
    └→ useLocation().pathname 检测激活状态
          ↓
   用户点击菜单项 → 路由变更
          ↓
   useRouteSync 监听路由变更
          ↓
   查找菜单标题 (findMenuTitle)
          ↓
   addView() 创建 Tab
          ↓
   ViewBar 显示新标签
```

---

## 4. 状态管理（MultiViewContext）

### 4.1 上下文结构

```typescript
// src/widgets/multi-view/model/context.ts
export const MultiViewContext = createContext<MultiViewContextValue | null>(
  null
)

// 值类型
interface MultiViewContextValue {
  views: ViewPage[] // 所有打开的视图
  activeView: string // 当前激活视图路径
  addView: (view: ViewPage) => void
  closeView: (path: string) => void
  closeOtherViews: (path: string) => void
  closeAllViews: () => void
  setActiveView: (path: string) => void
}
```

### 4.2 Provider 实现

```typescript
// src/widgets/multi-view/model/MultiViewContext.tsx

// 初始化：从 localStorage 加载持久化的 Views
const [views, setViews] = useState<ViewPage[]>(() => loadViewsFromStorage())

// 路由路径作为当前激活的视图
const activeView = location.pathname

// 每次 views 变更时持久化到 localStorage
useEffect(() => {
  saveViewsToStorage(views)
}, [views])

// 方法实现

// 1. addView: 添加新视图（避免重复）
const addView = useCallback((view: ViewPage) => {
  setViews(prev => {
    const exists = prev.find(v => v.path === view.path)
    if (exists) return prev
    return [...prev, view]
  })
}, [])

// 2. closeView: 关闭视图，智能导航到前一个视图
const closeView = useCallback(
  (path: string) => {
    const closingView = views.find(v => v.path === path)
    if (!closingView?.closable) return

    const newViews = views.filter(v => v.path !== path)
    setViews(newViews)

    if (newViews.length === 0) {
      navigate('/')
      return
    }

    // 如果关闭的是当前激活的视图，导航到最后一个视图
    const removedWasActive = activeView === path
    const stillContainsActive = newViews.some(v => v.path === activeView)

    if (removedWasActive || !stillContainsActive) {
      const nextView = newViews[newViews.length - 1]
      navigate(nextView.path)
    }
  },
  [views, activeView, navigate]
)

// 3. closeOtherViews: 关闭其他可关闭的视图
const closeOtherViews = useCallback(
  (path: string) => {
    const newViews = views.filter(v => v.path === path || !v.closable)
    setViews(newViews)
    if (!newViews.find(v => v.path === activeView)) {
      navigate(path)
    }
  },
  [views, activeView, navigate]
)

// 4. closeAllViews: 关闭所有可关闭的视图
const closeAllViews = useCallback(() => {
  const newViews = views.filter(v => !v.closable)
  setViews(newViews)
  if (newViews.length === 0) {
    navigate('/')
    return
  }
  if (!newViews.find(v => v.path === activeView)) {
    navigate(newViews[0].path)
  }
}, [views, activeView, navigate])

// 5. setActiveView: 切换激活视图
const setActiveView = useCallback(
  (path: string) => {
    navigate(path) // 触发导航
  },
  [navigate]
)
```

### 4.3 持久化机制

```typescript
const STORAGE_KEY = 'fds-pro-multi-views'

function loadViewsFromStorage(): ViewPage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // 类型检查和过滤
      return parsed.filter(
        item => item && typeof item === 'object' && 'path' in item
      )
    }
  } catch {
    // 解析失败，忽略
  }
  return []
}

function saveViewsToStorage(views: ViewPage[]) {
  try {
    const toSave = views.map(({ path, title, closable }) => ({
      path,
      title,
      closable,
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  } catch {
    // 存储失败，忽略
  }
}
```

---

## 5. 整体集成（AppLayout）

### 5.1 布局结构

```typescript
// src/app/layouts/AppLayout.tsx

function AppLayout() {
  return (
    <MultiViewProvider>  {/* 状态管理 Provider */}
      <RouteSyncWrapper>  {/* 路由同步包装 */}
        <AppShell>
          <Header>
            <AppHeader />         {/* 顶部导航 */}
          </Header>

          <Navbar>
            <AppNavbar />         {/* 侧边菜单 */}
          </Navbar>

          <Section>
            <ViewBar />           {/* Tab 标签栏 */}
          </Section>

          <Main>
            <RefreshableOutlet /> {/* 路由出口 */}
          </Main>
        </AppShell>
      </RouteSyncWrapper>
    </MultiViewProvider>
  )
}
```

### 5.2 初始化流程

```
1. MultiViewProvider 初始化
   ├→ 从 localStorage 加载 views
   ├→ 监听路由变更，同步 activeView = location.pathname
   └→ 提供所有操作方法

2. RouteSyncWrapper 初始化
   └→ 调用 useRouteSync，监听路由变更
      ├→ 获取菜单数据
      └→ 创建/更新 Tab

3. AppNavbar 初始化
   └→ 调用 useMenu，获取菜单数据
      ├→ 获取后端菜单
      ├→ transformMenuResponse 转换
      └→ 缓存菜单数据

4. ViewBar 初始化
   └→ 从 useMultiView 获取 views 和 activeView
      └→ 渲染所有 Tab 和滚动控制

5. 用户交互流程
   用户点击菜单项
   ├→ LinksGroup 点击
   ├→ 触发 navigate(path)
   └→ 路由变更
      ├→ useRouteSync 监听到
      ├→ addView 创建 Tab
      ├→ activeView = location.pathname
      └→ ViewBar 重新渲染
```

---

## 6. 菜单激活逻辑详解

### 6.1 展开模式激活

```typescript
// src/shared/ui/links-group/LinksGroup.tsx, line 35-47

const isActive = link && location.pathname === link

// 返回 NavLink 或 button
return (
  !hasLinks && link ? (
    <NavLink
      end  // 精确匹配
      to={link}
      className={({ isActive }) =>
        `${classes.control} ${isActive ? classes.active : ''}`
      }
    >
      {/* 激活时添加 .active 类 */}
    </NavLink>
  ) : (
    <UnstyledButton
      className={`
        ${classes.control}
        ${isActive || hasActiveChild ? classes.active : ''}
      `}
    >
      {/* 按钮模式：点击展开/收缩子菜单 */}
    </UnstyledButton>
  )
)

// NavLink 激活样式（React Router 内置）
.control.active {
  color: light-dark(var(--mantine-color-blue-7), var(--mantine-color-blue-4));
  background-color: var(--layout-surface-selected-bg);
  box-shadow: var(--mantine-shadow-sm);
}
```

### 6.2 收缩模式激活

```typescript
// src/shared/ui/links-group/LinksGroup.tsx, line 80-109

if (collapsed && Icon) {
  const isCollapsedActive = isActive || hasActiveChild

  const iconButton = (
    !hasLinks && link ? (
      <NavLink
        end
        to={link}
        className={({ isActive }) =>
          `${classes.collapsedControl} ${isActive ? classes.active : ''}`
        }
      >
        {/* NavLink 激活 */}
      </NavLink>
    ) : (
      <UnstyledButton
        className={`
          ${classes.collapsedControl}
          ${isCollapsedActive ? classes.active : ''}
        `}
        data-active={isCollapsedActive || undefined}
      >
        {/* 按钮模式 */}
      </UnstyledButton>
    )
  )

  // 有子菜单显示 HoverCard Popover
  if (hasLinks) {
    return (
      <HoverCard position="right-start" ...>
        <HoverCard.Target>{iconButton}</HoverCard.Target>
        <HoverCard.Dropdown>
          {/* 子菜单项 */}
          {popoverItems}
        </HoverCard.Dropdown>
      </HoverCard>
    )
  }
}

// 激活样式
.collapsedControl.active,
.collapsedControl[data-active] {
  background-color: var(--layout-surface-selected-bg);
  color: light-dark(var(--mantine-color-blue-7), var(--mantine-color-blue-4));
  box-shadow: var(--mantine-shadow-sm);
}
```

### 6.3 子菜单激活

```typescript
// src/shared/ui/links-group/LinksGroup.tsx, line 50-61

// 生成普通模式的子菜单项
const items = (hasLinks ? links : []).map(subLink => (
  <NavLink
    end
    to={subLink.link}
    className={({ isActive }) =>
      `${classes.link} ${isActive ? classes.linkActive : ''}`
    }
  >
    {subLink.label}
  </NavLink>
))

// 激活样式
.linkActive {
  color: light-dark(var(--mantine-color-blue-7), var(--mantine-color-blue-4));
  background-color: var(--layout-surface-selected-bg);
}

// 父级菜单被激活（子菜单有激活项）
.control.controlWithLinks.active,
.control.controlWithLinks[data-active] {
  color: light-dark(var(--mantine-color-blue-7), var(--mantine-color-blue-4));
  background-color: transparent;  // 仅改变文字颜色，不改变背景
  box-shadow: none;
}
```

---

## 7. 关键文件汇总

| 文件                   | 职责       | 关键内容                              |
| ---------------------- | ---------- | ------------------------------------- |
| `ViewBar.tsx`          | Tab 栏组件 | 显示标签、滚动、右键菜单              |
| `MultiViewContext.tsx` | 状态管理   | views、activeView、各操作方法、持久化 |
| `useRouteSync.ts`      | 路由同步   | 监听路由变更，创建 Tab                |
| `LinksGroup.tsx`       | 菜单项组件 | 展开/收缩模式、激活检测               |
| `AppNavbar.tsx`        | 导航栏组件 | 菜单渲染、展开/收缩切换               |
| `menuMapper.ts`        | 数据转换   | 后端数据 → UI 菜单格式                |
| `useMenu.ts`           | 菜单查询   | 获取菜单数据、缓存、刷新              |

---

## 8. 滚动机制详解

### 8.1 滚动容器

```typescript
// ViewBar.tsx, line 47-68
.tabBar {
  overflow-x: auto;      // 水平滚动
  overflow-y: hidden;    // 垂直不滚动
  scrollbar-width: none; // Firefox 隐藏滚动条
  -ms-overflow-style: none; // IE/Edge
}

.tabBar::-webkit-scrollbar {
  display: none;         // Chrome 隐藏滚动条
}
```

### 8.2 滚动检测

```typescript
// ViewBar.tsx, line 59-66
const checkScrollState = useCallback(() => {
  const container = tabListRef.current
  if (!container) return

  const { scrollLeft, scrollWidth, clientWidth } = container

  // 已滚动，显示左箭头
  setCanScrollLeft(scrollLeft > 0)

  // 未滚到底，显示右箭头
  setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
}, [])
```

### 8.3 滚动按钮

```typescript
// ViewBar.tsx, line 86-92
const scrollLeft = useCallback(() => {
  tabListRef.current?.scrollBy({
    left: -SCROLL_DISTANCE, // 200px
    behavior: 'smooth',
  })
}, [])

const scrollRight = useCallback(() => {
  tabListRef.current?.scrollBy({
    left: SCROLL_DISTANCE, // 200px
    behavior: 'smooth',
  })
}, [])
```

### 8.4 监听事件

```typescript
// ViewBar.tsx, line 68-80
useEffect(() => {
  const container = tabListRef.current
  if (!container) return

  checkScrollState()

  // 监听容器滚动
  container.addEventListener('scroll', checkScrollState)

  // 监听窗口变化
  window.addEventListener('resize', checkScrollState)

  return () => {
    container.removeEventListener('scroll', checkScrollState)
    window.removeEventListener('resize', checkScrollState)
  }
}, [checkScrollState])

// 当 views 变更时重新检查
useEffect(() => {
  checkScrollState()
}, [views, checkScrollState])
```

---

## 9. 右键菜单实现

### 9.1 菜单显示

```typescript
// ViewBar.tsx, line 94-105
const handleContextMenu = useCallback(
  (e: MouseEvent<HTMLDivElement>, viewPath: string) => {
    e.preventDefault()  // 阻止默认菜单
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      viewPath,
    })
  },
  []
)

// Tab 上绑定
<div onContextMenu={e => handleContextMenu(e, view.path)}>
```

### 9.2 菜单项

```typescript
// ViewBar.tsx, line 206-231
{contextMenu.visible && (
  <div className={classes.contextMenu} style={{ left: contextMenu.x, top: contextMenu.y }}>
    <ContextMenuItem
      icon={<X size={12} />}
      label="关闭"
      onClick={handleClose}
      disabled={!currentContextView?.closable}
    />
    <ContextMenuItem
      label="关闭其他"
      onClick={handleCloseOthers}
      disabled={!hasOtherClosableViews}
    />
    <ContextMenuItem
      label="全部关闭"
      onClick={handleCloseAll}
      disabled={!hasClosableViews}
    />
  </div>
)}
```

### 9.3 外部点击关闭

```typescript
// ViewBar.tsx, line 111-125
useEffect(() => {
  const handleClickOutside = (e: globalThis.MouseEvent) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(e.target as Node)
    ) {
      closeContextMenu() // 关闭菜单
    }
  }

  if (contextMenu.visible) {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }
}, [contextMenu.visible, closeContextMenu])
```

---

## 10. 性能优化

### 10.1 滚动状态检查

- 仅在容器滚动、窗口变化、views 变更时检查
- 使用 useCallback 避免函数重建

### 10.2 菜单标题查找

- 两轮遍历：先精确匹配，再父级匹配
- 使用 useMemo 缓存菜单数据

### 10.3 View 持久化

- 使用 localStorage 缓存，刷新后恢复状态
- 类型检查，避免加载损坏的数据

### 10.4 菜单缓存

- 按 userId、tenantId、locale 缓存
- 支持 5 分钟 staleTime
- 支持手动刷新（clearMenuCache）

---

## 11. 常见交互路径

### 11.1 用户点击菜单项创建 Tab

```
1. 用户在 AppNavbar 中点击菜单项
2. LinksGroup onClick → navigate(path)
3. 路由变更 → location.pathname 变更
4. useRouteSync effect 触发
5. 查找菜单标题 findMenuTitle(menuData, currentPath)
6. addView({ path, title, closable: true })
7. MultiViewProvider setViews([...views, newView])
8. localStorage.setItem 持久化
9. ViewBar 重新渲染，显示新 Tab
10. activeView = location.pathname（自动）
```

### 11.2 用户点击 Tab 切换视图

```
1. 用户点击 ViewBar 中的 Tab
2. onClick={() => setActiveView(view.path)}
3. setActiveView → navigate(view.path)
4. 路由变更
5. RefreshableOutlet 重新渲染内容
6. activeView = location.pathname（自动同步）
7. ViewBar 中该 Tab 自动高亮（.tabActive）
```

### 11.3 用户关闭 Tab

```
1. 用户点击 Tab 的关闭按钮或右键菜单关闭
2. closeView(path) 被调用
3. 检查 closable
4. setViews(views.filter(v => v.path !== path))
5. localStorage 更新
6. 如果关闭的是当前 Tab，导航到最后一个 Tab
7. ViewBar 重新渲染，移除该 Tab
```

---

## 12. 总结

### ViewBar 职责

- 显示所有打开的 Tab
- 支持 Tab 切换、关闭、滚动
- 右键菜单快速操作

### Navbar 职责

- 显示后端菜单
- 支持展开/收缩
- 检测和高亮激活菜单项

### 关联方式

- **数据流**：后端菜单 → menuMapper 转换 → MenuViewItem → LinksGroup 渲染
- **路由驱动**：用户点击菜单 → 路由变更 → useRouteSync 检测 → addView 创建 Tab
- **激活同步**：location.pathname 是唯一的激活源，同时驱动菜单激活和 Tab 高亮

### 关键特点

- Tab 完全由路由驱动（useRouteSync）
- 菜单标题由菜单配置提供，fallback 到路由生成
- 所有状态持久化到 localStorage
- 展开/收缩仅影响 UI 表现，不影响功能
