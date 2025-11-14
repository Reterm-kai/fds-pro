import { IconChevronRight } from '@tabler/icons-react'
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core'
import classes from './UserButton.module.css'

interface UserButtonProps {
  name?: string
  email?: string
  avatar?: string
}

export function UserButton({
  name = 'Guest User',
  email = 'guest@example.com',
  avatar,
}: UserButtonProps) {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={avatar} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  )
}
