import { Menu, UnstyledButton, Avatar, Group, Text } from '@mantine/core'
import {
  IconSettings,
  IconUser,
  IconLogout,
  IconChevronDown,
} from '@tabler/icons-react'
import classes from './UserMenu.module.css'

export interface UserMenuUser {
  name: string
  email: string
  avatar?: string
}

interface UserMenuProps {
  user: UserMenuUser
  onLogout: () => Promise<void> | void
  onProfile?: () => void
  onSettings?: () => void
}

/**
 * 用户菜单组件
 * 显示当前登录用户的头像和昵称,点击展开下拉菜单
 */
export function UserMenu({
  user,
  onLogout,
  onProfile,
  onSettings,
}: UserMenuProps) {
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

        <Menu.Item leftSection={<IconUser size={16} />} onClick={onProfile}>
          个人资料
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSettings size={16} />}
          onClick={onSettings}
        >
          账户设置
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<IconLogout size={16} />}
          onClick={onLogout}
        >
          退出登录
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
