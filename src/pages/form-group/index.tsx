import { useState } from 'react'
import {
  Badge,
  Button,
  Grid,
  Group,
  Paper,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconSend,
  IconSettings,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import {
  showInfoNotification,
  showSuccessNotification,
} from '@/shared/ui'
import classes from './FormGroup.module.css'

interface GroupFormValues {
  projectName: string
  projectType: string
  owner: string
  department: string
  visibility: 'private' | 'internal' | 'public'
  enableAudit: boolean
  enableNotification: boolean
  notifyEmail: string
  notifyWebhook: string
  description: string
}

export function FormGroupPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<GroupFormValues>({
    initialValues: {
      projectName: '',
      projectType: '',
      owner: '',
      department: '',
      visibility: 'internal',
      enableAudit: true,
      enableNotification: true,
      notifyEmail: '',
      notifyWebhook: '',
      description: '',
    },
    validate: {
      projectName: value =>
        value.trim().length >= 2 ? null : '请输入至少 2 个字符的项目名称',
      projectType: value => (value ? null : '请选择项目类型'),
      owner: value => (value ? null : '请输入负责人'),
      notifyEmail: (value, values) =>
        values.enableNotification && !value.trim()
          ? '启用通知时需要填写邮箱'
          : null,
    },
  })

  const handleSubmit = (values: GroupFormValues) => {
    setSubmitting(true)

    window.setTimeout(() => {
      setSubmitting(false)
      showSuccessNotification({
        title: '提交成功',
        message: `项目「${values.projectName || '新项目'}」已创建`,
      })
    }, 600)
  }

  const handleSaveDraft = () => {
    showInfoNotification({
      title: '已保存草稿',
      message: '当前表单内容已临时保存在浏览器内存',
    })
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <Group justify="space-between" className={classes.header}>
          <div className={classes.headerTitle}>
            <Group gap="xs">
              <Title order={1}>分组表单</Title>
              <Badge color="blue" variant="light">
                新建项目
              </Badge>
            </Group>
            <Text size="sm" c="dimmed">
              通过表单分组的方式，将基础信息、权限配置、通知设置等内容分区管理，
              方便快速浏览和维护。
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
            <Button
              variant="outline"
              leftSection={<IconDeviceFloppy size={16} />}
              onClick={handleSaveDraft}
            >
              保存草稿
            </Button>
            <Button
              color="blue"
              type="submit"
              form="group-form"
              leftSection={<IconSend size={16} />}
              loading={submitting}
            >
              提交
            </Button>
          </Group>
        </Group>

        <form id="group-form" onSubmit={form.onSubmit(handleSubmit)}>
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="xl">
                <Paper withBorder radius="md" p="xl">
                  <div className={classes.sectionHeader}>
                    <Text className={classes.sectionTitle}>基础信息</Text>
                    <Text className={classes.sectionDescription}>
                      填写项目的基础属性，用于在列表和详情页中快速识别。
                    </Text>
                  </div>

                  <Grid gutter="lg">
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="项目名称"
                        placeholder="请输入项目名称"
                        required
                        {...form.getInputProps('projectName')}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Select
                        label="项目类型"
                        placeholder="请选择项目类型"
                        data={[
                          { value: 'internal', label: '内部项目' },
                          { value: 'external', label: '外部项目' },
                          { value: 'experiment', label: '实验项目' },
                        ]}
                        required
                        {...form.getInputProps('projectType')}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="负责人"
                        placeholder="请输入负责人姓名"
                        required
                        {...form.getInputProps('owner')}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="所属部门"
                        placeholder="例如：技术中台部"
                        {...form.getInputProps('department')}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Textarea
                        label="项目描述"
                        placeholder="简要说明项目背景、目标和范围"
                        minRows={3}
                        autosize
                        {...form.getInputProps('description')}
                      />
                    </Grid.Col>
                  </Grid>
                </Paper>

                <Paper withBorder radius="md" p="xl">
                  <div className={classes.sectionHeader}>
                    <Text className={classes.sectionTitle}>权限与安全</Text>
                    <Text className={classes.sectionDescription}>
                      控制项目的可见范围和审计策略，确保敏感数据仅对授权人员开放。
                    </Text>
                  </div>

                  <Stack gap="md">
                    <Select
                      label="可见范围"
                      data={[
                        { value: 'private', label: '仅创建人可见' },
                        { value: 'internal', label: '团队成员可见' },
                        { value: 'public', label: '组织内公开' },
                      ]}
                      {...form.getInputProps('visibility')}
                    />
                    <Group justify="space-between">
                      <Stack gap={4}>
                        <Text size="sm">启用操作审计</Text>
                        <Text size="xs" c="dimmed">
                          记录创建、编辑、删除等关键操作，便于问题追溯。
                        </Text>
                      </Stack>
                      <Switch
                        checked={form.values.enableAudit}
                        onChange={event =>
                          form.setFieldValue(
                            'enableAudit',
                            event.currentTarget.checked
                          )
                        }
                      />
                    </Group>
                  </Stack>
                </Paper>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper withBorder radius="md" p="xl">
                <div className={classes.sectionHeader}>
                  <Group gap="xs">
                    <IconSettings size={18} />
                    <Text className={classes.sectionTitle}>通知设置</Text>
                  </Group>
                  <Text className={classes.sectionDescription}>
                    配置通知渠道，确保在重要事件发生时第一时间收到提醒。
                  </Text>
                </div>

                <Stack gap="md">
                  <Group justify="space-between">
                    <Stack gap={4}>
                      <Text size="sm">启用通知</Text>
                      <Text size="xs" c="dimmed">
                        包括审批流转、状态变更等关键信息。
                      </Text>
                    </Stack>
                    <Switch
                      checked={form.values.enableNotification}
                      onChange={event =>
                        form.setFieldValue(
                          'enableNotification',
                          event.currentTarget.checked
                        )
                      }
                    />
                  </Group>

                  <TextInput
                    label="通知邮箱"
                    placeholder="例如：owner@example.com"
                    {...form.getInputProps('notifyEmail')}
                  />

                  <TextInput
                    label="Webhook 地址"
                    placeholder="可选，用于对接第三方系统"
                    {...form.getInputProps('notifyWebhook')}
                  />
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </form>
      </div>
    </div>
  )
}

