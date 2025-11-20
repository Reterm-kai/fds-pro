import { ScrollArea } from '@mantine/core'
import type { ComponentPropsWithoutRef } from 'react'
import classes from './ContentArea.module.css'

export type ContentAreaProps = ComponentPropsWithoutRef<typeof ScrollArea>

/**
 * 主内容区域滚动容器，提供基础的滚动和布局功能。
 * 子组件自行控制间距和布局样式。
 */

export function ContentArea({
  className,
  children,
  ...others
}: ContentAreaProps) {
  return (
    <ScrollArea
      classNames={{
        root: [classes.root, className].filter(Boolean).join(' '),
        viewport: classes.viewport,
        scrollbar: classes.scrollbar,
        thumb: classes.thumb,
      }}
      type="auto"
      {...others}
    >
      <div className={classes.content}>{children}</div>
    </ScrollArea>
  )
}
