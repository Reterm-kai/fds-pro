import { AppShell, Box } from '@mantine/core'
import type { CSSProperties } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { RouteProgressBar } from '@/shared/ui'
import { AppHeader } from '@/widgets/app-header'
import { AppNavbar } from '@/widgets/app-navbar'
import {
  MultiViewProvider,
  ViewBar,
  useRouteSync,
  RefreshableOutlet,
} from '@/widgets/multi-view'

/**
 * 路由同步包装组件
 * 用于在 MultiViewProvider 内部调用 useRouteSync
 */
function RouteSyncWrapper({ children }: { children: React.ReactNode }) {
  useRouteSync()
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
  // 移动端侧边栏状态（本地，不持久化）
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
    useDisclosure()
  // 桌面端侧边栏收缩状态（本地，不持久化）
  const [desktopCollapsed, { toggle: toggleDesktop }] = useDisclosure()

  const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    overflow: 'hidden',
  } satisfies CSSProperties

  const contentStyle = {
    flex: 1,
    overflow: 'auto',
    padding: 'var(--mantine-spacing-md)',
    paddingTop:
      'calc(var(--mantine-spacing-lg) * 1.85 + var(--mantine-spacing-md))',
  } satisfies CSSProperties

  return (
    <MultiViewProvider>
      <RouteSyncWrapper>
        <RouteProgressBar />
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: desktopCollapsed ? 50 : 200,
            breakpoint: 'sm',
            collapsed: { mobile: !mobileOpened, desktop: false },
          }}
          padding={0}
        >
          <AppShell.Header>
            <AppHeader opened={mobileOpened} toggle={toggleMobile} />
          </AppShell.Header>

          <AppShell.Navbar withBorder={false}>
            <AppNavbar
              collapsed={desktopCollapsed}
              onToggleCollapse={toggleDesktop}
              onLinkClick={closeMobile}
            />
          </AppShell.Navbar>

          <AppShell.Main style={mainStyle}>
            <ViewBar />
            <Box style={contentStyle}>
              <RefreshableOutlet />
            </Box>
          </AppShell.Main>
        </AppShell>
      </RouteSyncWrapper>
    </MultiViewProvider>
  )
}
