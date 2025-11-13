import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import { AppHeader, AppNavbar } from '@/widgets/app-shell'
import { useUIStore, selectNavbarCollapse } from '@/shared/model'
import type { MenuItem } from '@/shared/navigation/types'

interface AppLayoutProps {
  /** 菜单项配置 */
  menuItems: MenuItem[]
}

/**
 * 应用主布局组件
 * 使用 Mantine AppShell 实现响应式布局,包含顶部导航栏、侧边菜单和主内容区域
 *
 * 状态管理：
 * - opened: 移动端侧边栏展开状态（本地状态，不持久化）
 * - navbarCollapse: 桌面端导航栏收起状态（全局状态，持久化）
 */
export function AppLayout({ menuItems }: AppLayoutProps) {
  // 移动端侧边栏状态（本地，不持久化）
  const [opened, { toggle }] = useDisclosure()

  // 桌面端导航栏收起状态（全局，持久化）
  const navbarCollapse = useUIStore(selectNavbarCollapse)
  const toggleNavbarCollapse = useUIStore(state => state.toggleNavbarCollapse)

  const collapsed = navbarCollapse === 'collapsed'

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: collapsed ? 48 : 220,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <AppHeader opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar>
        <AppNavbar
          menuItems={menuItems}
          collapsed={collapsed}
          toggleCollapsed={toggleNavbarCollapse}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
