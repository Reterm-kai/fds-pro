import { AppShell } from '@mantine/core'
import type { CSSProperties, ReactNode } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { ContentArea, RouteProgressBar } from '@/shared/ui'
import { AppHeader } from '@/widgets/app-header'
import { AppNavbar } from '@/widgets/app-navbar'
import {
  MultiViewProvider,
  ViewBar,
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
export function AppLayout() {
  const headerHeight = 56
  // 移动端侧边栏状态（本地，不持久化）
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
    useDisclosure()
  // 桌面端侧边栏收缩状态（本地，不持久化）
  const [desktopCollapsed, { toggle: toggleDesktop }] = useDisclosure()
  const { user } = useAuth()
  const menuCacheScope = user ? { userId: user.id } : undefined

  const appShellStyle = {
    height: '100vh',
    overflow: 'hidden',
  } satisfies CSSProperties

  const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    overflow: 'hidden',
  } satisfies CSSProperties

  const navbarStyle = {
    borderRight:
      'calc(var(--mantine-spacing-xs) * 0.125) solid var(--layout-divider-color)',
    boxShadow: 'var(--layout-surface-shadow)',
    backgroundColor: 'var(--layout-surface-bg)',
  } satisfies CSSProperties

  return (
    <MultiViewProvider>
      <RouteSyncWrapper cacheScope={menuCacheScope}>
        <RouteProgressBar />
        <AppShell
          header={{ height: headerHeight }}
          navbar={{
            width: desktopCollapsed ? 50 : 200,
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

          <AppShell.Main style={mainStyle}>
            <ViewBar />
            <ContentArea>
              <RefreshableOutlet />
            </ContentArea>
          </AppShell.Main>
        </AppShell>
      </RouteSyncWrapper>
    </MultiViewProvider>
  )
}
