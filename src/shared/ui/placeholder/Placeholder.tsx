interface PlaceholderProps {
  title: string
  description?: string
}

/**
 * 占位页面组件
 * 用于尚未实现的页面路由
 */
export function Placeholder({
  title,
  description = '该页面正在开发中...',
}: PlaceholderProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
