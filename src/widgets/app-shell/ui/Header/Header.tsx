import { Burger, Container, Group } from '@mantine/core'
import { Logo, ThemeToggle } from '@/shared/ui'
import { NotificationButton } from '../NotificationButton'
import { UserMenu } from '../UserMenu'
import classes from './Header.module.css'

interface HeaderProps {
  opened: boolean
  toggle: () => void
}

export function Header({ opened, toggle }: HeaderProps) {
  return (
    <header className={classes.header}>
      <Container size="fluid" className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Logo style={{ width: 100, height: 'auto' }} />
        </Group>

        <Group gap="md">
          <ThemeToggle />
          <NotificationButton />
          <UserMenu />
        </Group>
      </Container>
    </header>
  )
}
