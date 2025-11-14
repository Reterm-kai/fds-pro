import { Burger, Container, Group } from '@mantine/core'
import { Logo } from '@/shared/ui/logo'
import { ThemeToggle } from '@/shared/ui/theme-toggle'
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
        </Group>
      </Container>
    </header>
  )
}
