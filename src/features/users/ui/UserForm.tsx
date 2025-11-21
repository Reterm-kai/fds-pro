import { useEffect } from 'react'
import { Modal, TextInput, Select, Button, Group, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import type { User, CreateUserParams } from '@/entities/user'
import { useCreateUser } from '../api/useCreateUser'
import { useUpdateUser } from '../api/useUpdateUser'
import { showErrorNotification, showSuccessNotification } from '@/shared/ui'

interface UserFormProps {
  opened: boolean
  onClose: () => void
  user?: User | null
}

const ROLE_OPTIONS = [
  { value: 'admin', label: '管理员' },
  { value: 'user', label: '用户' },
  { value: 'guest', label: '访客' },
]

/**
 * 用户创建/编辑表单
 */
export function UserForm({ opened, onClose, user }: UserFormProps) {
  const isEditing = Boolean(user)
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      role: 'user' as User['role'],
      password: '',
    },
    validate: {
      name: value => (value.trim().length < 2 ? '姓名至少需要 2 个字符' : null),
      email: value => (/^\S+@\S+$/.test(value) ? null : '邮箱格式不正确'),
      password: value =>
        !isEditing && value.trim().length < 6 ? '密码至少需要 6 个字符' : null,
    },
  })

  useEffect(() => {
    if (user) {
      form.setValues({
        name: user.name,
        email: user.email,
        role: user.role,
        password: '',
      })
    } else {
      form.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (isEditing && user) {
        await updateUser.mutateAsync({
          id: user.id,
          data: { name: values.name, email: values.email, role: values.role },
        })
        showSuccessNotification({
          title: '更新成功',
          message: `用户 ${values.name} 已更新`,
        })
      } else {
        const createData: CreateUserParams = {
          name: values.name,
          email: values.email,
          role: values.role,
          password: values.password,
        }
        await createUser.mutateAsync(createData)
        showSuccessNotification({
          title: '创建成功',
          message: `用户 ${values.name} 已创建`,
        })
      }
      onClose()
      form.reset()
    } catch (error) {
      showErrorNotification({
        title: isEditing ? '更新失败' : '创建失败',
        message: error instanceof Error ? error.message : '操作失败',
      })
    }
  }

  const handleClose = () => {
    onClose()
    form.reset()
  }

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={isEditing ? '编辑用户' : '创建用户'}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="姓名"
            placeholder="请输入用户姓名"
            required
            name="name"
            autoComplete="name"
            {...form.getInputProps('name')}
          />

          <TextInput
            label="邮箱"
            placeholder="user@example.com"
            required
            type="email"
            name="email"
            autoComplete="email"
            {...form.getInputProps('email')}
          />

          <Select
            label="角色"
            placeholder="选择角色"
            required
            name="role"
            data={ROLE_OPTIONS}
            {...form.getInputProps('role')}
          />

          {!isEditing && (
            <TextInput
              label="密码"
              placeholder="请输入密码(至少6位)"
              required
              type="password"
              name="password"
              autoComplete="new-password"
              {...form.getInputProps('password')}
            />
          )}

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={handleClose}>
              取消
            </Button>
            <Button
              type="submit"
              loading={createUser.isPending || updateUser.isPending}
            >
              {isEditing ? '保存' : '创建'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
