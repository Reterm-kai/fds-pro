import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import classes from "./RouteProgressBar.module.css"

/**
 * 顶部路由切换进度条
 * 每次路由 pathname 变化时，从左到右刷一条短暂的加载线
 */
export function RouteProgressBar() {
  const location = useLocation()
  const [active, setActive] = useState(false)

  useEffect(() => {
    // 路由变更时触发一次动画
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
