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
  IconAlertCircle,
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

function BaseResultPage({
  status,
  title,
  description,
  footer,
}: BaseResultPageProps) {
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
      description="提交未成功，请核对并修改以下信息后，再重新提交。"
      footer={
        <Paper withBorder radius="md" className={classes.progressCard}>
          <Group justify="space-between" className={classes.progressHeader}>
            <Text className={classes.progressTitle}>失败原因</Text>
            <Text className={classes.progressExtra}>
              错误编号：REQ-20241010-0001
            </Text>
          </Group>

          <Text className={classes.errorIntro}>
            您提交的内容有如下错误：
          </Text>

          <div className={classes.errorList}>
            <Group
              align="flex-start"
              wrap="nowrap"
              className={classes.errorItem}
            >
              <ThemeIcon
                radius="xl"
                size="sm"
                variant="light"
                color="red"
                className={classes.errorItemIcon}
              >
                <IconAlertCircle size={16} />
              </ThemeIcon>

              <div>
                <Text className={classes.errorItemTitle}>
                  您没有此模块的操作权限
                </Text>
                <Text className={classes.errorItemDescription}>
                  请联系管理员为你分配相应权限后，再重新提交。
                </Text>
              </div>
            </Group>

            <Group
              align="flex-start"
              wrap="nowrap"
              className={classes.errorItem}
            >
              <ThemeIcon
                radius="xl"
                size="sm"
                variant="light"
                color="red"
                className={classes.errorItemIcon}
              >
                <IconAlertCircle size={16} />
              </ThemeIcon>

              <div>
                <Text className={classes.errorItemTitle}>
                  当前操作不符合业务审批流
                </Text>
                <Text className={classes.errorItemDescription}>
                  请确认流程配置是否为最新版本，或与业务负责人确认审批路径后再尝试。
                </Text>
              </div>
            </Group>

            <Group
              align="flex-start"
              wrap="nowrap"
              className={classes.errorItem}
            >
              <ThemeIcon
                radius="xl"
                size="sm"
                variant="light"
                color="red"
                className={classes.errorItemIcon}
              >
                <IconAlertCircle size={16} />
              </ThemeIcon>

              <div>
                <Text className={classes.errorItemTitle}>
                  提交内容包含不合法参数
                </Text>
                <Text className={classes.errorItemDescription}>
                  请检查表单字段是否填写完整、格式是否正确（例如手机号、邮箱等），再重新提交。
                </Text>
              </div>
            </Group>
          </div>
        </Paper>
      }
    />
  )
}

