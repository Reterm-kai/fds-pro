import { Button, Group, Stack, Text, Title } from '@mantine/core'
import { IconLock } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import classes from '../ExceptionPage.module.css'

export function Exception403Page() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  return (
    <div className={classes.root}>
      <Stack gap="lg" align="center" className={classes.inner}>
        <IconLock size={64} stroke={1.5} className={classes.icon} />

        <Text component="div" className={classes.code}>
          403
        </Text>

        <Title order={2} className={classes.title}>
          无访问权限
        </Title>

        <Text className={classes.description}>
          您没有权限访问此页面，请联系管理员获取访问权限
        </Text>

        <Group justify="center" mt="md" gap="sm">
          <Button size="md" onClick={handleGoHome}>
            返回首页
          </Button>
        </Group>
      </Stack>
    </div>
  )
}
