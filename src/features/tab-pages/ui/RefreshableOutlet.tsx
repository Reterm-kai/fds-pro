import { Outlet, useLocation } from 'react-router-dom'
import { useTabPages } from '../model/useTabPages'

/**
 * 可刷新的 Outlet 组件
 * 通过监听 Tab 的 refreshKey 变化，强制重新挂载页面内容
 */
export function RefreshableOutlet() {
  const location = useLocation()
  const { tabs } = useTabPages()

  // 获取当前路径对应的 Tab
  const currentTab = tabs.find(tab => tab.path === location.pathname)
  const refreshKey = currentTab?.refreshKey ?? 0

  // 使用 refreshKey 作为 key，当 refreshKey 变化时强制重新挂载
  return <Outlet key={`${location.pathname}-${refreshKey}`} />
}
