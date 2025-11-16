import { useState } from 'react'
import { Alert, Stack, Group, Button, Text } from '@mantine/core'
import { AlertCircle, Plus } from 'lucide-react'
import { modals } from '@mantine/modals'
import type { User } from '@/entities/user'
import { useUserList } from '@/features/users'
import { useDeleteUser } from '@/features/users'
import { UserListFilters } from '@/features/users'
import { UserListTable } from './UserListTable'
import {
  showErrorNotification,
  showSuccessNotification,
} from '@/shared/ui'
import { UserForm } from './UserForm'

/**
 * 用户管理主视图
 * 负责拉取数据、处理筛选和增删改交互
 */
export function UsersView() {
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [role, setRole] = useState<User['role'] | ''>('')
  const [status, setStatus] = useState<User['status'] | ''>('')
  const [formOpened, setFormOpened] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const pageSize = 10

  const { data, isLoading, isError, error } = useUserList({
    page,
    pageSize,
    ...(keyword && { keyword }),
    ...(role && { role }),
    ...(status && { status }),
  })

  const deleteUser = useDeleteUser()

  const handleReset = () => {
    setKeyword('')
    setRole('')
    setStatus('')
    setPage(1)
  }

  const handleCreate = () => {
    setEditingUser(null)
    setFormOpened(true)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormOpened(true)
  }

  const handleDelete = (user: User) => {
    modals.openConfirmModal({
      title: '删除用户',
      children: (
        <Text size="sm">
          确定要删除用户 <strong>{user.name}</strong> 吗?此操作无法撤销。
        </Text>
      ),
      labels: { confirm: '确认删除', cancel: '取消' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await deleteUser.mutateAsync(user.id)
          showSuccessNotification({
            title: '删除成功',
            message: `用户 ${user.name} 已删除`,
          })
        } catch (deleteError) {
          showErrorNotification({
            title: '删除失败',
            message:
              deleteError instanceof Error ? deleteError.message : '操作失败',
          })
        }
      },
    })
  }

  const handleKeywordChange = (value: string) => {
    setKeyword(value)
    setPage(1)
  }

  const handleRoleChange = (value: User['role'] | '') => {
    setRole(value)
    setPage(1)
  }

  const handleStatusChange = (value: User['status'] | '') => {
    setStatus(value)
    setPage(1)
  }

  if (isError) {
    return (
      <Alert
        icon={<AlertCircle size={16} />}
        title="加载失败"
        color="red"
        variant="light"
      >
        {error.message ? error.message : '无法加载用户列表'}
      </Alert>
    )
  }

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <Button leftSection={<Plus size={16} />} onClick={handleCreate}>
          创建用户
        </Button>
      </Group>

      <UserListFilters
        keyword={keyword}
        role={role}
        status={status}
        onKeywordChange={handleKeywordChange}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
        onReset={handleReset}
      />

      <UserListTable
        users={data?.list || []}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        total={data?.total || 0}
        onPageChange={setPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserForm
        opened={formOpened}
        onClose={() => setFormOpened(false)}
        user={editingUser}
      />
    </Stack>
  )
}
