/**
 * 占位页面组件
 * 用于尚未实现的页面路由
 */
export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>该页面正在开发中...</p>
    </div>
  )
}
