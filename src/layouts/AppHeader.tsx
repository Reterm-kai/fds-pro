import {
  Group,
  Burger,
  Text,
  Avatar,
  Menu,
  UnstyledButton,
  rem,
} from '@mantine/core'
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react'
import { ThemeToggle } from '../components/ThemeToggle'

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
  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={toggle} size="sm" />
        <Text size="xl" fw={700}>
          FDS Pro
        </Text>
      </Group>

      <Group>
        <ThemeToggle />

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <UnstyledButton>
              <Avatar color="blue" radius="xl" size="md">
                U
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
            >
              退出登录
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  )
}
