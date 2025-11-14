import { Menu, UnstyledButton, Avatar, Group, Text, rem } from '@mantine/core'
import {
  IconSettings,
  IconUser,
  IconLogout,
  IconChevronDown,
} from '@tabler/icons-react'
import { useAuth } from '@/features/auth'
import { useNavigate } from 'react-router-dom'
import classes from './UserMenu.module.css'

/**
 * 用户菜单组件
 * 显示当前登录用户的头像和昵称,点击展开下拉菜单
 */
export function UserMenu() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // 如果没有用户信息,不显示菜单
  if (!user) {
    return null
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleSettings = () => {
    navigate('/settings')
  }

  const handleProfile = () => {
    navigate('/profile')
  }

  return (
    <Menu width={200} position="bottom-end" withArrow>
      <Menu.Target>
        <UnstyledButton className={classes.userButton}>
          <Group gap="xs">
            <Avatar src={user.avatar} size={24} radius="xl" color="gray">
              {user.name.charAt(0).toUpperCase()}
            </Avatar>

            <Text size="sm" fw={500} className={classes.userName}>
              {user.name}
            </Text>

            <IconChevronDown
              size={14}
              stroke={1.5}
              className={classes.chevron}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          <Text size="sm" fw={500} truncate>
            {user.name}
          </Text>
          <Text size="xs" c="dimmed" truncate>
            {user.email}
          </Text>
        </Menu.Label>

        <Menu.Divider />

        <Menu.Item
          leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
          onClick={handleProfile}
        >
          个人资料
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(16), height: rem(16) }} />
          }
          onClick={handleSettings}
        >
          账户设置
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={
            <IconLogout style={{ width: rem(16), height: rem(16) }} />
          }
          onClick={handleLogout}
        >
          退出登录
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
