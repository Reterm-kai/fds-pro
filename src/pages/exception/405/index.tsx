import { Button, Group, Stack, Text, Title } from '@mantine/core'
import { IconHandStop, IconHome, IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import classes from '../ExceptionPage.module.css'

export function Exception405Page() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className={classes.root}>
      <Stack gap="lg" align="center" className={classes.inner}>
        <IconHandStop size={64} stroke={1.5} className={classes.icon} />

        <Text component="div" className={classes.code}>
          405
        </Text>

        <Title order={2} className={classes.title}>
          方法不允许
        </Title>

        <Text className={classes.description}>
          请求的方法不被允许，请检查您的操作方式
        </Text>

        <Group justify="center" mt="md">
          <Button
            variant="default"
            leftSection={<IconArrowLeft size={18} />}
            onClick={handleGoBack}
          >
            返回上页
          </Button>
          <Button leftSection={<IconHome size={18} />} onClick={handleGoHome}>
            返回首页
          </Button>
        </Group>
      </Stack>
    </div>
  )
}
