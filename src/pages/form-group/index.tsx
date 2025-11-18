import { useMemo, useState } from 'react'
import {
  Badge,
  Button,
  Divider,
  FileInput,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
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
  IconCloudUpload,
  IconDeviceFloppy,
  IconClipboardCheck,
  IconBellRinging,
  IconShieldLock,
  IconSend,
  IconSettings,
  IconDownload,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { showInfoNotification, showSuccessNotification } from '@/shared/ui'
import {
  useFormGroupOptions,
  type FormGroupOptionsResponse,
} from '@/entities/form-options'
import classes from './FormGroup.module.css'

interface GroupFormValues {
  projectName: string
  projectType: string
  owner: string
  department: string
  visibility: 'private' | 'internal' | 'public'
  enableAudit: boolean
  enableNotification: boolean
  allowCrossTeam: boolean
  requireApproval: boolean
  notifyEmail: string
  notifyWebhook: string
  description: string
  budget: number
  headcount: number
  tags: string[]
  region: string
  city: string
}

const emptyOptions: FormGroupOptionsResponse = {
  projectTypes: [],
  tags: [],
  regions: [],
}

export function FormGroupPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [attachment, setAttachment] = useState<File | null>(null)
  const { data: optionsData, isLoading: loadingOptions } = useFormGroupOptions()
  const options = optionsData ?? emptyOptions

  const form = useForm<GroupFormValues>({
    initialValues: {
      projectName: '',
      projectType: '',
      owner: '',
      department: '',
      visibility: 'internal',
      enableAudit: true,
      enableNotification: true,
      allowCrossTeam: false,
      requireApproval: true,
      notifyEmail: '',
      notifyWebhook: '',
      description: '',
      budget: 0,
      headcount: 3,
      tags: [],
      region: '',
      city: '',
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      projectName: value =>
        value.trim().length >= 2 ? null : '请输入至少 2 个字符的项目名称',
      projectType: value => (value ? null : '请选择项目类型'),
      owner: value => (value ? null : '请输入负责人'),
      notifyEmail: (value, values) =>
        values.enableNotification && !value.trim()
          ? '启用通知时需要填写邮箱'
          : null,
      budget: value => (value > 0 ? null : '请输入大于 0 的预估预算'),
      headcount: value =>
        value >= 1 && value <= 200 ? null : '团队人数需在 1-200 人之间',
      city: (value, values) =>
        values.region && !value ? '请选择交付城市' : null,
    },
  })

  const regionOptions = useMemo(
    () => options.regions.map(({ value, label }) => ({ value, label })),
    [options.regions]
  )

  const cityOptions = useMemo(() => {
    const targetRegion = options.regions.find(
      item => item.value === form.values.region
    )
    return targetRegion?.cities || []
  }, [form.values.region, options.regions])

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

  const handleUpload = (file?: File | null) => {
    setAttachment(file ?? null)

    if (file) {
      showSuccessNotification({
        title: '已添加附件',
        message: `${file.name} 已关联到当前表单`,
      })
    }
  }

  const handleDownload = () => {
    const name = attachment?.name || '模板.zip'
    showInfoNotification({
      title: '已开始下载',
      message: `正在准备 ${name}（示例交互，可接后端下载接口）`,
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

        <Paper withBorder radius="md" p="md" className={classes.metaBar}>
          <div className={classes.metaItem}>
            <div className={classes.metaIcon}>
              <IconClipboardCheck size={16} />
            </div>
            <div className={classes.metaTexts}>
              <Text className={classes.metaTitle}>表单完整度</Text>
              <Text size="xs" c="dimmed">
                基础信息 5/6 已填写，剩余描述可稍后补充
              </Text>
            </div>
            <Badge color="green" variant="light">
              正常
            </Badge>
          </div>

          <div className={classes.metaItem}>
            <div className={classes.metaIcon}>
              <IconShieldLock size={16} />
            </div>
            <div className={classes.metaTexts}>
              <Text className={classes.metaTitle}>默认权限</Text>
              <Text size="xs" c="dimmed">
                当前为团队可见，可随时切换到组织公开
              </Text>
            </div>
            <Badge color="blue" variant="light">
              内部
            </Badge>
          </div>

          <div className={classes.metaItem}>
            <div className={classes.metaIcon}>
              <IconBellRinging size={16} />
            </div>
            <div className={classes.metaTexts}>
              <Text className={classes.metaTitle}>通知通道</Text>
              <Text size="xs" c="dimmed">
                邮箱已启用，Webhook 可按需接入
              </Text>
            </div>
            <Badge color="grape" variant="light">
              2 条
            </Badge>
          </div>
        </Paper>

        <form id="group-form" onSubmit={form.onSubmit(handleSubmit)} noValidate>
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
                        name="projectName"
                        {...form.getInputProps('projectName')}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Select
                        label="项目类型"
                        placeholder="请选择项目类型"
                        data={options.projectTypes}
                        required
                        name="projectType"
                        searchable
                        disabled={loadingOptions}
                        {...form.getInputProps('projectType')}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="负责人"
                        placeholder="请输入负责人姓名"
                        required
                        name="owner"
                        {...form.getInputProps('owner')}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="所属部门"
                        placeholder="例如：技术中台部"
                        name="department"
                        {...form.getInputProps('department')}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <MultiSelect
                        label="标签 / 技术栈"
                        placeholder="可搜索添加标签"
                        searchable
                        data={options.tags}
                        name="tags"
                        disabled={loadingOptions}
                        {...form.getInputProps('tags')}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <NumberInput
                        label="预估预算（¥）"
                        placeholder="请输入预算"
                        prefix="¥"
                        thousandSeparator
                        min={0}
                        step={1000}
                        clampBehavior="strict"
                        name="budget"
                        {...form.getInputProps('budget')}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <NumberInput
                        label="团队人数"
                        placeholder="请输入人数"
                        min={1}
                        max={200}
                        step={1}
                        clampBehavior="strict"
                        name="headcount"
                        {...form.getInputProps('headcount')}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Textarea
                        label="项目描述"
                        placeholder="简要说明项目背景、目标和范围"
                        minRows={3}
                        autosize
                        name="description"
                        {...form.getInputProps('description')}
                      />
                    </Grid.Col>
                  </Grid>
                </Paper>

                <Paper withBorder radius="md" p="xl">
                  <div className={classes.sectionHeader}>
                    <Text className={classes.sectionTitle}>交付区域与协作</Text>
                    <Text className={classes.sectionDescription}>
                      选择主要交付区域和城市，便于资源统筹与协作安排。
                    </Text>
                  </div>

                  <Grid gutter="lg">
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Select
                        label="交付区域"
                        searchable
                        clearable
                        withScrollArea
                        placeholder="请选择区域"
                        data={regionOptions}
                        name="region"
                        disabled={loadingOptions}
                        {...form.getInputProps('region')}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Select
                        label="交付城市"
                        searchable
                        clearable
                        placeholder={
                          form.values.region ? '请选择城市' : '请先选择区域'
                        }
                        data={cityOptions}
                        name="city"
                        disabled={!form.values.region || loadingOptions}
                        {...form.getInputProps('city')}
                      />
                    </Grid.Col>
                  </Grid>

                  <Divider my="md" />

                  <div className={classes.controlRow}>
                    <Stack gap={4}>
                      <Text size="sm">区域搜索提示</Text>
                      <Text size="xs" c="dimmed">
                        可在区域与城市下拉框内直接输入关键词快速定位。
                      </Text>
                    </Stack>
                    <Badge color="gray" variant="light">
                      支持搜索
                    </Badge>
                  </div>
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
                      name="visibility"
                      {...form.getInputProps('visibility')}
                    />
                    <div className={classes.controlRow}>
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
                        name="enableAudit"
                      />
                    </div>

                    <div className={classes.controlRow}>
                      <Stack gap={4}>
                        <Text size="sm">跨团队协作</Text>
                        <Text size="xs" c="dimmed">
                          允许其他团队在受限权限下查看项目信息。
                        </Text>
                      </Stack>
                      <Switch
                        checked={form.values.allowCrossTeam}
                        onChange={event =>
                          form.setFieldValue(
                            'allowCrossTeam',
                            event.currentTarget.checked
                          )
                        }
                        name="allowCrossTeam"
                      />
                    </div>

                    <div className={classes.controlRow}>
                      <Stack gap={4}>
                        <Text size="sm">提交需审批</Text>
                        <Text size="xs" c="dimmed">
                          提交改动前触发审批流程，减少误操作风险。
                        </Text>
                      </Stack>
                      <Switch
                        checked={form.values.requireApproval}
                        onChange={event =>
                          form.setFieldValue(
                            'requireApproval',
                            event.currentTarget.checked
                          )
                        }
                        name="requireApproval"
                      />
                    </div>
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
                  <div className={classes.controlRow}>
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
                      name="enableNotification"
                    />
                  </div>

                  <TextInput
                    label="通知邮箱"
                    placeholder="例如：owner@example.com"
                    name="notifyEmail"
                    autoComplete="email"
                    {...form.getInputProps('notifyEmail')}
                  />

                  <TextInput
                    label="Webhook 地址"
                    placeholder="可选，用于对接第三方系统"
                    name="notifyWebhook"
                    {...form.getInputProps('notifyWebhook')}
                  />
                </Stack>
              </Paper>

              <Paper withBorder radius="md" p="xl">
                <div className={classes.sectionHeader}>
                  <Group gap="xs">
                    <IconCloudUpload size={18} />
                    <Text className={classes.sectionTitle}>附件与下载</Text>
                  </Group>
                  <Text className={classes.sectionDescription}>
                    上传相关资料，或下载项目模板/规范文件。
                  </Text>
                </div>

                <Stack gap="md">
                  <FileInput
                    label="上传附件"
                    placeholder="选择或拖拽文件"
                    accept=".pdf,.doc,.docx,.xlsx,.zip,.png,.jpg"
                    clearable
                    leftSection={<IconCloudUpload size={16} />}
                    value={attachment}
                    onChange={handleUpload}
                  />

                  <div className={classes.controlRow}>
                    <Stack gap={4}>
                      <Text size="sm">最新模板</Text>
                      <Text size="xs" c="dimmed">
                        包括需求文档、接口规范、设计交付清单。
                      </Text>
                    </Stack>
                    <Button
                      variant="light"
                      leftSection={<IconDownload size={16} />}
                      onClick={handleDownload}
                    >
                      下载
                    </Button>
                  </div>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </form>
      </div>
    </div>
  )
}
