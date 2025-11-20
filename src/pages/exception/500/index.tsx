import { Button, Group, Stack, Text, Title } from '@mantine/core'
import { IconServerOff, IconHome, IconRefresh } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import classes from '../ExceptionPage.module.css'

export function Exception500Page() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className={classes.root}>
      <Stack gap="lg" align="center" className={classes.inner}>
        <IconServerOff size={64} stroke={1.5} className={classes.icon} />

        <Text component="div" className={classes.code}>
          500
        </Text>

        <Title order={2} className={classes.title}>
          服务器错误
        </Title>

        <Text className={classes.description}>
          服务器出现问题，请稍后重试或联系管理员
        </Text>

        <Group justify="center" mt="md">
          <Button
            variant="default"
            leftSection={<IconRefresh size={18} />}
            onClick={handleRefresh}
          >
            刷新页面
          </Button>
          <Button leftSection={<IconHome size={18} />} onClick={handleGoHome}>
            返回首页
          </Button>
        </Group>
      </Stack>
    </div>
  )
}
