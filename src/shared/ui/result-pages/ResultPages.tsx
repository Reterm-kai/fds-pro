import {
  Button,
  Container,
  Group,
  List,
  Paper,
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
  details?: string[]
}

// Base layout for result pages (success / error)
function BaseResultPage({
  status,
  title,
  description,
  details,
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
      <Container size="sm" className={classes.inner}>
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

          {details && details.length > 0 && (
            <List
              spacing="xs"
              size="sm"
              className={classes.list}
              center
              icon={<IconArrowRight size={16} />}
            >
              {details.map(item => (
                <List.Item key={item}>{item}</List.Item>
              ))}
            </List>
          )}

          <Group justify="center" className={classes.actions}>
            {!isSuccess && (
              <Button
                variant="light"
                color={color}
                leftSection={<IconRefresh size={16} />}
                onClick={handleRetry}
              >
                Retry
              </Button>
            )}

            <Button
              variant="outline"
              leftSection={<IconArrowLeft size={16} />}
              onClick={handleGoBack}
            >
              Back
            </Button>

            <Button
              color="blue"
              leftSection={<IconArrowRight size={16} />}
              onClick={handleGoDashboard}
            >
              Go to dashboard
            </Button>
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
      title="Operation succeeded"
      description="The operation has been completed successfully. You can now view the latest data in the corresponding list or dashboard."
      details={[
        'The operation log has been recorded for further audit.',
        'You can go back to the feature page to continue the workflow.',
      ]}
    />
  )
}

export function ResultError() {
  return (
    <BaseResultPage
      status="error"
      title="Operation failed"
      description="An error occurred while processing your request."
      details={[
        'Please check your network connection or try again later.',
        'If the problem persists, contact the system administrator.',
      ]}
    />
  )
}

