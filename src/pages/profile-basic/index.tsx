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
 * 用于展示单个对象的关键信息和操作记录
 */
export function ProfileBasicPage() {
  const navigate = useNavigate()

  const basicInfo: DetailItem[] = [
    { label: '订单编号', value: 'DD2024-0001' },
    { label: '创建人', value: '张三' },
    { label: '所属项目', value: '内容审核系统升级' },
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
            <Title order={2} mb="xs">
              基础详情页
            </Title>
            <Text size="sm" c="dimmed">
              用于展示单个对象的关键信息和最近操作记录，适合订单、任务等详情场景。
            </Text>
          </div>

          <Group gap="xs">
            <Button
              variant="default"
              leftSection={<IconPrinter size={16} />}
            >
              导出详情
            </Button>
            <Button
              variant="outline"
              leftSection={<IconEdit size={16} />}
            >
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
                责任人
              </Text>
              <Group gap="xs">
                <IconUser size={16} />
                <Text size="sm">张三</Text>
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
                  本订单用于演示基础详情页的布局，展示一个典型业务对象在提交、审核、完成等阶段的关键信息。
                </Text>
                <Text size="sm">
                  实际项目中，你可以在这里放置富文本说明、字段分组、附件列表等内容，保持信息结构清晰，让阅读体验更加顺畅。
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
                <Timeline.Item
                  title="提交申请"
                  bullet={<IconUser size={12} />}
                >
                  <Text size="sm" c="dimmed">
                    张三 提交订单
                  </Text>
                  <Text size="xs" c="dimmed">
                    2024-10-10 14:00:39
                  </Text>
                </Timeline.Item>
                <Timeline.Item title="主管审核">
                  <Text size="sm" c="dimmed">
                    李四 审核通过
                  </Text>
                  <Text size="xs" c="dimmed">
                    2024-10-10 15:32:10
                  </Text>
                </Timeline.Item>
                <Timeline.Item title="流程完成">
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

