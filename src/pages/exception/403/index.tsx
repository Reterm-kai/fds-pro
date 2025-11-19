import { Button, Container, Group, Text, Title } from '@mantine/core'
import { IconHome } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '@/shared/ui'
import classes from '../ExceptionPage.module.css'

export function Exception403Page() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  return (
    <PageContainer size="full">
      <div className={classes.root}>
        <Container size="md" className={classes.inner}>
          <Text component="div" className={classes.code}>
            403
          </Text>

          <Title order={2} className={classes.title}>
            抱歉，您暂无权限访问该页面
          </Title>

          <Text className={classes.description}>
            请检查您的账户权限，或联系管理员为您分配相应的访问权限。
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
