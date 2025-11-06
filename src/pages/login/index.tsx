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
} from '@tabler/icons-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { useAuth } from '@/shared/hooks/useAuth'

/**
 * 登录页面组件
 * 提供用户登录功能，包含表单验证和第三方登录选项
 */
export function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  // 从路由状态获取重定向路径
  const from = location.state?.from?.pathname || '/dashboard'

  // 使用 Mantine 表单验证
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: value =>
        /^\S+@\S+\.\S+$/.test(value) ? null : '请输入有效的邮箱地址',
      password: value => (value.length >= 6 ? null : '密码至少需要6个字符'),
    },
  })

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true)

    try {
      await login(values.email, values.password, rememberMe)

      notifications.show({
        title: '登录成功',
        message: '欢迎回来！',
        color: 'green',
      })

      // 导航到之前的页面或默认的仪表盘
      navigate(from, { replace: true })
    } catch {
      // 错误处理已在auth.tsx中完成
    } finally {
      setLoading(false)
    }
  }

  // 模拟第三方登录功能
  const handleSocialLogin = (provider: string) => {
    notifications.show({
      title: '提示',
      message: `正在使用${provider}登录（模拟功能）`,
      color: 'blue',
    })
  }

  return (
    <Container size={420} my={40}>
      <Center>
        <div>
          <Title ta="center" mb="lg">
            欢迎回来
          </Title>
          <Text c="dimmed" size="sm" ta="center" mb="xl">
            请登录您的账户
          </Text>
        </div>
      </Center>

      <Paper withBorder shadow="md" p={30} mt={0} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="邮箱"
              placeholder="请输入您的邮箱"
              leftSection={<IconAt size={16} />}
              autoComplete="username"
              {...form.getInputProps('email')}
            />

            <PasswordInput
              label="密码"
              placeholder="请输入您的密码"
              leftSection={<IconLock size={16} />}
              autoComplete="current-password"
              {...form.getInputProps('password')}
            />

            <Group justify="space-between">
              <Checkbox
                label="记住我"
                checked={rememberMe}
                onChange={e => setRememberMe(e.currentTarget.checked)}
              />
              <Anchor component="button" type="button" size="sm" c="dimmed">
                忘记密码？
              </Anchor>
            </Group>

            <Button type="submit" loading={loading} fullWidth mt="xl">
              登录
            </Button>
          </Stack>
        </form>

        <Divider label="或" labelPosition="center" my="lg" />

        <Group grow>
          <Button
            variant="default"
            leftSection={<IconBrandGoogle />}
            onClick={() => handleSocialLogin('Google')}
          >
            Google
          </Button>
          <Button
            variant="default"
            leftSection={<IconBrandGithub />}
            onClick={() => handleSocialLogin('GitHub')}
          >
            GitHub
          </Button>
        </Group>

        <Text ta="center" mt="md">
          还没有账户？{' '}
          <Anchor<'a'> href="/register" fw={500}>
            立即注册
          </Anchor>
        </Text>
      </Paper>
    </Container>
  )
}

export default LoginPage
