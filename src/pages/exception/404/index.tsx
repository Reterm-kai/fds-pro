import { Button, Group, Stack, Text, Title } from '@mantine/core'
import { IconFileOff, IconHome, IconArrowLeft } from '@tabler/icons-react'
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
      <Stack gap="lg" align="center" className={classes.inner}>
        <IconFileOff size={64} stroke={1.5} className={classes.icon} />

        <Text component="div" className={classes.code}>
          404
        </Text>

        <Title order={2} className={classes.title}>
          页面不存在
        </Title>

        <Text className={classes.description}>
          您访问的页面不存在或已被移除
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
