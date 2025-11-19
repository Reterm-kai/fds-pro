import { Box } from '@mantine/core'
import type { BoxProps, ElementProps } from '@mantine/core'
import type { ReactNode } from 'react'
import classes from './PageContainer.module.css'

type PageContainerSize = 'full' | 'lg' | 'md'
type PageContainerVariant = 'default' | 'muted'
type PageContainerAlign = 'left' | 'center'

export interface PageContainerProps
  extends BoxProps,
    ElementProps<'section'> {
  children: ReactNode
  size?: PageContainerSize
  align?: PageContainerAlign
  variant?: PageContainerVariant
  contentClassName?: string
}

const sizeClasses: Record<PageContainerSize, string> = {
  full: classes.sizeFull,
  lg: classes.sizeLg,
  md: classes.sizeMd,
}

const variantClasses: Record<PageContainerVariant, string> = {
  default: classes.variantDefault,
  muted: classes.variantMuted,
}

export function PageContainer({
  children,
  size = 'full',
  align = 'left',
  variant = 'default',
  className,
  contentClassName,
  ...others
}: PageContainerProps) {
  const rootClassName = [classes.root, className]
    .filter(Boolean)
    .join(' ')

  const contentClasses = [
    classes.content,
    sizeClasses[size],
    variantClasses[variant],
    align === 'center' ? classes.alignCenter : undefined,
    contentClassName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Box component="section" className={rootClassName} {...others}>
      <div className={contentClasses}>{children}</div>
    </Box>
  )
}
