import type { ReactNode } from 'react'
import { Children, Fragment } from 'react'
import classes from './SectionList.module.css'

export interface SectionListProps {
  /** 布局方向 */
  direction?: 'vertical' | 'horizontal'
  /** 子元素 */
  children: ReactNode
  /** 自定义类名 */
  className?: string
}

export interface SectionProps {
  /** 子元素 */
  children: ReactNode
  /** 背景色变体：default 白色背景，subtle 浅灰背景 */
  variant?: 'default' | 'subtle'
  /** 自定义类名 */
  className?: string
}

export function SectionList({
  direction = 'vertical',
  children,
  className,
}: SectionListProps) {
  const childArray = Children.toArray(children)

  return (
    <div
      className={`${classes.root} ${direction === 'vertical' ? classes.vertical : classes.horizontal} ${className || ''}`}
    >
      {childArray.map((child, index) => (
        <Fragment key={index}>
          {index > 0 && <div className={classes.divider} />}
          {child}
        </Fragment>
      ))}
    </div>
  )
}

export function Section({
  children,
  variant = 'default',
  className,
}: SectionProps) {
  const variantClass = variant === 'subtle' ? classes.sectionSubtle : ''
  return (
    <div className={`${classes.section} ${variantClass} ${className || ''}`}>
      {children}
    </div>
  )
}
