import { Group, Text } from '@mantine/core'
import { Rocket } from 'lucide-react'

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
  const sizes = {
    sm: { icon: 24, text: 'lg' as const, padding: '0.375rem' },
    md: { icon: 32, text: 'xl' as const, padding: '0.5rem' },
    lg: { icon: 48, text: '2rem' as const, padding: '0.75rem' },
  }

  const currentSize = sizes[size]

  return (
    <Group gap="xs" wrap="nowrap">
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '0.5rem',
          padding: currentSize.padding,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Rocket
          size={currentSize.icon}
          strokeWidth={2}
          color="white"
          style={{ transform: 'rotate(-45deg)' }}
        />
      </div>
      {withText && (
        <Text
          size={currentSize.text}
          fw={700}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
