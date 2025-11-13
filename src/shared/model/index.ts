/**
 * Shared Model - 全局状态管理
 *
 * 统一导出所有 Zustand stores
 */

export {
  useUIStore,
  selectNavbarCollapse,
  selectCompactMode,
  selectShowBreadcrumbs,
  selectSidebarDefaultOpen,
} from './uiStore'
