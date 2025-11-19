import { Button, Container, Group, Text, Title } from '@mantine/core'
import { IconHome, IconRefresh } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '@/shared/ui'
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
    <PageContainer size="full">
      <div className={classes.root}>
        <Container size="md" className={classes.inner}>
          <Text component="div" className={classes.code}>
            500
          </Text>

          <Title order={2} className={classes.title}>
            抱歉，服务器出错了
          </Title>

          <Text className={classes.description}>
            服务器暂时出现了问题，请尝试刷新页面；如果问题仍然存在，请稍后重试或联系管理员。
          </Text>

          <Group justify="center">
            <Button leftSection={<IconRefresh />} onClick={handleRefresh}>
              刷新页面
            </Button>

            <Button
              variant="outline"
              leftSection={<IconHome />}
              onClick={handleGoHome}
            >
              返回首页
            </Button>
          </Group>
        </Container>
      </div>
    </PageContainer>
  )
}
