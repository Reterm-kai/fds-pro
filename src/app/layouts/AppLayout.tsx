import { AppShell, Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Header } from '@/widgets/app-shell/ui/Header'
import { Navbar } from '@/widgets/app-shell/ui/Navbar'
import { RouteProgressBar } from '@/widgets/app-shell/ui/RouteProgressBar'
import {
  TabProvider,
  TabBar,
  useRouteTabSync,
  RefreshableOutlet,
} from '@/features/tab-pages'

/**
 * Tab 同步包装组件
 * 用于在 TabProvider 内部调用 useRouteTabSync
 */
function TabSyncWrapper({ children }: { children: React.ReactNode }) {
  useRouteTabSync()
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

  return (
    <TabProvider>
      <TabSyncWrapper>
        <RouteProgressBar />
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: desktopCollapsed ? 64 : 240,
            breakpoint: 'sm',
            collapsed: { mobile: !mobileOpened, desktop: false },
          }}
          padding={0}
        >
          <AppShell.Header>
            <Header opened={mobileOpened} toggle={toggleMobile} />
          </AppShell.Header>

          <AppShell.Navbar>
            <Navbar
              collapsed={desktopCollapsed}
              onToggleCollapse={toggleDesktop}
              onLinkClick={closeMobile}
            />
          </AppShell.Navbar>

          <AppShell.Main>
            <TabBar />
            <Box p="md">
              <RefreshableOutlet />
            </Box>
          </AppShell.Main>
        </AppShell>
      </TabSyncWrapper>
    </TabProvider>
  )
}
