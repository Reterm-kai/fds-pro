import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import classes from './RouteProgressBar.module.css'

/**
 * 顶部路由切换进度条
 * 每次 pathname 变化时触发一次短暂的加载动画
 */
export function RouteProgressBar() {
  const location = useLocation()
  const [active, setActive] = useState(false)

  useEffect(() => {
    // 路由变化时触发一次进度动画
    setActive(true)
    const timeoutId = window.setTimeout(() => {
      setActive(false)
    }, 500)

    return () => window.clearTimeout(timeoutId)
  }, [location.pathname])

  return (
    <div className={classes.container}>
      <div
        className={`${classes.bar} ${
          active ? classes.barActive : classes.barHidden
        }`}
      />
    </div>
  )
}

