import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoin,
  IconDiscount2,
  IconReceipt2,
  IconUserPlus,
} from '@tabler/icons-react'
import { Group, Paper, SimpleGrid, Text } from '@mantine/core'
import classes from './StatsGrid.module.css'

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
}

interface StatData {
  title: string
  icon: keyof typeof icons
  value: string
  diff: number
}

const defaultData: StatData[] = [
  { title: '营收', icon: 'receipt', value: '13,456', diff: 34 },
  { title: '利润', icon: 'coin', value: '4,145', diff: -13 },
  { title: '优惠券使用', icon: 'discount', value: '745', diff: 18 },
  { title: '新客户', icon: 'user', value: '188', diff: -30 },
]

interface StatsGridProps {
  data?: StatData[]
}

export function StatsGrid({ data = defaultData }: StatsGridProps) {
  const stats = data.map(stat => {
    const Icon = icons[stat.icon]
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text
            size="xs"
            c="dimmed"
            tt="uppercase"
            fw={700}
            className={classes.title}
          >
            {stat.title}
          </Text>
          <Icon className={classes.icon} size={22} stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text size="xl" fw={700} className={classes.value}>
            {stat.value}
          </Text>
          <Text
            c={stat.diff > 0 ? 'teal' : 'red'}
            fz="sm"
            fw={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size={16} stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          与上月相比
        </Text>
      </Paper>
    )
  })

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  )
}

