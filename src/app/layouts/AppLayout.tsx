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
 * - opened: 移动端侧边栏展开状态（本地状态，不持久化）
 */
export function AppLayout() {
  // 移动端侧边栏状态（本地，不持久化）
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 240,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
