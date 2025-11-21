import { Button, Group, Stack, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import classes from '../ExceptionPage.module.css'

export function Exception404Page() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className={classes.root}>
      <Stack gap="md" align="center" className={classes.inner}>
        <Text component="div" className={classes.code}>
          404
        </Text>

        <Text className={classes.title}>页面不存在</Text>

        <Text className={classes.description}>抱歉，您访问的页面不存在</Text>

        <Group gap="sm" mt="sm">
          <Button variant="default" onClick={handleGoBack}>
            返回上页
          </Button>
          <Button onClick={handleGoHome}>返回首页</Button>
        </Group>
      </Stack>
    </div>
  )
}
