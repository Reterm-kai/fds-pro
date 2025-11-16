import type { ReactNode } from 'react'
import {
  Button,
  Container,
  Group,
  Paper,
  Stepper,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
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
  footer?: ReactNode
}

// 基础结果页布局（成功 / 失败共用）
function BaseResultPage({ status, title, description, footer }: BaseResultPageProps) {
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
      <Container size="lg" className={classes.inner}>
        <Paper withBorder radius="lg" className={classes.card}>
          <Group justify="center" className={classes.header}>
            <ThemeIcon
              radius="xl"
              size="xl"
              variant="light"
              color={color}
              className={classes.icon}
            >
              <Icon size={32} />
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

        {footer}
      </Container>
    </div>
  )
}

export function ResultSuccess() {
  const activeStepIndex = 1

  return (
    <BaseResultPage
      status="success"
      title="提交成功"
      description="表单已成功提交，系统已完成处理。你可以在项目列表或详情页中查看本次操作结果。"
      footer={
        <Paper withBorder radius="md" className={classes.progressCard}>
          <Group justify="space-between" className={classes.progressHeader}>
            <Text className={classes.progressTitle}>当前进度</Text>
            <Text className={classes.progressExtra}>
              提交时间：2024-10-10 14:00:39
            </Text>
          </Group>

          <Stepper
            active={activeStepIndex}
            color="blue"
            size="sm"
            className={classes.stepper}
          >
            <Stepper.Step label="提交申请" description="已完成" />
            <Stepper.Step label="直属领导审核" description="进行中" />
            <Stepper.Step label="购买证书" description="未开始" />
            <Stepper.Step label="安全测试" description="未开始" />
            <Stepper.Step label="正式上线" description="未开始" />
          </Stepper>
        </Paper>
      }
    />
  )
}

export function ResultError() {
  return (
    <BaseResultPage
      status="error"
      title="提交失败"
      description="处理请求时出现问题，请稍后重试或联系管理员。"
    />
  )
}

