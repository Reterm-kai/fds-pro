import { AppShell } from '@mantine/core'
import type { ReactNode } from 'react'
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
import classes from './AppLayout.module.css'

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

/** Navbar 展开宽度，基于 Mantine spacing 计算 (xl * 6.25 ≈ 200px) */
const NAVBAR_WIDTH_EXPANDED = 'calc(var(--mantine-spacing-xl) * 6.25)'

/** Navbar 收缩宽度，基于 Mantine spacing 计算 (xl * 1.5625 ≈ 50px) */
const NAVBAR_WIDTH_COLLAPSED = 'calc(var(--mantine-spacing-xl) * 1.5625)'

export function AppLayout() {
  // 移动端侧边栏状态（本地，不持久化）
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
    useDisclosure()
  // 桌面端侧边栏收缩状态（本地，不持久化）
  const [desktopCollapsed, { toggle: toggleDesktop }] = useDisclosure()
  const { user } = useAuth()
  const menuCacheScope = user ? { userId: user.id } : undefined

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
          className={classes.appShell}
        >
          <AppShell.Header>
            <AppHeader opened={mobileOpened} toggle={toggleMobile} />
          </AppShell.Header>

          <AppShell.Navbar className={classes.navbar}>
            <AppNavbar
              collapsed={desktopCollapsed}
              onToggleCollapse={toggleDesktop}
              onLinkClick={closeMobile}
              menuCacheScope={menuCacheScope}
            />
          </AppShell.Navbar>

          <AppShell.Section className={classes.viewBarSection}>
            <ViewBar height={VIEW_BAR_HEIGHT} />
          </AppShell.Section>

          <AppShell.Main className={classes.main}>
            <ContentArea>
              <RefreshableOutlet />
            </ContentArea>
          </AppShell.Main>
        </AppShell>
      </RouteSyncWrapper>
    </MultiViewProvider>
  )
}
