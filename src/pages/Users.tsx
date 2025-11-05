import { Title, Text, Table, Badge, Avatar, Group } from '@mantine/core'

/**
 * 用户管理页面
 * 展示用户列表和管理功能
 */
export function Users() {
  const users = [
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      role: '管理员',
      status: 'active',
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      role: '用户',
      status: 'active',
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      role: '用户',
      status: 'inactive',
    },
    {
      id: 4,
      name: '赵六',
      email: 'zhaoliu@example.com',
      role: '编辑',
      status: 'active',
    },
  ]

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
      <Table.Td>{user.role}</Table.Td>
      <Table.Td>
        <Badge color={user.status === 'active' ? 'green' : 'gray'}>
          {user.status === 'active' ? '在线' : '离线'}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <div>
      <Title order={2} mb="xl">
        用户管理
      </Title>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>用户</Table.Th>
            <Table.Th>邮箱</Table.Th>
            <Table.Th>角色</Table.Th>
            <Table.Th>状态</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  )
}
