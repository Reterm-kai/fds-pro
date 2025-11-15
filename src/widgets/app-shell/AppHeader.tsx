import {
  Group,
  Burger,
  Avatar,
  Menu,
  UnstyledButton,
  Text,
} from '@mantine/core'
import { LogOut, Settings, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Logo, ThemeToggle } from '@/shared/ui'
import { useAuth } from '@/features/auth'

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
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        <Logo style={{ width: 100, height: 'auto' }} />
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
              <Menu.Item leftSection={<User size={14} />}>个人资料</Menu.Item>
              <Menu.Item leftSection={<Settings size={14} />}>
                系统设置
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                color="red"
                leftSection={<LogOut size={14} />}
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
