import { Button, Container, Group, Text, Title } from '@mantine/core'
import { IconHome, IconRefresh } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import classes from './ExceptionPages.module.css'

type ExceptionPageVariant = 'home-only' | 'refresh'

interface BaseExceptionPageProps {
  code: string
  title: string
  description: string
  variant: ExceptionPageVariant
}

/**
 * 通用异常页布局组件，参考 Mantine Error pages 设计
 * 用于 403 / 404 / 500 等异常场景
 */
function BaseExceptionPage({
  code,
  title,
  description,
  variant,
}: BaseExceptionPageProps) {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  const handleRefresh = () => {
    // 500 页主操作：刷新当前页面
    // 使用浏览器刷新以确保重新加载所有资源
    window.location.reload()
  }

  return (
    <div className={classes.root}>
      <Container size="md" className={classes.inner}>
        <Text component="div" className={classes.code}>
          {code}
        </Text>

        <Title order={2} className={classes.title}>
          {title}
        </Title>

        <Text className={classes.description}>{description}</Text>

        <Group justify="center">
          {variant === 'refresh' && (
            <Button
              leftSection={<IconRefresh />}
              onClick={handleRefresh}
            >
              刷新页面
            </Button>
          )}

          <Button
            variant={variant === 'refresh' ? 'outline' : 'filled'}
            leftSection={<IconHome />}
            onClick={handleGoHome}
          >
            返回首页
          </Button>
        </Group>
      </Container>
    </div>
  )
}

export function Exception403() {
  return (
    <BaseExceptionPage
      code="403"
      title="抱歉，您暂无权限访问该页面"
      description="请检查您的账户权限，或联系管理员为您分配访问权限。"
      variant="home-only"
    />
  )
}

export function Exception404() {
  return (
    <BaseExceptionPage
      code="404"
      title="抱歉，您访问的页面不存在"
      description="可能是您输入了错误的地址，或者页面已被移动或删除。"
      variant="home-only"
    />
  )
}

export function Exception500() {
  return (
    <BaseExceptionPage
      code="500"
      title="抱歉，服务器出错了"
      description="服务器暂时出现了问题，请尝试刷新页面；如果问题仍然存在，请稍后重试或联系管理员。"
      variant="refresh"
    />
  )
}

