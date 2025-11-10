import { Card, Group, TextInput, Select, Button } from '@mantine/core'
import { IconSearch, IconX } from '@tabler/icons-react'
import type { User } from '@/entities/user'

interface UserListFiltersProps {
  keyword: string
  role: User['role'] | ''
  status: User['status'] | ''
  onKeywordChange: (keyword: string) => void
  onRoleChange: (role: User['role'] | '') => void
  onStatusChange: (status: User['status'] | '') => void
  onReset: () => void
}

/**
 * 用户列表筛选器组件
 */
export function UserListFilters({
  keyword,
  role,
  status,
  onKeywordChange,
  onRoleChange,
  onStatusChange,
  onReset,
}: UserListFiltersProps) {
  const hasFilters = keyword || role || status

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Group gap="md">
        <TextInput
          placeholder="搜索用户名或邮箱"
          leftSection={<IconSearch size={16} />}
          value={keyword}
          onChange={event => onKeywordChange(event.target.value)}
          style={{ flex: 1 }}
        />
        <Select
          placeholder="角色"
          value={role}
          onChange={value => onRoleChange((value as User['role']) || '')}
          data={[
            { value: '', label: '全部角色' },
            { value: 'admin', label: '管理员' },
            { value: 'user', label: '用户' },
            { value: 'guest', label: '访客' },
          ]}
          clearable
          style={{ width: 150 }}
        />
        <Select
          placeholder="状态"
          value={status}
          onChange={value => onStatusChange((value as User['status']) || '')}
          data={[
            { value: '', label: '全部状态' },
            { value: 'active', label: '在线' },
            { value: 'inactive', label: '离线' },
          ]}
          clearable
          style={{ width: 150 }}
        />
        {hasFilters && (
          <Button
            variant="light"
            color="gray"
            leftSection={<IconX size={16} />}
            onClick={onReset}
          >
            重置
          </Button>
        )}
      </Group>
    </Card>
  )
}
