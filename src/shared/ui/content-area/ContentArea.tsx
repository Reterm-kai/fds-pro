import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import classes from './ContentArea.module.css'

export interface ContentAreaProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode
}

/**
 * 主内容区域容器，提供间隙和背景样式。
 * 滚动功能由外层 Main 容器提供。
 */

export function ContentArea({
  className,
  children,
  ...others
}: ContentAreaProps) {
  return (
    <div className={[classes.root, className].filter(Boolean).join(' ')} {...others}>
      <div className={classes.inner}>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  )
}
