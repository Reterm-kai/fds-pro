import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import classes from './RouteProgressBar.module.css'

/**
 * 顶部路由切换进度条
 * 每次 pathname 变化时触发一次短暂的加载动画
 */
export function RouteProgressBar() {
  const location = useLocation()
  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return undefined

    // 重置动画状态后重新触发
    bar.classList.remove(classes.barActive)
    // 触发浏览器回流以便重新附着动画
    void bar.offsetWidth
    bar.classList.add(classes.barActive)

    const timeoutId = window.setTimeout(() => {
      bar.classList.remove(classes.barActive)
    }, 500)

    return () => window.clearTimeout(timeoutId)
  }, [location.pathname])

  return (
    <div className={classes.container}>
      <div ref={barRef} className={classes.bar} />
    </div>
  )
}
