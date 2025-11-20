import type { ReactNode } from 'react'
import {
  Button,
  Container,
  Group,
  Stack,
  Stepper,
  Text,
  Title,
} from '@mantine/core'
import {
  IconAlertCircle,
  IconCircleCheck,
  IconCircleX,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import classes from './ResultPage.module.css'

type ResultStatus = 'success' | 'error'

interface BaseResultPageProps {
  status: ResultStatus
  title: string
  description: string
  footer?: ReactNode
}

function BaseResultPage({
  status,
  title,
  description,
  footer,
}: BaseResultPageProps) {
  const navigate = useNavigate()
  const isSuccess = status === 'success'
  const Icon = isSuccess ? IconCircleCheck : IconCircleX

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
        <Stack gap="lg" align="center" className={classes.resultSection}>
          <Icon
            size={72}
            stroke={1.5}
            className={isSuccess ? classes.icon : classes.iconError}
          />

          <Title order={2} className={classes.title}>
            {title}
          </Title>

          <Text className={classes.description}>{description}</Text>

          <Group justify="center" mt="md" gap="sm">
            {isSuccess ? (
              <>
                <Button variant="default" onClick={handleGoBack}>
                  返回上页
                </Button>
                <Button onClick={handleGoDashboard}>返回首页</Button>
              </>
            ) : (
              <>
                <Button variant="default" onClick={handleRetry}>
                  重试
                </Button>
                <Button onClick={handleGoBack}>返回上页</Button>
              </>
            )}
          </Group>
        </Stack>

        {footer}
      </Container>
    </div>
  )
}

export function ResultSuccessPage() {
  const activeStepIndex = 1

  return (
    <BaseResultPage
      status="success"
      title="提交成功"
      description="表单已成功提交，系统已完成处理"
      footer={
        <div className={classes.footerCard}>
          <Group justify="space-between" className={classes.footerHeader}>
            <Text className={classes.footerTitle}>当前进度</Text>
            <Text className={classes.footerExtra}>
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
        </div>
      }
    />
  )
}

export function ResultErrorPage() {
  return (
    <BaseResultPage
      status="error"
      title="提交失败"
      description="请核对以下信息后重新提交"
      footer={
        <div className={classes.footerCard}>
          <Group justify="space-between" className={classes.footerHeader}>
            <Text className={classes.footerTitle}>失败原因</Text>
            <Text className={classes.footerExtra}>
              错误编号：REQ-20241010-0001
            </Text>
          </Group>

          <Text className={classes.errorIntro}>您提交的内容有如下错误：</Text>

          <div className={classes.errorList}>
            <div className={classes.errorItem}>
              <IconAlertCircle
                size={18}
                className={classes.errorItemIcon}
                color="var(--mantine-color-red-6)"
              />
              <div>
                <Text className={classes.errorItemTitle}>
                  您没有此模块的操作权限
                </Text>
                <Text className={classes.errorItemDescription}>
                  请联系管理员为您分配相应权限后再重新提交
                </Text>
              </div>
            </div>

            <div className={classes.errorItem}>
              <IconAlertCircle
                size={18}
                className={classes.errorItemIcon}
                color="var(--mantine-color-red-6)"
              />
              <div>
                <Text className={classes.errorItemTitle}>
                  当前操作不符合业务审批流
                </Text>
                <Text className={classes.errorItemDescription}>
                  请确认流程配置是否为最新版本，或与业务负责人确认审批路径
                </Text>
              </div>
            </div>

            <div className={classes.errorItem}>
              <IconAlertCircle
                size={18}
                className={classes.errorItemIcon}
                color="var(--mantine-color-red-6)"
              />
              <div>
                <Text className={classes.errorItemTitle}>
                  提交内容包含不合法参数
                </Text>
                <Text className={classes.errorItemDescription}>
                  请检查表单字段是否填写完整、格式是否正确
                </Text>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
