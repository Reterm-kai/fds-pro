import { Button, Container, Group, Paper, Text, ThemeIcon, Title } from '@mantine/core'
import {
  IconArrowLeft,
  IconArrowRight,
  IconCircleCheck,
  IconCircleX,
  IconRefresh,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import classes from './ResultPages.module.css'

type ResultStatus = 'success' | 'error'

interface BaseResultPageProps {
  status: ResultStatus
  title: string
  description: string
}

// 基础结果页布局（成功 / 失败共用）
function BaseResultPage({ status, title, description }: BaseResultPageProps) {
  const navigate = useNavigate()
  const isSuccess = status === 'success'
  const Icon = isSuccess ? IconCircleCheck : IconCircleX
  const color = isSuccess ? 'teal' : 'red'

  const handleGoDashboard = () => {
    navigate('/dashboard')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className={classes.root}>
      <Container size="md" className={classes.inner}>
        <Paper withBorder radius="lg" className={classes.card}>
          <Group justify="center" className={classes.header}>
            <ThemeIcon
              radius="xl"
              size="xl"
              variant="light"
              color={color}
              className={classes.icon}
            >
              <Icon size={28} />
            </ThemeIcon>
          </Group>

          <Title order={2} className={classes.title}>
            {title}
          </Title>

          <Text className={classes.description}>{description}</Text>

          <Group justify="center" className={classes.actions}>
            {isSuccess ? (
              <>
                <Button
                  color="blue"
                  leftSection={<IconArrowRight size={16} />}
                  onClick={handleGoDashboard}
                >
                  返回列表
                </Button>

                <Button
                  variant="subtle"
                  leftSection={<IconArrowLeft size={16} />}
                  onClick={handleGoBack}
                >
                  返回上一页
                </Button>
              </>
            ) : (
              <>
                <Button
                  color={color}
                  leftSection={<IconRefresh size={16} />}
                  onClick={handleRetry}
                >
                  重试
                </Button>

                <Button
                  variant="subtle"
                  leftSection={<IconArrowLeft size={16} />}
                  onClick={handleGoBack}
                >
                  返回上一页
                </Button>
              </>
            )}
          </Group>
        </Paper>
      </Container>
    </div>
  )
}

export function ResultSuccess() {
  return (
    <BaseResultPage
      status="success"
      title="提交成功"
      description="表单已成功提交，可以在列表或详情中查看结果。"
    />
  )
}

export function ResultError() {
  return (
    <BaseResultPage
      status="error"
      title="提交失败"
      description="处理请求时出现问题，请重试或联系管理员。"
    />
  )
}

