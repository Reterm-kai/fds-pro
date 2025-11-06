import { Title, Text, SimpleGrid, Paper, Group, ThemeIcon } from '@mantine/core'
import {
  IconUsers,
  IconShoppingCart,
  IconCurrencyDollar,
  IconTrendingUp,
} from '@tabler/icons-react'

/**
 * 仪表盘页面
 * 展示系统关键指标和统计数据
 */
export function DashboardPage() {
  const stats = [
    { title: '总用户数', value: '13,456', icon: IconUsers, color: 'blue' },
    { title: '今日订单', value: '573', icon: IconShoppingCart, color: 'green' },
    {
      title: '总收入',
      value: '¥1,234,567',
      icon: IconCurrencyDollar,
      color: 'yellow',
    },
    { title: '增长率', value: '+23.5%', icon: IconTrendingUp, color: 'teal' },
  ]

  return (
    <div>
      <Title order={2} mb="xl">
        仪表盘
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        {stats.map(stat => (
          <Paper key={stat.title} p="md" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  {stat.title}
                </Text>
                <Text fw={700} size="xl" mt="xs">
                  {stat.value}
                </Text>
              </div>
              <ThemeIcon color={stat.color} size={44} radius="md">
                <stat.icon size={26} stroke={1.5} />
              </ThemeIcon>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    </div>
  )
}
