import {
  Table,
  Badge,
  Avatar,
  Group,
  Text,
  Card,
  Pagination,
  ActionIcon,
  Tooltip,
  Skeleton,
  Stack,
} from '@mantine/core'
import { Pencil, Trash2 } from 'lucide-react'
import type { User } from '@/entities/user'

interface UserListTableProps {
  users: User[]
  isLoading: boolean
  page: number
  totalPages: number
  total: number
  onPageChange: (page: number) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

/**
 * 用户列表表格组件
 */
export function UserListTable({
  users,
  isLoading,
  page,
  totalPages,
  total,
  onPageChange,
  onEdit,
  onDelete,
}: UserListTableProps) {
  if (isLoading) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          {Array.from({ length: 5 }).map((_, index) => (
            <Group key={index} gap="md">
              <Skeleton height={40} circle />
              <Skeleton height={20} width="30%" />
              <Skeleton height={20} width="40%" />
              <Skeleton height={20} width="15%" />
              <Skeleton height={20} width="10%" />
            </Group>
          ))}
        </Stack>
      </Card>
    )
  }

  const rows = users.map(user => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} radius={30} color="blue">
            {user.name.charAt(0)}
          </Avatar>
          <Text size="sm" fw={500}>
            {user.name}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>
        <Badge
          color={
            user.role === 'admin'
              ? 'red'
              : user.role === 'user'
                ? 'blue'
                : 'gray'
          }
        >
          {user.role === 'admin'
            ? '管理员'
            : user.role === 'user'
              ? '用户'
              : '访客'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={user.status === 'active' ? 'green' : 'gray'}>
          {user.status === 'active' ? '在线' : '离线'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Tooltip label="编辑">
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => onEdit(user)}
            >
              <Pencil size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="删除">
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => onDelete(user)}
            >
              <Trash2 size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>用户</Table.Th>
            <Table.Th>邮箱</Table.Th>
            <Table.Th>角色</Table.Th>
            <Table.Th>状态</Table.Th>
            <Table.Th>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      {totalPages > 1 && (
        <Group justify="space-between" mt="xl">
          <Text size="sm" c="dimmed">
            共 {total} 条记录,第 {page} / {totalPages} 页
          </Text>
          <Pagination value={page} onChange={onPageChange} total={totalPages} />
        </Group>
      )}
    </Card>
  )
}
