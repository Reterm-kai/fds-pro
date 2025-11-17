/**
 * Tab 页签数据结构
 */
export interface TabPage {
  /** 路由路径（唯一标识） */
  path: string
  /** 显示标题 */
  title: string
  /** 是否可关闭（首页通常不可关闭） */
  closable: boolean
  /** 刷新标记，用于触发页面刷新 */
  refreshKey?: number
}

/**
 * Tab 状态管理上下文值
 */
export interface TabContextValue {
  /** 当前打开的所有 Tab */
  tabs: TabPage[]
  /** 当前激活的 Tab 路径 */
  activeTab: string
  /** 添加新 Tab */
  addTab: (tab: TabPage) => void
  /** 关闭指定 Tab */
  closeTab: (path: string) => void
  /** 关闭其他 Tab */
  closeOtherTabs: (path: string) => void
  /** 关闭所有可关闭的 Tab */
  closeAllTabs: () => void
  /** 刷新指定 Tab */
  refreshTab: (path: string) => void
  /** 设置激活的 Tab */
  setActiveTab: (path: string) => void
}
