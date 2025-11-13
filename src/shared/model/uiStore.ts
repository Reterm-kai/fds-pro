import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

/**
 * 导航栏收起状态类型
 */
type NavbarCollapseState = 'expanded' | 'collapsed'

/**
 * UI 偏好状态接口
 */
interface UIState {
  /** 导航栏收起状态 */
  navbarCollapse: NavbarCollapseState
  /** 紧凑模式（更小的间距和字体） */
  compactMode: boolean
  /** 显示面包屑导航 */
  showBreadcrumbs: boolean
  /** 侧边栏默认展开（移动端） */
  sidebarDefaultOpen: boolean

  // Actions
  toggleNavbarCollapse: () => void
  setNavbarCollapse: (state: NavbarCollapseState) => void
  toggleCompactMode: () => void
  setCompactMode: (enabled: boolean) => void
  toggleBreadcrumbs: () => void
  setBreadcrumbs: (show: boolean) => void
  toggleSidebarDefault: () => void
  setSidebarDefault: (open: boolean) => void
  resetToDefaults: () => void
}

/**
 * 默认 UI 偏好
 */
const defaultUIState = {
  navbarCollapse: 'expanded' as NavbarCollapseState,
  compactMode: false,
  showBreadcrumbs: true,
  sidebarDefaultOpen: false,
}

/**
 * UI 偏好 Store
 * 管理全局 UI 设置和用户偏好
 */
export const useUIStore = create<UIState>()(
  devtools(
    persist(
      set => ({
        ...defaultUIState,

        toggleNavbarCollapse: () =>
          set(
            state => ({
              navbarCollapse:
                state.navbarCollapse === 'expanded' ? 'collapsed' : 'expanded',
            }),
            false,
            'ui/toggleNavbarCollapse'
          ),

        setNavbarCollapse: navbarCollapse =>
          set({ navbarCollapse }, false, 'ui/setNavbarCollapse'),

        toggleCompactMode: () =>
          set(
            state => ({ compactMode: !state.compactMode }),
            false,
            'ui/toggleCompactMode'
          ),

        setCompactMode: compactMode =>
          set({ compactMode }, false, 'ui/setCompactMode'),

        toggleBreadcrumbs: () =>
          set(
            state => ({ showBreadcrumbs: !state.showBreadcrumbs }),
            false,
            'ui/toggleBreadcrumbs'
          ),

        setBreadcrumbs: showBreadcrumbs =>
          set({ showBreadcrumbs }, false, 'ui/setBreadcrumbs'),

        toggleSidebarDefault: () =>
          set(
            state => ({ sidebarDefaultOpen: !state.sidebarDefaultOpen }),
            false,
            'ui/toggleSidebarDefault'
          ),

        setSidebarDefault: sidebarDefaultOpen =>
          set({ sidebarDefaultOpen }, false, 'ui/setSidebarDefault'),

        resetToDefaults: () => set(defaultUIState, false, 'ui/resetToDefaults'),
      }),
      {
        name: 'ui-preferences',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'UIStore' }
  )
)

/**
 * 选择器：导航栏收起状态
 */
export const selectNavbarCollapse = (state: UIState) => state.navbarCollapse

/**
 * 选择器：紧凑模式
 */
export const selectCompactMode = (state: UIState) => state.compactMode

/**
 * 选择器：面包屑显示状态
 */
export const selectShowBreadcrumbs = (state: UIState) => state.showBreadcrumbs

/**
 * 选择器：侧边栏默认状态
 */
export const selectSidebarDefaultOpen = (state: UIState) =>
  state.sidebarDefaultOpen
