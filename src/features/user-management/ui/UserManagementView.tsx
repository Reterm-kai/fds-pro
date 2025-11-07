import {useState} from 'react'
import {
    Title,
    Text,
    Table,
    Badge,
    Avatar,
    Group,
    Alert,
    Pagination,
    Card,
    Stack,
    TextInput,
    Select,
    Button,
    Skeleton,
    ActionIcon,
    Tooltip,
} from '@mantine/core'
import {
    IconAlertCircle,
    IconSearch,
    IconX,
    IconPlus,
    IconEdit,
    IconTrash,
} from '@tabler/icons-react'
import {modals} from '@mantine/modals'
import {notifications} from '@mantine/notifications'
import type {User} from '@/entities/user'
import {
    useUserList,
    useDeleteUser,
} from '@/features/user-management/api/useUsers'
import {UserForm} from './UserForm'

/**
 * 用户管理主视图
 * 负责拉取数据、处理筛选和增删改交互
 */
export function UserManagementView() {
    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState('')
    const [role, setRole] = useState<User['role'] | ''>('')
    const [status, setStatus] = useState<User['status'] | ''>('')
    const [formOpened, setFormOpened] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const pageSize = 10

    const {data, isLoading, isError, error} = useUserList({
        page,
        pageSize,
        ...(keyword && {keyword}),
        ...(role && {role}),
        ...(status && {status}),
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
            labels: {confirm: '确认删除', cancel: '取消'},
            confirmProps: {color: 'red'},
            onConfirm: async () => {
                try {
                    await deleteUser.mutateAsync(user.id)
                    notifications.show({
                        title: '删除成功',
                        message: `用户 ${user.name} 已删除`,
                        color: 'green',
                    })
                } catch (deleteError) {
                    notifications.show({
                        title: '删除失败',
                        message:
                            deleteError instanceof Error ? deleteError.message : '操作失败',
                        color: 'red',
                    })
                }
            },
        })
    }

    const hasFilters = keyword || role || status

    const renderSkeleton = () => (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
                {Array.from({length: 5}).map((_, index) => (
                    <Group key={index} gap="md">
                        <Skeleton height={40} circle/>
                        <Skeleton height={20} width="30%"/>
                        <Skeleton height={20} width="40%"/>
                        <Skeleton height={20} width="15%"/>
                        <Skeleton height={20} width="10%"/>
                    </Group>
                ))}
            </Stack>
        </Card>
    )

    if (isError) {
        return (
            <Alert
                icon={<IconAlertCircle size={16}/>}
                title="加载失败"
                color="red"
                variant="light"
            >
                {error.message ? error.message : '无法加载用户列表'}
            </Alert>
        )
    }

    const rows = data?.list.map(user => (
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
                            onClick={() => handleEdit(user)}
                        >
                            <IconEdit size={16}/>
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="删除">
                        <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => handleDelete(user)}
                        >
                            <IconTrash size={16}/>
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Table.Td>
        </Table.Tr>
    ))

    const totalPages = data ? Math.ceil(data.total / pageSize) : 0

    return (
        <Stack gap="md">
            <Group justify="space-between" align="center">
                <Title order={2}>用户管理</Title>
                <Button leftSection={<IconPlus size={16}/>} onClick={handleCreate}>
                    创建用户
                </Button>
            </Group>

            <Card shadow="sm" padding="md" radius="md" withBorder>
                <Group gap="md">
                    <TextInput
                        placeholder="搜索用户名或邮箱"
                        leftSection={<IconSearch size={16}/>}
                        value={keyword}
                        onChange={event => {
                            setKeyword(event.target.value)
                            setPage(1)
                        }}
                        style={{flex: 1}}
                    />
                    <Select
                        placeholder="角色"
                        value={role}
                        onChange={value => {
                            setRole((value as User['role']) || '')
                            setPage(1)
                        }}
                        data={[
                            {value: '', label: '全部角色'},
                            {value: 'admin', label: '管理员'},
                            {value: 'user', label: '用户'},
                            {value: 'guest', label: '访客'},
                        ]}
                        clearable
                        style={{width: 150}}
                    />
                    <Select
                        placeholder="状态"
                        value={status}
                        onChange={value => {
                            setStatus((value as User['status']) || '')
                            setPage(1)
                        }}
                        data={[
                            {value: '', label: '全部状态'},
                            {value: 'active', label: '在线'},
                            {value: 'inactive', label: '离线'},
                        ]}
                        clearable
                        style={{width: 150}}
                    />
                    {hasFilters && (
                        <Button
                            variant="light"
                            color="gray"
                            leftSection={<IconX size={16}/>}
                            onClick={handleReset}
                        >
                            重置
                        </Button>
                    )}
                </Group>
            </Card>

            {isLoading ? (
                renderSkeleton()
            ) : (
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
                                共 {data?.total} 条记录,第 {page} / {totalPages} 页
                            </Text>
                            <Pagination value={page} onChange={setPage} total={totalPages}/>
                        </Group>
                    )}
                </Card>
            )}

            <UserForm
                opened={formOpened}
                onClose={() => setFormOpened(false)}
                user={editingUser}
            />
        </Stack>
    )
}
