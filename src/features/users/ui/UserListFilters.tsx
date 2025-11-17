import { Card, Group, TextInput, Select, Button } from '@mantine/core'
import { Search, X } from 'lucide-react'
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
          leftSection={<Search size={16} />}
          value={keyword}
          onChange={event => onKeywordChange(event.target.value)}
          flex={1}
          name="user-search"
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
          w={{ base: '100%', sm: '9.375rem' }}
          miw="7.5rem"
          name="role-filter"
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
          w={{ base: '100%', sm: '9.375rem' }}
          miw="7.5rem"
          name="status-filter"
        />
        {hasFilters && (
          <Button
            variant="light"
            color="gray"
            leftSection={<X size={16} />}
            onClick={onReset}
          >
            重置
          </Button>
        )}
      </Group>
    </Card>
  )
}
