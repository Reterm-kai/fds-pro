import { AppShell } from '@mantine/core'
import type { CSSProperties, ReactNode } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { ContentArea, RouteProgressBar } from '@/shared/ui'
import { AppHeader } from '@/widgets/app-header'
import { AppNavbar } from '@/widgets/app-navbar'
import {
  MultiViewProvider,
  ViewBar,
  VIEW_BAR_HEIGHT,
  useRouteSync,
  RefreshableOutlet,
} from '@/widgets/multi-view'
import { useAuth } from '@/features/auth'
import type { MenuCacheScope } from '@/features/menu'

/**
 * 路由同步包装组件
 * 用于在 MultiViewProvider 内部调用 useRouteSync
 */
function RouteSyncWrapper({
  children,
  cacheScope,
}: {
  children: ReactNode
  cacheScope?: MenuCacheScope
}) {
  useRouteSync({ cacheScope })
  return <>{children}</>
}

/**
 * 应用主布局组件
 * 使用 Mantine AppShell 实现响应式布局,包含顶部导航栏、侧边菜单和主内容区域
 *
 * 状态管理：
 * - mobileOpened: 移动端侧边栏展开状态（本地状态，不持久化）
 * - desktopCollapsed: 桌面端侧边栏收缩状态（本地状态，不持久化）
 */
/** Header 高度，基于 Mantine spacing 计算 (xl * 1.75 ≈ 56px) */
const HEADER_HEIGHT = 'calc(var(--mantine-spacing-xl) * 1.75)'

/** Navbar 展开宽度 */
const NAVBAR_WIDTH_EXPANDED = 200

/** Navbar 收缩宽度 */
const NAVBAR_WIDTH_COLLAPSED = 50

export function AppLayout() {
  // 移动端侧边栏状态（本地，不持久化）
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
    useDisclosure()
  // 桌面端侧边栏收缩状态（本地，不持久化）
  const [desktopCollapsed, { toggle: toggleDesktop }] = useDisclosure()
  const { user } = useAuth()
  const menuCacheScope = user ? { userId: user.id } : undefined

  const appShellStyle = {
    height: '100vh',
    overflowX: 'hidden',
  } satisfies CSSProperties

  const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    paddingTop: `calc(var(--app-shell-header-offset, 0rem) + var(--app-shell-padding) + ${VIEW_BAR_HEIGHT})`,
  } satisfies CSSProperties

  const navbarStyle = {
    borderRight:
      'calc(var(--mantine-spacing-xs) * 0.1) solid var(--layout-divider-color)',
    boxShadow: 'var(--layout-surface-shadow)',
    backgroundColor: 'var(--layout-surface-bg)',
  } satisfies CSSProperties

  const viewBarSectionStyle = {
    position: 'fixed',
    top: 'calc(var(--app-shell-header-offset, 0rem) + var(--app-shell-padding))',
    left: 0,
    right: 0,
    paddingInlineStart:
      'calc(var(--app-shell-navbar-offset, 0rem) + var(--app-shell-padding))',
    paddingInlineEnd:
      'calc(var(--app-shell-aside-offset, 0rem) + var(--app-shell-padding))',
    paddingTop: 'var(--app-shell-padding)',
    paddingBottom: 0,
    backgroundColor: 'var(--mantine-color-body)',
    zIndex: 'var(--mantine-z-index-app)',
  } satisfies CSSProperties

  return (
    <MultiViewProvider>
      <RouteSyncWrapper cacheScope={menuCacheScope}>
        <RouteProgressBar />
        <AppShell
          header={{ height: HEADER_HEIGHT }}
          navbar={{
            width: desktopCollapsed
              ? NAVBAR_WIDTH_COLLAPSED
              : NAVBAR_WIDTH_EXPANDED,
            breakpoint: 'sm',
            collapsed: { mobile: !mobileOpened, desktop: false },
          }}
          padding={0}
          style={appShellStyle}
        >
          <AppShell.Header>
            <AppHeader opened={mobileOpened} toggle={toggleMobile} />
          </AppShell.Header>

          <AppShell.Navbar style={navbarStyle}>
            <AppNavbar
              collapsed={desktopCollapsed}
              onToggleCollapse={toggleDesktop}
              onLinkClick={closeMobile}
              menuCacheScope={menuCacheScope}
            />
          </AppShell.Navbar>

          <AppShell.Section style={viewBarSectionStyle}>
            <ViewBar height={VIEW_BAR_HEIGHT} />
          </AppShell.Section>

          <AppShell.Main style={mainStyle}>
            <ContentArea>
              <RefreshableOutlet />
            </ContentArea>
          </AppShell.Main>
        </AppShell>
      </RouteSyncWrapper>
    </MultiViewProvider>
  )
}
