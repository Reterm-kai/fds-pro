import { Burger, Container, Group, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Logo, ThemeToggle, NotificationButton, UserMenu } from '@/shared/ui'
import classes from './AppHeader.module.css'

interface AppHeaderProps {
  opened: boolean
  toggle: () => void
}

/**
 * 应用顶栏组件
 * 组合 Logo、主题切换、通知按钮、用户菜单等功能
 */
export function AppHeader({ opened, toggle }: AppHeaderProps) {
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
