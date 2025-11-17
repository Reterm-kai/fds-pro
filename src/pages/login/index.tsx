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
} from '@mantine/core'
import { User, Lock } from 'lucide-react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useForm } from '@mantine/form'
import { useAuth } from '@/features/auth'
import { Logo, showSuccessNotification } from '@/shared/ui'
import classes from './Login.module.css'

/**
 * 登录页面
 * 参考 Arco Design Pro 设计，支持用户名或邮箱登录
 */
export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

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
      password: value =>
        value.length >= 6 ? null : '密码至少需要 6 个字符',
    },
  })

  const handleSubmit = async (values: { username: string; password: string }) => {
    setLoading(true)

    try {
      await login(values.username, values.password, rememberMe)

      showSuccessNotification({
        title: '登录成功',
        message: '欢迎回来',
      })

      // 导航到之前的页面或默认的仪表盘
      navigate(from, { replace: true })
    } catch {
      // 错误处理已在 auth 模块中完成
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex className={classes.container}>
      {/* 泡泡动画背景 */}
      <Box className={classes.bubbles}>
        <Box className={classes.bubble} />
        <Box className={classes.bubble} />
        <Box className={classes.bubble} />
        <Box className={classes.bubble} />
        <Box className={classes.bubble} />
        <Box className={classes.bubble} />
        <Box className={classes.bubble} />
        <Box className={classes.bubble} />
      </Box>

      {/* 左侧装饰区域 */}
      <Flex className={classes.leftSection}>
        {/* Logo */}
        <Box className={classes.logoWrapper}>
          <Logo className={classes.logo} />
        </Box>

        <Title className={classes.mainTitle}>企业级中后台解决方案</Title>
        <Text className={classes.subtitle}>
          开箱即用的高质量模板，助力团队提升开发效率。
        </Text>

        {/* 现代化装饰性插画 */}
        <Box className={classes.illustration}>
          <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* 主渐变 */}
              <linearGradient id="mainGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
              </linearGradient>
              {/* 光晕效果 */}
              <radialGradient id="glowGradient">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </radialGradient>
            </defs>

            {/* 背景大圆 - 创建层次感 */}
            <circle
              cx="200"
              cy="150"
              r="140"
              fill="url(#glowGradient)"
              opacity="0.3"
            />

            {/* 主要卡片 1 - 浮动效果 */}
            <rect
              x="100"
              y="80"
              width="180"
              height="100"
              rx="16"
              fill="url(#mainGradient)"
              className={classes.floatingCard1}
            />

            {/* 主要卡片 2 - 浮动效果 */}
            <rect
              x="130"
              y="120"
              width="180"
              height="100"
              rx="16"
              fill="url(#mainGradient)"
              className={classes.floatingCard2}
            />

            {/* 装饰小圆点 */}
            <circle cx="120" cy="100" r="6" fill="rgba(255,255,255,0.5)" />
            <circle cx="280" cy="140" r="8" fill="rgba(255,255,255,0.4)" />
            <circle cx="150" cy="200" r="5" fill="rgba(255,255,255,0.6)" />
            <circle cx="300" cy="180" r="7" fill="rgba(255,255,255,0.3)" />

            {/* 装饰线条 - 数据可视化风格 */}
            <path
              d="M 120 130 Q 160 110, 200 130 T 280 140"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              fill="none"
              className={classes.animatedPath}
            />
          </svg>
        </Box>
      </Flex>

      {/* 右侧登录表单 */}
      <Flex className={classes.rightSection}>
        <Container size={420} w="100%">
          <Box className={classes.mobileLogo}>
            <Logo style={{ width: 120, height: 'auto' }} />
          </Box>

          <Title className={classes.formTitle}>登录 Fordoes</Title>
          <Text className={classes.formDescription}>
            使用账号登录 Fordoes 管理后台
          </Text>

          <Paper className={classes.formContainer}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="lg">
                <TextInput
                  label="用户名 / 邮箱"
                  placeholder="admin 或 admin@x.com"
                  leftSection={<User size={18} />}
                  size="md"
                  id="login-username"
                  name="username"
                  autoComplete="username"
                  {...form.getInputProps('username')}
                />

                <PasswordInput
                  label="密码"
                  placeholder="请输入密码"
                  leftSection={<Lock size={18} />}
                  size="md"
                  id="login-password"
                  name="password"
                  autoComplete="current-password"
                  {...form.getInputProps('password')}
                />

                <Flex className={classes.rememberRow}>
                  <Checkbox
                    label="记住密码"
                    id="login-remember-me"
                    name="remember-me"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.currentTarget.checked)}
                  />
                  <Anchor component="button" type="button" size="sm">
                    忘记密码
                  </Anchor>
                </Flex>

                <Button
                  type="submit"
                  loading={loading}
                  fullWidth
                  size="md"
                  className={classes.submitButton}
                >
                  登录
                </Button>

                <Text className={classes.registerLink}>
                  还没有账户？{' '}
                  <Anchor component={Link} to="/register" fw={500}>
                    注册账号
                  </Anchor>
                </Text>
              </Stack>
            </form>
          </Paper>

          {/* 提示信息 */}
          <Paper className={classes.hintCard}>
            <Text className={classes.hintText}>
              💡 测试账号：admin / admin@x.com，密码：123456
            </Text>
          </Paper>
        </Container>
      </Flex>
    </Flex>
  )
}
