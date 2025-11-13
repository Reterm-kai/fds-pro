import { Group, Text, Box } from '@mantine/core'
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
    sm: { icon: 24, text: 'lg' as const, padding: 'xs' },
    md: { icon: 32, text: 'xl' as const, padding: 'sm' },
    lg: { icon: 48, text: '2rem' as const, padding: 'md' },
  }

  const currentSize = sizes[size]

  return (
    <Group gap="xs" wrap="nowrap">
      <Box
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        p={currentSize.padding}
        display="flex"
        style={{
          borderRadius: '0.5rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="span"
          display="inline-block"
          style={{ transform: 'rotate(-45deg)' }}
        >
          <Rocket size={currentSize.icon} strokeWidth={2} color="white" />
        </Box>
      </Box>
      {withText && (
        <Text
          size={currentSize.text}
          fw={700}
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          style={{
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
