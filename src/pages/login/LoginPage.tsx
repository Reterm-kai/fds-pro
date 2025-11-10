import { useState } from 'react'
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Container,
  Paper,
  Stack,
  Checkbox,
  Box,
  Flex,
  useMantineColorScheme,
} from '@mantine/core'
import { User, Lock } from 'lucide-react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { useAuth } from '@/features/auth'
import { Logo } from '@/shared/ui/logo'

/**
 * 登录页面组件
 * 参考 Arco Design Pro 设计,支持用户名或邮箱登录
 */
export function LoginPage() {
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { colorScheme } = useMantineColorScheme()

  // 从路由状态获取重定向路径
  const from = location.state?.from?.pathname || '/dashboard'

  // 使用 Mantine 表单验证
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: value =>
        value.trim().length >= 2 ? null : '请输入用户名或邮箱',
      password: value => (value.length >= 6 ? null : '密码至少需要6个字符'),
    },
  })

  const handleSubmit = async (values: {
    username: string
    password: string
  }) => {
    setLoading(true)

    try {
      await login(values.username, values.password, rememberMe)

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

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        background:
          colorScheme === 'dark'
            ? 'linear-gradient(135deg, #1a1b26 0%, #24283b 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* 左侧装饰区域 */}
      <Box
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
          color: 'white',
        }}
        visibleFrom="md"
      >
        <Logo size="lg" withText />
        <Title
          order={1}
          mt="xl"
          mb="md"
          style={{ color: 'white', textAlign: 'center' }}
        >
          企业级中后台解决方案
        </Title>
        <Text
          size="lg"
          style={{
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'center',
            maxWidth: '400px',
          }}
        >
          基于 React 19 + TypeScript + Mantine 构建的现代化前端框架
        </Text>

        {/* 装饰性插图 */}
        <Box
          mt="xl"
          style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}
        >
          <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="50"
              y="50"
              width="300"
              height="200"
              rx="10"
              fill="rgba(255,255,255,0.1)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
            <rect
              x="70"
              y="70"
              width="120"
              height="80"
              rx="5"
              fill="rgba(255,255,255,0.15)"
            />
            <rect
              x="210"
              y="70"
              width="120"
              height="80"
              rx="5"
              fill="rgba(255,255,255,0.15)"
            />
            <rect
              x="70"
              y="170"
              width="260"
              height="60"
              rx="5"
              fill="rgba(255,255,255,0.15)"
            />
            <circle
              cx="200"
              cy="150"
              r="30"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
            />
            <path
              d="M190 150 L200 160 L220 140"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      </Box>

      {/* 右侧登录表单 */}
      <Box
        style={{
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: colorScheme === 'dark' ? '#1a1b26' : 'white',
          padding: '40px',
        }}
      >
        <Container size={420} w="100%">
          <Box mb="xl" hiddenFrom="md" ta="center">
            <Logo size="md" withText />
          </Box>

          <Title order={2} ta="center" mb="sm">
            登录到 Fordoes
          </Title>
          <Text c="dimmed" size="sm" ta="center" mb="xl">
            输入您的账号信息以继续
          </Text>

          <Paper shadow="none" radius="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <TextInput
                  label="用户名或邮箱"
                  placeholder="admin@x.com 或 张三"
                  leftSection={<User size={18} />}
                  size="md"
                  autoComplete="username"
                  {...form.getInputProps('username')}
                />

                <PasswordInput
                  label="密码"
                  placeholder="请输入密码"
                  leftSection={<Lock size={18} />}
                  size="md"
                  autoComplete="current-password"
                  {...form.getInputProps('password')}
                />

                <Flex justify="space-between" align="center">
                  <Checkbox
                    label="记住我"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.currentTarget.checked)}
                  />
                  <Anchor component="button" type="button" size="sm">
                    忘记密码?
                  </Anchor>
                </Flex>

                <Button
                  type="submit"
                  loading={loading}
                  fullWidth
                  size="md"
                  mt="md"
                  style={{
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  登录
                </Button>
              </Stack>
            </form>

            <Text ta="center" mt="xl" size="sm">
              还没有账户?{' '}
              <Anchor component={Link} to="/register" fw={500}>
                立即注册
              </Anchor>
            </Text>
          </Paper>

          {/* 提示信息 */}
          <Paper
            withBorder
            mt="xl"
            p="md"
            bg={colorScheme === 'dark' ? 'dark.7' : 'gray.0'}
          >
            <Text size="xs" c="dimmed" ta="center">
              💡 测试账号: admin@x.com 或 张三 / 密码: 123456
            </Text>
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}

export default LoginPage
