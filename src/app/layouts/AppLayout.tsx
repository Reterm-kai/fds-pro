import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/app-shell/ui/Header'
import { Navbar } from '@/widgets/app-shell/ui/Navbar'

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
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: desktopCollapsed ? 64 : 240,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: false },
      }}
      padding="md"
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
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
