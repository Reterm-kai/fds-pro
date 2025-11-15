import { Burger, Container, Group, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Logo, ThemeToggle } from '@/shared/ui'
import { NotificationButton } from '../NotificationButton'
import { UserMenu } from '../UserMenu'
import classes from './Header.module.css'

interface HeaderProps {
  opened: boolean
  toggle: () => void
}

export function Header({ opened, toggle }: HeaderProps) {
  const theme = useMantineTheme()
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`)

  const logoWidth = isSmallScreen
    ? 'calc(var(--mantine-spacing-xl) * 2.5)'
    : 'calc(var(--mantine-spacing-xl) * 3.125)'

  return (
    <header className={classes.header}>
      <Container size="fluid" className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Logo style={{ width: logoWidth, height: 'auto' }} />
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
