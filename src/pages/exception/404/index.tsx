import { Button, Container, Group, Text, Title } from '@mantine/core'
import { IconHome } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '@/shared/ui'
import classes from '../ExceptionPage.module.css'

export function Exception404Page() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  return (
    <PageContainer size="full">
      <div className={classes.root}>
        <Container size="md" className={classes.inner}>
          <Text component="div" className={classes.code}>
            404
          </Text>

          <Title order={2} className={classes.title}>
            抱歉，您访问的页面不存在
          </Title>

          <Text className={classes.description}>
            可能是您输入了错误的地址，或者页面已被移动或删除。
          </Text>

          <Group justify="center">
            <Button leftSection={<IconHome />} onClick={handleGoHome}>
              返回首页
            </Button>
          </Group>
        </Container>
      </div>
    </PageContainer>
  )
}
