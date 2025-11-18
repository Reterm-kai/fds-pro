import {
  ActionIcon,
  Indicator,
  Menu,
  Text,
  ScrollArea,
  Badge,
  Stack,
  Group,
} from '@mantine/core'
import { IconBell } from '@tabler/icons-react'
import classes from './NotificationButton.module.css'

/**
 * 消息通知按钮组件
 * 显示铃铛图标和未读消息数量，点击展开消息列表
 */
export function NotificationButton() {
  // Mock 数据 - 实际使用时应该从 API 获取
  const notifications = [
    {
      id: 1,
      title: '原给队列变更',
      content: '您的产品使用期限即将截止，如需继续使用产品请前往续...',
      type: 'warning',
      isRead: false,
      time: '刚刚',
    },
    {
      id: 2,
      title: '规则开通成功',
      content: '内容屏蔽规则于 2021-12-01 开通成功生效。',
      type: 'success',
      isRead: false,
      time: '2小时前',
    },
  ]

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <Menu width={320} position="bottom-end" withArrow shadow="md">
      <Menu.Target>
        <Indicator
          inline
          label={unreadCount}
          size={16}
          disabled={unreadCount === 0}
          color="red"
          offset={4}
        >
          <ActionIcon
            variant="subtle"
            color="gray"
            size="lg"
            aria-label="消息通知"
          >
            <IconBell size={20} />
          </ActionIcon>
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown p={0}>
        <div className={classes.header}>
          <Group justify="space-between" p="md" pb="sm">
            <Text size="sm" fw={600}>
              消息通知
            </Text>
            <Group gap="sm">
              <Text
                size="xs"
                c="blue"
                className={classes.link}
                onClick={() => console.log('全部已读')}
              >
                全部已读
              </Text>
              <Text
                size="xs"
                c="blue"
                className={classes.link}
                onClick={() => console.log('清空')}
              >
                清空
              </Text>
            </Group>
          </Group>
        </div>

        <ScrollArea h={300} type="auto">
          <Stack gap={0}>
            {notifications.length === 0 ? (
              <Text c="dimmed" size="sm" ta="center" py="xl">
                暂无消息
              </Text>
            ) : (
              notifications.map(notification => (
                <div key={notification.id} className={classes.notificationItem}>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm" fw={500}>
                      {notification.title}
                    </Text>
                    <Badge
                      size="xs"
                      color={notification.type === 'warning' ? 'red' : 'green'}
                      variant="light"
                    >
                      {notification.type === 'warning' ? '即将到期' : '已开通'}
                    </Badge>
                  </Group>
                  <Text size="xs" c="dimmed" lineClamp={2} mb="xs">
                    {notification.content}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {notification.time}
                  </Text>
                  {!notification.isRead && (
                    <div className={classes.unreadDot} />
                  )}
                </div>
              ))
            )}
          </Stack>
        </ScrollArea>

        <div className={classes.footer}>
          <Text
            size="sm"
            c="blue"
            ta="center"
            py="sm"
            className={classes.link}
            onClick={() => console.log('查看全部')}
          >
            查看全部
          </Text>
        </div>
      </Menu.Dropdown>
    </Menu>
  )
}
