import { Button, Container, Title, Text, Stack, Group, Center } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, LogIn } from 'lucide-react'
import { Logo, ThemeToggle } from '@/shared/ui'
import { useAuth } from '@/features/auth'

/**
 * 首页
 * 应用入口页面，提供快速进入仪表盘的入口
 */
export function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl" align="center">
        <Group justify="flex-end" w="100%">
          <ThemeToggle />
        </Group>

        <Center>
          <Logo style={{ width: 200, height: 'auto' }} />
        </Center>

        <Stack gap="md" align="center" ta="center">
          <Title order={1}>欢迎使用 Fordoes Pro</Title>
          <Text size="lg" c="dimmed">
            现代化的企业级中后台管理系统
          </Text>
        </Stack>

        <Stack gap="md" w="100%" maw={300}>
          {user ? (
            <Button
              size="lg"
              leftSection={<LayoutDashboard size={20} />}
              onClick={() => navigate('/dashboard')}
            >
              进入工作台
            </Button>
          ) : (
            <Button
              size="lg"
              leftSection={<LogIn size={20} />}
              onClick={() => navigate('/login')}
            >
              登录系统
            </Button>
          )}
        </Stack>

        {user && (
          <Text size="sm" c="dimmed">
            当前用户：{user.name}
          </Text>
        )}
      </Stack>
    </Container>
  )
}
