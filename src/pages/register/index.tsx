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
  Divider,
  Box,
  Flex,
  Group,
} from '@mantine/core'
import { Mail, Lock, User, Github } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from '@mantine/form'
import { useAuth } from '@/features/auth'
import {
  Logo,
  showInfoNotification,
  showSuccessNotification,
} from '@/shared/ui'
import classes from './Register.module.css'

/**
 * 注册页面
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
      name: value =>
        value.trim().length >= 2 ? null : '姓名至少需要 2 个字符',
      email: value =>
        /^\S+@\S+\.\S+$/.test(value) ? null : '请输入有效的邮箱地址',
      password: value => (value.length >= 6 ? null : '密码至少需要 6 个字符'),
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

      showSuccessNotification({
        title: '注册成功',
        message: '账户创建成功，请登录',
      })

      // 注册成功后跳转到登录页面
      navigate('/login')
    } catch {
      // 错误处理已在 auth 模块中完成
    } finally {
      setLoading(false)
    }
  }

  // 模拟第三方注册功能
  const handleSocialRegister = (provider: string) => {
    showInfoNotification({
      title: '提示',
      message: `正在使用 ${provider} 注册（模拟功能）`,
    })
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

        <Title className={classes.mainTitle}>开启您的开发之旅</Title>
        <Text className={classes.subtitle}>
          现代化的企业级中后台解决方案，助力团队高效协作。
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
              <linearGradient id="regMainGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
              </linearGradient>
              {/* 光晕效果 */}
              <radialGradient id="regGlowGradient">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </radialGradient>
            </defs>

            {/* 背景大圆 */}
            <circle
              cx="200"
              cy="150"
              r="140"
              fill="url(#regGlowGradient)"
              opacity="0.3"
            />

            {/* 主要卡片 1 */}
            <rect
              x="100"
              y="80"
              width="180"
              height="100"
              rx="16"
              fill="url(#regMainGradient)"
              className={classes.floatingCard1}
            />

            {/* 主要卡片 2 */}
            <rect
              x="130"
              y="120"
              width="180"
              height="100"
              rx="16"
              fill="url(#regMainGradient)"
              className={classes.floatingCard2}
            />

            {/* 装饰小圆点 */}
            <circle cx="120" cy="100" r="6" fill="rgba(255,255,255,0.5)" />
            <circle cx="280" cy="140" r="8" fill="rgba(255,255,255,0.4)" />
            <circle cx="150" cy="200" r="5" fill="rgba(255,255,255,0.6)" />
            <circle cx="300" cy="180" r="7" fill="rgba(255,255,255,0.3)" />

            {/* 装饰线条 */}
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

      {/* 右侧注册表单 */}
      <Flex className={classes.rightSection}>
        <Container size={420} w="100%">
          <Box className={classes.mobileLogo}>
            <Logo style={{ width: 120, height: 'auto' }} />
          </Box>

          <Title className={classes.formTitle}>注册 Fordoes</Title>
          <Text className={classes.formDescription}>
            创建一个新账户以体验完整功能
          </Text>

          <Paper className={classes.formContainer}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="lg">
                <TextInput
                  label="姓名"
                  placeholder="请输入您的姓名"
                  leftSection={<User size={18} />}
                  size="md"
                  id="register-name"
                  name="name"
                  autoComplete="name"
                  {...form.getInputProps('name')}
                />

                <TextInput
                  label="邮箱"
                  placeholder="请输入您的邮箱"
                  leftSection={<Mail size={18} />}
                  type="email"
                  size="md"
                  id="register-email"
                  name="email"
                  autoComplete="email"
                  {...form.getInputProps('email')}
                />

                <PasswordInput
                  label="密码"
                  placeholder="请输入您的密码"
                  leftSection={<Lock size={18} />}
                  size="md"
                  id="register-password"
                  name="password"
                  autoComplete="new-password"
                  {...form.getInputProps('password')}
                />

                <PasswordInput
                  label="确认密码"
                  placeholder="请再次输入密码"
                  leftSection={<Lock size={18} />}
                  size="md"
                  id="register-confirm-password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  {...form.getInputProps('confirmPassword')}
                />

                <Checkbox
                  label="我同意用户条款和服务协议"
                  id="register-agree-terms"
                  name="agreeTerms"
                  {...form.getInputProps('agreeTerms', { type: 'checkbox' })}
                />

                <Button
                  type="submit"
                  loading={loading}
                  fullWidth
                  size="md"
                  className={classes.submitButton}
                >
                  注册
                </Button>

                <Text className={classes.loginLink}>
                  已有账户？{' '}
                  <Anchor component={Link} to="/login" fw={500}>
                    立即登录
                  </Anchor>
                </Text>
              </Stack>
            </form>

            <Divider
              label="或使用第三方账号注册"
              labelPosition="center"
              className={classes.divider}
            />

            <Group grow className={classes.socialButtons}>
              <Button
                variant="default"
                leftSection={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" x2="9.01" y1="9" y2="9" />
                    <line x1="15" x2="15.01" y1="9" y2="9" />
                  </svg>
                }
                onClick={() => handleSocialRegister('Google')}
              >
                Google
              </Button>
              <Button
                variant="default"
                leftSection={<Github size={16} />}
                onClick={() => handleSocialRegister('GitHub')}
              >
                GitHub
              </Button>
            </Group>
          </Paper>
        </Container>
      </Flex>
    </Flex>
  )
}

export default RegisterPage
