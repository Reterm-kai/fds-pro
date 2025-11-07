import { Group, Text, useMantineColorScheme } from '@mantine/core'
import { IconRocket } from '@tabler/icons-react'

interface LogoProps {
  /** Logo 大小 */
  size?: 'sm' | 'md' | 'lg'
  /** 是否显示文字 */
  withText?: boolean
}

/**
 * Fordoes 品牌 Logo 组件
 * 使用火箭图标象征创新和前进
 */
export function Logo({ size = 'md', withText = true }: LogoProps) {
  const { colorScheme } = useMantineColorScheme()

  const sizes = {
    sm: { icon: 24, text: 'lg' as const },
    md: { icon: 32, text: 'xl' as const },
    lg: { icon: 48, text: '2rem' as const },
  }

  const currentSize = sizes[size]

  return (
    <Group gap="xs" wrap="nowrap">
      <div
        style={{
          background:
            colorScheme === 'dark'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '8px',
          padding: size === 'sm' ? '6px' : size === 'md' ? '8px' : '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconRocket
          size={currentSize.icon}
          stroke={2}
          color="white"
          style={{ transform: 'rotate(-45deg)' }}
        />
      </div>
      {withText && (
        <Text
          size={currentSize.text}
          fw={700}
          style={{
            background:
              colorScheme === 'dark'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Fordoes
        </Text>
      )}
    </Group>
  )
}
