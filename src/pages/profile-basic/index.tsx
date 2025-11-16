import type { ReactNode } from 'react'
import {
  Badge,
  Button,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Timeline,
  Title,
} from '@mantine/core'
import {
  IconArrowLeft,
  IconEdit,
  IconPrinter,
  IconReceipt2,
  IconUser,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import classes from './ProfileBasic.module.css'

interface DetailItem {
  label: string
  value: ReactNode
}

/**
 * 基础详情页
 * 展示单条业务数据的关键信息和操作记录
 */
export function ProfileBasicPage() {
  const navigate = useNavigate()

  const basicInfo: DetailItem[] = [
    { label: '订单编号', value: 'DD2024-0001' },
    { label: '创建人', value: '王小明' },
    { label: '所属项目', value: '企业中台管理系统' },
    { label: '创建时间', value: '2024-10-10 14:00:39' },
    { label: '最近更新', value: '2024-10-11 09:21:15' },
    {
      label: '当前状态',
      value: <Badge color="green">已完成</Badge>,
    },
  ]

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <Group justify="space-between" className={classes.header}>
          <div>
            <Title order={1} mb="xs">
              基础详情
            </Title>
            <Text size="sm" c="dimmed">
              用于展示单条业务数据的关键信息和操作记录，适合作为审批单、工单等详情页面模板。
            </Text>
          </div>

          <Group gap="xs">
            <Button variant="default" leftSection={<IconPrinter size={16} />}>
              打印
            </Button>
            <Button variant="outline" leftSection={<IconEdit size={16} />}>
              编辑
            </Button>
            <Button
              color="blue"
              leftSection={<IconArrowLeft size={16} />}
              onClick={handleBack}
            >
              返回上一页
            </Button>
          </Group>
        </Group>

        <Paper withBorder radius="md" p="xl" mb="xl">
          <Group mb="lg" justify="space-between">
            <Group gap="xs">
              <IconReceipt2 size={20} />
              <Text fw={500}>基本信息</Text>
            </Group>
            <Group gap="xs">
              <Text size="sm" c="dimmed">
                当前负责人
              </Text>
              <Group gap="xs">
                <IconUser size={16} />
                <Text size="sm">王小明</Text>
              </Group>
            </Group>
          </Group>

          <Grid gutter="lg">
            {basicInfo.map(item => (
              <Grid.Col key={item.label} span={{ base: 12, sm: 6, md: 4 }}>
                <Stack gap={4}>
                  <Text size="xs" c="dimmed">
                    {item.label}
                  </Text>
                  <Text size="sm">{item.value}</Text>
                </Stack>
              </Grid.Col>
            ))}
          </Grid>
        </Paper>

        <Grid gutter="xl" className={classes.mainGrid}>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper withBorder radius="md" p="xl">
              <Text fw={500} mb="lg">
                详细描述
              </Text>
              <Stack gap="sm">
                <Text size="sm">
                  这里展示的是基础详情页的示例文案，可用于说明当前订单或任务的背景、业务场景和重要信息摘要。
                </Text>
                <Text size="sm">
                  在真实项目中，你可以根据实际业务字段，扩展更多描述内容，例如风险提示、关联资源、备注说明等，帮助使用者快速理解当前记录。
                </Text>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper withBorder radius="md" p="xl">
              <Text fw={500} mb="lg">
                操作记录
              </Text>
              <Timeline active={2} bulletSize={18} lineWidth={2}>
                <Timeline.Item title="提交申请" bullet={<IconUser size={12} />}>
                  <Text size="sm" c="dimmed">
                    王小明 发起审批
                  </Text>
                  <Text size="xs" c="dimmed">
                    2024-10-10 14:00:39
                  </Text>
                </Timeline.Item>
                <Timeline.Item title="审批通过">
                  <Text size="sm" c="dimmed">
                    李主管 审批通过
                  </Text>
                  <Text size="xs" c="dimmed">
                    2024-10-10 15:32:10
                  </Text>
                </Timeline.Item>
                <Timeline.Item title="归档完成">
                  <Text size="sm" c="dimmed">
                    系统 自动归档
                  </Text>
                  <Text size="xs" c="dimmed">
                    2024-10-11 09:21:15
                  </Text>
                </Timeline.Item>
              </Timeline>
            </Paper>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  )
}

