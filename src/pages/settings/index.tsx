import { useState } from 'react'
import { Paper, Stack, Switch, Text, Title } from '@mantine/core'

/**
 * 系统设置页面
 * 提供常用系统与个性化配置选项
 */
export function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(false)
  const [autoSave, setAutoSave] = useState(true)

  return (
    <div>
      <Title order={1} mb="xl">
        系统设置
      </Title>

      <Paper p="xl" radius="md" withBorder>
        <Stack gap="lg">
          <div>
            <Text fw={500} mb="xs">
              通知设置
            </Text>
            <Switch
              label="启用桌面通知"
              checked={notifications}
              onChange={event => setNotifications(event.currentTarget.checked)}
              mb="sm"
            />
            <Switch
              label="启用邮件提醒"
              checked={emailAlerts}
              onChange={event => setEmailAlerts(event.currentTarget.checked)}
            />
          </div>

          <div>
            <Text fw={500} mb="xs">
              编辑器设置
            </Text>
            <Switch
              label="自动保存"
              checked={autoSave}
              onChange={event => setAutoSave(event.currentTarget.checked)}
            />
          </div>
        </Stack>
      </Paper>
    </div>
  )
}
