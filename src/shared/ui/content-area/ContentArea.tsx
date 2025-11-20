import { Paper } from '@mantine/core'
import type { ComponentPropsWithoutRef } from 'react'
import classes from './ContentArea.module.css'

export type ContentAreaProps = ComponentPropsWithoutRef<'div'>

export function ContentArea({
  className,
  children,
  ...others
}: ContentAreaProps) {
  const mergedClassName = [classes.root, className].filter(Boolean).join(' ')

  return (
    <div className={mergedClassName} {...others}>
      <Paper className={classes.content} shadow="xs" radius={0}>
        {children}
      </Paper>
    </div>
  )
}
