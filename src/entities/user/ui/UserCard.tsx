import { Card, Group, Text, Badge, Stack } from '@mantine/core'
import { UserAvatar } from './UserAvatar'
import type { User } from '../model/types'
import {
  getRoleLabel,
  getStatusLabel,
  getRoleColor,
  getStatusColor,
} from '../lib/userUtils'

interface UserCardProps {
  user: User
  onClick?: () => void
}

/**
 * 用户卡片组件
 * 基础 UI 组件,用于展示用户信息
 */
export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
      component={onClick ? 'button' : 'div'}
    >
      <Group>
        <UserAvatar user={user} size="lg" />
        <Stack gap="xs" flex={1}>
          <Text fw={500} size="lg">
            {user.name}
          </Text>
          <Text size="sm" c="dimmed">
            {user.email}
          </Text>
          <Group gap="xs">
            <Badge color={getRoleColor(user.role)}>
              {getRoleLabel(user.role)}
            </Badge>
            <Badge color={getStatusColor(user.status)}>
              {getStatusLabel(user.status)}
            </Badge>
          </Group>
        </Stack>
      </Group>
    </Card>
  )
}
