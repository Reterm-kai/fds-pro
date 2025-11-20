import { Button, Stack, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import classes from '../ExceptionPage.module.css'

export function Exception403Page() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  return (
    <div className={classes.root}>
      <Stack gap="md" align="center" className={classes.inner}>
        <Text component="div" className={classes.code}>
          403
        </Text>

        <Text className={classes.title}>无访问权限</Text>

        <Text className={classes.description}>
          抱歉，您没有权限访问此页面
        </Text>

        <Button variant="default" onClick={handleGoHome} mt="sm">
          返回首页
        </Button>
      </Stack>
    </div>
  )
}
