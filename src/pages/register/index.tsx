import { useState } from 'react'
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Title,
  Text,
  Anchor,
  Container,
  Paper,
  Stack,
  Checkbox,
  Divider,
  Center,
} from '@mantine/core'
import {
  IconBrandGoogle,
  IconBrandGithub,
  IconAt,
  IconLock,
  IconUser,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { useAuth } from '@/shared/hooks/useAuth'

/**
 * 注册页面组件
 * 提供用户注册功能，包含表单验证和第三方注册选项
 */
export function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  // 使用 Mantine 表单验证
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
    validate: {
      name: value => (value.length >= 2 ? null : '姓名至少需要2个字符'),
      email: value =>
        /^\S+@\S+\.\S+$/.test(value) ? null : '请输入有效的邮箱地址',
      password: value => (value.length >= 6 ? null : '密码至少需要6个字符'),
      confirmPassword: (value, values) =>
        value === values.password ? null : '两次输入的密码不一致',
      agreeTerms: value => (value ? null : '请同意用户条款和服务协议'),
    },
  })

  const handleSubmit = async (values: {
    name: string
    email: string
    password: string
    agreeTerms: boolean
  }) => {
    setLoading(true)

    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      })

      notifications.show({
        title: '注册成功',
        message: '账户创建成功，请登录',
        color: 'green',
      })

      // 注册成功后跳转到登录页面
      navigate('/login')
    } catch {
      // 错误处理已在auth.tsx中完成
    } finally {
      setLoading(false)
    }
  }

  // 模拟第三方注册功能
  const handleSocialRegister = (provider: string) => {
    notifications.show({
      title: '提示',
      message: `正在使用${provider}注册（模拟功能）`,
      color: 'blue',
    })
  }

  return (
    <Container size={420} my={40}>
      <Center>
        <div>
          <Title ta="center" mb="lg">
            创建账户
          </Title>
          <Text c="dimmed" size="sm" ta="center" mb="xl">
            请填写以下信息开始使用
          </Text>
        </div>
      </Center>

      <Paper withBorder shadow="md" p={30} mt={0} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="姓名"
              placeholder="请输入您的姓名"
              leftSection={<IconUser size={16} />}
              {...form.getInputProps('name')}
            />

            <TextInput
              label="邮箱"
              placeholder="请输入您的邮箱"
              leftSection={<IconAt size={16} />}
              type="email"
              {...form.getInputProps('email')}
            />

            <PasswordInput
              label="密码"
              placeholder="请输入您的密码"
              leftSection={<IconLock size={16} />}
              {...form.getInputProps('password')}
            />

            <PasswordInput
              label="确认密码"
              placeholder="请再次输入密码"
              leftSection={<IconLock size={16} />}
              {...form.getInputProps('confirmPassword')}
            />

            <Checkbox
              label="我同意用户条款和服务协议"
              {...form.getInputProps('agreeTerms', { type: 'checkbox' })}
            />

            <Button type="submit" loading={loading} fullWidth mt="xl">
              注册
            </Button>
          </Stack>
        </form>

        <Divider label="或" labelPosition="center" my="lg" />

        <Group grow>
          <Button
            variant="default"
            leftSection={<IconBrandGoogle />}
            onClick={() => handleSocialRegister('Google')}
          >
            Google
          </Button>
          <Button
            variant="default"
            leftSection={<IconBrandGithub />}
            onClick={() => handleSocialRegister('GitHub')}
          >
            GitHub
          </Button>
        </Group>

        <Text ta="center" mt="md">
          已有账户？{' '}
          <Anchor<'a'> href="/login" fw={500}>
            立即登录
          </Anchor>
        </Text>
      </Paper>
    </Container>
  )
}

export default RegisterPage
