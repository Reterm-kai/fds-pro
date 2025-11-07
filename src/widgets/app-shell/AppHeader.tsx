import {
  Group,
  Burger,
  Avatar,
  Menu,
  UnstyledButton,
  rem,
  Text,
} from '@mantine/core'
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react'
import { ThemeToggle } from '@/shared/ui/theme-toggle'
import { Logo } from '@/shared/ui/logo'
import { useAuth } from '@/shared/hooks/useAuth'

interface AppHeaderProps {
  /** 菜单展开状态 */
  opened: boolean
  /** 切换菜单展开状态 */
  toggle: () => void
}

/**
 * 应用顶部导航栏组件
 * 包含菜单切换按钮、系统标题、主题切换和用户信息
 */
export function AppHeader({ opened, toggle }: AppHeaderProps) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        <Logo size="sm" withText />
      </Group>

      <Group>
        <ThemeToggle />

        {user ? (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <UnstyledButton>
                <Avatar color="blue" radius="xl" size="md">
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>用户中心</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconUser style={{ width: rem(14), height: rem(14) }} />
                }
              >
                个人资料
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />
                }
              >
                系统设置
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                color="red"
                leftSection={
                  <IconLogout style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={handleLogout}
              >
                退出登录
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Text size="sm">未登录</Text>
        )}
      </Group>
    </Group>
  )
}
