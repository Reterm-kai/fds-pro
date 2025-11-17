import { useState } from 'react'
import {
  Button,
  Grid,
  Group,
  Paper,
  Stack,
  Stepper,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconFileDescription,
  IconSettings,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { showSuccessNotification } from '@/shared/ui'
import classes from './FormStep.module.css'

interface StepFormValues {
  name: string
  email: string
  description: string
  env: string
  repoUrl: string
  branch: string
  remark: string
}

export function FormStepPage() {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<StepFormValues>({
    initialValues: {
      name: '',
      email: '',
      description: '',
      env: '',
      repoUrl: '',
      branch: 'main',
      remark: '',
    },
    validate: {
      name: value => (value.trim().length >= 2 ? null : '请输入申请人姓名'),
      email: value =>
        /^\S+@\S+$/.test(value) ? null : '请输入有效的邮箱地址',
      env: value => (value ? null : '请选择目标环境'),
      repoUrl: value =>
        value.trim().length > 0 ? null : '请输入代码仓库地址',
    },
  })

  const nextStep = () => {
    if (active === 0) {
      const nameError = form.validateField('name')
      const emailError = form.validateField('email')
      if (nameError || emailError) return
    }

    if (active === 1) {
      const validation = form.validate()
      if (validation.hasErrors) return
    }

    setActive(current => Math.min(current + 1, 2))
  }

  const prevStep = () => {
    setActive(current => Math.max(current - 1, 0))
  }

  const handleSubmit = () => {
    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      showSuccessNotification({
        title: '提交成功',
        message: '发布申请已提交，将通知相关负责人进行审核',
      })
      setActive(2)
    }, 600)
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <Group justify="space-between" className={classes.header}>
          <div className={classes.headerTitle}>
            <Title order={1}>分步表单</Title>
            <Text size="sm" c="dimmed">
              使用分步表单将复杂流程拆解为多个阶段，引导用户按步骤完成填写，
              降低单屏信息密度，提升可用性。
            </Text>
          </div>

          <Group gap="xs">
            <Button
              variant="default"
              leftSection={<IconArrowLeft size={16} />}
              onClick={handleBack}
            >
              返回
            </Button>
          </Group>
        </Group>

        <Paper withBorder radius="md" p="xl">
          <div className={classes.stepperWrapper}>
            <Stepper active={active} onStepClick={setActive} size="sm">
              <Stepper.Step
                label="基础信息"
                description="填写申请人信息"
              />
              <Stepper.Step label="发布配置" description="确认发布参数" />
              <Stepper.Completed>完成</Stepper.Completed>
            </Stepper>
          </div>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            {active === 0 && (
              <Grid gutter="lg">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="申请人姓名"
                    placeholder="请输入姓名"
                    required
                    name="name"
                    autoComplete="name"
                    {...form.getInputProps('name')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="联系邮箱"
                    placeholder="name@example.com"
                    required
                    name="email"
                    autoComplete="email"
                    {...form.getInputProps('email')}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Textarea
                    label="需求描述"
                    placeholder="简要说明本次发布的背景和变更内容"
                    minRows={3}
                    autosize
                    name="description"
                    {...form.getInputProps('description')}
                  />
                </Grid.Col>
              </Grid>
            )}

            {active === 1 && (
              <Stack gap="lg">
                <Paper radius="md" withBorder p="lg">
                  <Group gap="xs" mb="md">
                    <IconSettings size={18} />
                    <Text fw={500}>发布配置</Text>
                  </Group>
                  <Grid gutter="lg">
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="目标环境"
                        placeholder="如：测试环境 / 预发布环境 / 生产环境"
                        required
                        name="env"
                        {...form.getInputProps('env')}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="代码仓库地址"
                        placeholder="https://github.com/your-org/your-repo"
                        required
                        name="repoUrl"
                        autoComplete="url"
                        {...form.getInputProps('repoUrl')}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="分支"
                        placeholder="main"
                        name="branch"
                        {...form.getInputProps('branch')}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Textarea
                        label="备注信息"
                        placeholder="可选，补充说明特殊注意事项"
                        minRows={3}
                        autosize
                        name="remark"
                        {...form.getInputProps('remark')}
                      />
                    </Grid.Col>
                  </Grid>
                </Paper>

                <Paper radius="md" withBorder p="lg">
                  <Group gap="xs" mb="md">
                    <IconFileDescription size={18} />
                    <Text fw={500}>提交前检查</Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    请确认代码已经完成自测，相关人员已知晓本次发布计划，并在非业务高峰期进行操作。
                  </Text>
                </Paper>
              </Stack>
            )}

            {active === 2 && (
              <Stack align="center" gap="sm">
                <IconCheck size={32} color="var(--mantine-color-green-6)" />
                <Text fw={500}>发布申请已提交</Text>
                <Text size="sm" c="dimmed">
                  你可以在基础详情页或结果页中查看审批进度和最终结果。
                </Text>
              </Stack>
            )}

            <Group justify="space-between" mt="xl">
              <Button
                variant="default"
                leftSection={<IconArrowLeft size={16} />}
                onClick={prevStep}
                disabled={active === 0}
              >
                上一步
              </Button>

              {active < 2 && (
                <Button
                  type={active === 1 ? 'submit' : 'button'}
                  onClick={active === 1 ? undefined : nextStep}
                  rightSection={
                    active === 1 ? (
                      <IconCheck size={16} />
                    ) : (
                      <IconArrowRight size={16} />
                    )
                  }
                  loading={active === 1 && submitting}
                  color="blue"
                >
                  {active === 1 ? '提交' : '下一步'}
                </Button>
              )}
            </Group>
          </form>
        </Paper>
      </div>
    </div>
  )
}

