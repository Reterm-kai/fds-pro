import { Box } from '@mantine/core'
import type { BoxProps, ElementProps } from '@mantine/core'
import classes from './ContentArea.module.css'

export type ContentAreaProps = BoxProps & ElementProps<'div'>

export function ContentArea({ className, ...others }: ContentAreaProps) {
  const mergedClassName = [classes.root, className]
    .filter(Boolean)
    .join(' ')

  return <Box className={mergedClassName} {...others} />
}
