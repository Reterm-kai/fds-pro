import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'

/**
 * 主题切换组件
 * 提供明暗主题切换功能
 */
export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light')

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="default"
      size="lg"
      aria-label="切换主题"
      title={
        computedColorScheme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'
      }
    >
      {computedColorScheme === 'dark' ? (
        <IconSun size={20} />
      ) : (
        <IconMoon size={20} />
      )}
    </ActionIcon>
  )
}
