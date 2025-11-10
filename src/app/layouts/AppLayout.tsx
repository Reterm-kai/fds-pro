import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import { AppHeader, AppNavbar } from '@/widgets/app-shell'
import type { MenuItem } from '@/shared/navigation/types'

interface AppLayoutProps {
  /** 菜单项配置 */
  menuItems: MenuItem[]
}

/**
 * 应用主布局组件
 * 使用 Mantine AppShell 实现响应式布局,包含顶部导航栏、侧边菜单和主内容区域
 */
export function AppLayout({ menuItems }: AppLayoutProps) {
  const [opened, { toggle }] = useDisclosure()
  const [collapsed, { toggle: toggleCollapsed }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: collapsed ? 48 : 280,
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
          toggleCollapsed={toggleCollapsed}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
