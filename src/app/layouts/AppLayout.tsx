import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import { AppHeader, AppNavbar } from '@/widgets/app-shell'
import { ProtectedRoute } from '@/shared/components/ProtectedRoute'
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

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <AppHeader opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar>
        <AppNavbar menuItems={menuItems} />
      </AppShell.Navbar>

      <AppShell.Main>
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      </AppShell.Main>
    </AppShell>
  )
}
