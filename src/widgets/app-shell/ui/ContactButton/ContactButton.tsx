import { IconMail, IconBrandWechat, IconPhone } from '@tabler/icons-react'
import { Button, Group, Popover, Stack, Text } from '@mantine/core'
import classes from './ContactButton.module.css'

/**
 * 联系我们按钮组件
 * 提供多种联系方式（邮箱、微信、电话）的入口
 */
export function ContactButton() {
  return (
    <Popover width={280} position="top" shadow="md">
      <Popover.Target>
        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          fullWidth
          leftSection={<IconMail size={18} />}
          className={classes.button}
        >
          联系我们
        </Button>
      </Popover.Target>

      <Popover.Dropdown>
        <Stack gap="sm">
          <Text size="sm" fw={600} mb="xs">
            多种方式联系我们
          </Text>

          <Group gap="xs" className={classes.contactItem}>
            <IconMail size={16} stroke={1.5} />
            <div>
              <Text size="xs" c="dimmed">
                邮箱
              </Text>
              <Text size="sm">contact@example.com</Text>
            </div>
          </Group>

          <Group gap="xs" className={classes.contactItem}>
            <IconBrandWechat size={16} stroke={1.5} />
            <div>
              <Text size="xs" c="dimmed">
                微信
              </Text>
              <Text size="sm">WeChat_Support</Text>
            </div>
          </Group>

          <Group gap="xs" className={classes.contactItem}>
            <IconPhone size={16} stroke={1.5} />
            <div>
              <Text size="xs" c="dimmed">
                电话
              </Text>
              <Text size="sm">400-123-4567</Text>
            </div>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}
