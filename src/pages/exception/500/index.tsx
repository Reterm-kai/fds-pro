import { Button, Group, Stack, Text } from '@mantine/core'
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
      <Stack gap="md" align="center" className={classes.inner}>
        <Text component="div" className={classes.code}>
          500
        </Text>

        <Text className={classes.title}>服务器错误</Text>

        <Text className={classes.description}>
          抱歉，服务器出现问题，请稍后重试
        </Text>

        <Group gap="sm" mt="sm">
          <Button variant="default" onClick={handleRefresh}>
            刷新页面
          </Button>
          <Button onClick={handleGoHome}>返回首页</Button>
        </Group>
      </Stack>
    </div>
  )
}
