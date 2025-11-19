import { IconMail, IconWorld } from '@tabler/icons-react'
import { UnstyledButton } from '@mantine/core'
import classes from './ContactButton.module.css'

const actions = [
  { label: '官网', icon: IconWorld },
  { label: '联系我们', icon: IconMail },
] as const

/**
 * 联系我们区域
 * 展示官网与联系我们两个透明链接，保持固定高度
 */
export function ContactButton() {
  return (
    <div className={classes.links}>
      {actions.map(action => (
        <UnstyledButton
          key={action.label}
          className={classes.link}
          type="button"
          aria-label={action.label}
        >
          <action.icon size={16} aria-hidden="true" />
          <span className={classes.label}>{action.label}</span>
        </UnstyledButton>
      ))}
    </div>
  )
}
