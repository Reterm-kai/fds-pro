# ViewBar & Navbar 架构总结

## 关键文件路径及功能

### 多视图标签栏（ViewBar）

| 文件                                                 | 行数 | 功能                                   |
| ---------------------------------------------------- | ---- | -------------------------------------- |
| `/src/widgets/multi-view/ui/ViewBar.tsx`             | 259  | 显示 Tab、切换、关闭、滚动、右键菜单   |
| `/src/widgets/multi-view/ui/ViewBar.module.css`      | 195  | Tab 样式、滚动按钮、右键菜单样式       |
| `/src/widgets/multi-view/ui/RefreshableOutlet.tsx`   | 9    | 路由出口包装（简单的 Outlet）          |
| `/src/widgets/multi-view/model/MultiViewContext.tsx` | 156  | 状态管理 Provider、View 持久化         |
| `/src/widgets/multi-view/model/useMultiView.ts`      | 14   | Hook 导出                              |
| `/src/widgets/multi-view/model/useRouteSync.ts`      | 136  | 路由同步、自动创建 Tab                 |
| `/src/widgets/multi-view/model/context.ts`           | 10   | Context 定义                           |
| `/src/widgets/multi-view/model/types.ts`             | 32   | ViewPage 和 MultiViewContextValue 类型 |
| `/src/widgets/multi-view/index.ts`                   | 10   | Public API 导出                        |

### 侧边导航栏（AppNavbar）

| 文件                                               | 行数 | 功能                                |
| -------------------------------------------------- | ---- | ----------------------------------- |
| `/src/widgets/app-navbar/ui/AppNavbar.tsx`         | 247  | 菜单渲染、展开/收缩、加载/错误状态  |
| `/src/widgets/app-navbar/ui/AppNavbar.module.css`  | 217  | 导航栏样式、展开/收缩动画           |
| `/src/shared/ui/links-group/LinksGroup.tsx`        | 205  | 菜单项组件、激活检测、展开/收缩模式 |
| `/src/shared/ui/links-group/LinksGroup.module.css` | 348  | 菜单项样式、激活状态、深色模式      |

### 菜单数据管理

| 文件                                     | 行数 | 功能                              |
| ---------------------------------------- | ---- | --------------------------------- |
| `/src/features/menu/api/useMenu.ts`      | 59   | 菜单查询、缓存、刷新              |
| `/src/features/menu/model/types.ts`      | 36   | RemoteMenuItem、MenuViewItem 类型 |
| `/src/features/menu/model/menuMapper.ts` | 99   | 后端菜单数据转换、排序、图标映射  |
| `/src/features/menu/model/menuCache.ts`  | ?    | 菜单缓存存取                      |

### 集成点

| 文件                             | 行数 | 功能                                          |
| -------------------------------- | ---- | --------------------------------------------- |
| `/src/app/layouts/AppLayout.tsx` | 102  | 整体布局、MultiViewProvider、RouteSyncWrapper |

---

## 核心交互流程图

```
用户界面：
┌─────────────────────────────────────────────┐
│  AppLayout (src/app/layouts/AppLayout.tsx)  │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ Header: AppHeader                       │ │
│ └─────────────────────────────────────────┘ │
│ ┌──────────┐ ┌──────────────────────────┐  │
│ │ Navbar   │ │ ViewBar (标签栏)         │  │
│ │ (菜单)   │ │ ├─ 滚动按钮             │  │
│ │          │ │ ├─ Tab 列表             │  │
│ │ LinksGroup│ │ └─ 右键菜单            │  │
│ │ (菜单项)  │ └──────────────────────────┘  │
│ └──────────┘ ┌──────────────────────────┐  │
│              │ Main: RefreshableOutlet  │  │
│              │ (页面内容)               │  │
│              └──────────────────────────┘  │
└─────────────────────────────────────────────┘

状态管理层：
┌─────────────────────────────────────────────────────────────┐
│ MultiViewProvider (MultiViewContext)                        │
│ ├─ views: ViewPage[] (所有打开的 Tab)                       │
│ ├─ activeView: string (当前路由)                            │
│ ├─ localStorage 持久化                                      │
│ └─ 方法: addView, closeView, setActiveView 等               │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ useRouteSync (路由同步)                                     │
│ ├─ 监听 location.pathname 变更                              │
│ ├─ 查找菜单标题                                            │
│ └─ 调用 addView 创建 Tab                                    │
└─────────────────────────────────────────────────────────────┘

菜单数据层：
┌─────────────────────────────────────────────────────────────┐
│ useMenu (TanStack Query)                                    │
│ ├─ GET /menus → RemoteMenuItem[]                            │
│ ├─ transformMenuResponse 转换                               │
│ ├─ 缓存 (localStorage)                                      │
│ └─ 结果: MenuViewItem[] ← 传给 AppNavbar & useRouteSync     │
└─────────────────────────────────────────────────────────────┘
```

---

## 数据流向

### 1. 初始化时

```
AppLayout 挂载
  ↓
MultiViewProvider 初始化
  ├─ 从 localStorage 读取 views
  └─ activeView = location.pathname
  ↓
RouteSyncWrapper 调用 useRouteSync
  ↓
AppNavbar 调用 useMenu
  ├─ GET /menus
  ├─ 转换数据 (transformMenuResponse)
  └─ 缓存数据
  ↓
ViewBar 和 LinksGroup 渲染
```

### 2. 用户交互时

```
用户点击菜单项
  ↓
LinksGroup.NavLink onClick
  ├─ navigate(path)
  └─ location.pathname 变更
  ↓
useRouteSync effect 触发
  ├─ 获取当前 location.pathname
  ├─ findMenuTitle() 查找标题
  ├─ 检查 views 是否已存在
  └─ addView({ path, title, closable: true })
  ↓
MultiViewProvider 更新 state
  ├─ setViews([...views, newView])
  ├─ localStorage.setItem 持久化
  └─ activeView = location.pathname (自动)
  ↓
ViewBar 重新渲染
  └─ 显示新 Tab，自动高亮
  ↓
RefreshableOutlet 渲染新页面
```

---

## 关键状态及其来源

| 状态               | 类型           | 来源                      | 存储         | 更新时机               |
| ------------------ | -------------- | ------------------------- | ------------ | ---------------------- |
| views              | ViewPage[]     | MultiViewContext          | localStorage | 调用 addView/closeView |
| activeView         | string         | location.pathname         | 无           | 路由变更               |
| menuData           | MenuViewItem[] | useMenu (TanStack Query)  | localStorage | 挂载、手动 reload      |
| isActive (菜单)    | boolean        | location.pathname vs link | 无           | 路由变更               |
| collapsed (navbar) | boolean        | AppLayout 本地 state      | 无           | 点击 toggle 按钮       |

---

## 菜单激活逻辑

### 激活条件

#### 展开模式

```
菜单项激活 = location.pathname 精确匹配 link

有激活子菜单的父菜单 =
  ├─ 本身激活 (link 匹配)
  └─ 或子菜单中有激活项 (任一 links 匹配)
```

#### 收缩模式

```
图标激活 = isActive || hasActiveChild
```

### 激活样式

```
展开模式激活项：
  color: 蓝色 (--mantine-color-blue-7/4)
  background: --layout-surface-selected-bg
  box-shadow: var(--mantine-shadow-sm)

父菜单被激活（有激活子菜单）：
  color: 蓝色
  background: 无
  box-shadow: 无

子菜单项激活：
  color: 蓝色
  background: --layout-surface-selected-bg
```

---

## ViewBar 的 Tab 生命周期

### 创建

```
1. 路由变更 (navigate)
2. useRouteSync 监听
3. 查找菜单标题
4. addView() 创建 Tab
5. 持久化到 localStorage
```

### 激活

```
1. 点击 Tab
2. setActiveView() → navigate()
3. location.pathname 同步变更
4. ViewBar 检测到 activeView 变更
5. Tab 添加 .tabActive 类
```

### 关闭

```
1. 点击关闭按钮 或 右键菜单
2. closeView() 被调用
3. 检查 closable 属性
4. 从 views 中移除
5. localStorage 更新
6. 如果是当前 Tab → 导航到最后一个 Tab
```

### 持久化

```
存储：
  - 每次 views 变更时自动存储到 localStorage
  - 存储键：fds-pro-multi-views
  - 内容：JSON 序列化的 ViewPage[]

恢复：
  - 页面挂载时从 localStorage 读取
  - 类型检查和验证（避免加载损坏的数据）
```

---

## 右键菜单操作

| 操作     | 条件                            | 效果                                     |
| -------- | ------------------------------- | ---------------------------------------- |
| 关闭     | 目标 Tab 可关闭 (closable=true) | 删除该 Tab，如果是当前 Tab 则导航        |
| 关闭其他 | 存在其他可关闭 Tab              | 仅保留当前 Tab 和不可关闭 Tab            |
| 全部关闭 | 存在至少一个可关闭 Tab          | 关闭所有可关闭 Tab，导航到首页或剩余 Tab |

---

## ViewBar 滚动控制

### 滚动状态检测

```typescript
const checkScrollState = () => {
  const { scrollLeft, scrollWidth, clientWidth } = tabListRef.current

  // 显示左箭头：已向右滚动
  setCanScrollLeft(scrollLeft > 0)

  // 显示右箭头：未滚到底部
  setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
}
```

### 触发时机

```
- 初始化
- 容器 scroll 事件
- 窗口 resize 事件
- views 数组变更
```

### 滚动参数

```
- 距离：SCROLL_DISTANCE = 200px
- 行为：smooth (平滑滚动)
- 方向：负数为左，正数为右
```

---

## 性能优化策略

### 1. 菜单数据缓存

```
useMenu 使用 TanStack Query：
  - staleTime: 5 分钟
  - 按 userId/tenantId/locale 缓存
  - 支持手动 reload
```

### 2. View 持久化

```
localStorage 缓存：
  - 避免重新创建已打开的 Tab
  - 页面刷新后恢复状态
```

### 3. 菜单标题查找

```
两轮遍历查找：
  - 第一轮：精确匹配（O(n)）
  - 第二轮：父级匹配（O(n)）
  - Fallback：生成默认标题
```

### 4. 函数记忆化

```
useCallback 优化：
  - handleContextMenu
  - handleCloseClick
  - checkScrollState
  - scrollLeft / scrollRight
```

---

## 关键概念

### ViewPage

- Tab 的数据模型
- 包含：path (唯一标识), title, closable
- 来源：useRouteSync 自动创建，或手动 addView
- 存储：localStorage

### MenuViewItem

- 菜单项的 UI 模型
- 来源：后端 RemoteMenuItem 转换而来
- 用途：LinksGroup 渲染菜单
- 包含：link/links (路由), label (显示名), icon

### activeView

- 当前激活视图的路由路径
- 源于 location.pathname
- 用于高亮当前 Tab 和菜单项
- 不单独存储

### location.pathname

- React Router 提供的当前路由
- 是 Tab 激活的唯一真实来源
- 所有激活状态都基于此计算

---

## 常见场景和解决方案

### 场景 1：菜单没有显示对应的 Tab

**原因**：useRouteSync 可能未在 MultiViewProvider 内部
**解决**：确保 useRouteSync 在 RouteSyncWrapper 内调用

### 场景 2：Tab 标题不对

**原因**：菜单查找失败，使用了 fallback 标题
**解决**：检查菜单配置中 path 是否与路由匹配

### 场景 3：Tab 刷新后消失

**原因**：localStorage 数据损坏或 views 过多导致存储失败
**解决**：清除 localStorage，刷新页面

### 场景 4：菜单项不高亮

**原因**：location.pathname 与菜单的 link 不匹配
**解决**：检查路由配置和菜单 path 一致性

### 场景 5：关闭 Tab 时不导航到其他 Tab

**原因**：可能没有其他可用的 Tab
**解决**：导航到首页 (/) 或保留至少一个不可关闭的 Tab

---

## 扩展建议

### 需要修改的点

- Tab 顺序：修改 addView 逻辑，不按追加顺序，而是按路由深度排序
- Tab 编辑：在 ViewPage 中增加 editable 字段，允许重命名
- 快捷键：在 AppLayout 添加 keydown 监听，实现 Ctrl+W 关闭
- 预加载：在 useRouteSync 中提前加载相邻的菜单项

### 新增功能建议

- Tab 分组：按功能模块分组显示
- Tab 固定：支持 pin 某些 Tab 使其始终显示
- Tab 搜索：快速搜索历史 Tab
- Tab 同步：跨 tab/窗口同步打开的 Tab
- Undo/Redo：支持撤销关闭的 Tab
