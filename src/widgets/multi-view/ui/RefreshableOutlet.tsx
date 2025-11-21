import { Outlet, useLocation } from 'react-router-dom'
import classes from './RefreshableOutlet.module.css'

/**
 * 多视图 Outlet 组件
 */
export function RefreshableOutlet() {
  const location = useLocation()

  return (
    <div className={classes.wrapper}>
      <div key={location.key} className={classes.content}>
        <Outlet />
      </div>
    </div>
  )
}
