/**
 * 视图页面数据结构
 */
export interface ViewPage {
  /** 路由路径（唯一标识） */
  path: string
  /** 显示标题 */
  title: string
  /** 是否可关闭（首页通常不可关闭） */
  closable: boolean
}

/**
 * 多视图状态管理上下文值
 */
export interface MultiViewContextValue {
  /** 当前打开的所有视图 */
  views: ViewPage[]
  /** 当前激活的视图路径 */
  activeView: string
  /** 添加新视图 */
  addView: (view: ViewPage) => void
  /** 关闭指定视图 */
  closeView: (path: string) => void
  /** 关闭其他视图 */
  closeOtherViews: (path: string) => void
  /** 关闭所有可关闭的视图 */
  closeAllViews: () => void
  /** 设置激活的视图 */
  setActiveView: (path: string) => void
}
