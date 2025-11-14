import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core'
import { Sun, Moon } from 'lucide-react'

/**
 * 主题切换组件
 * 在亮色和暗色主题之间切换
 *
 * 注意：首次访问默认使用 auto 模式（跟随系统），用户切换后在 light/dark 间切换
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
      variant="subtle"
      color="gray"
      size="lg"
      aria-label="切换主题"
      title={
        computedColorScheme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'
      }
    >
      {computedColorScheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </ActionIcon>
  )
}
