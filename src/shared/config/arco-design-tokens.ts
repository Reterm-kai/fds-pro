/**
 * Arco Design 设计 Tokens
 *
 * 完整的 Arco Design 设计规范
 * 参考：https://arco.design/react/docs/token
 *
 * 本文件定义了 Arco Design 的所有设计变量，包括：
 * - 颜色系统（主色、功能色、中性色）
 * - 字体系统（字号、行高、字重）
 * - 间距系统
 * - 圆角系统
 * - 阴影系统
 * - 尺寸系统
 */

/**
 * ============================================
 * 颜色系统 - Color System
 * ============================================
 */

/**
 * 主色板 - Arco Blue
 * Arco Design 的品牌主色
 */
export const ARCO_BLUE = {
  1: '#e8f3ff',
  2: '#bedaff',
  3: '#94bfff',
  4: '#6aa1ff',
  5: '#4080ff',
  6: '#165dff', // 主色 Primary
  7: '#0e42d2',
  8: '#072ca6',
  9: '#031a79',
  10: '#000d4d',
} as const

/**
 * 成功色板 - Green
 */
export const ARCO_GREEN = {
  1: '#e8ffea',
  2: '#aff0b5',
  3: '#7be188',
  4: '#4cd263',
  5: '#23c343',
  6: '#00b42a', // 成功色 Success
  7: '#009a29',
  8: '#008026',
  9: '#006622',
  10: '#004d1c',
} as const

/**
 * 警告色板 - Orange
 */
export const ARCO_ORANGE = {
  1: '#fff7e8',
  2: '#ffe4ba',
  3: '#ffcf8b',
  4: '#ffb65d',
  5: '#ff9a2e',
  6: '#ff7d00', // 警告色 Warning
  7: '#d25f00',
  8: '#a64500',
  9: '#792e00',
  10: '#4d1b00',
} as const

/**
 * 错误色板 - Red
 */
export const ARCO_RED = {
  1: '#ffece8',
  2: '#fdcdc5',
  3: '#fbaca3',
  4: '#f98981',
  5: '#f76560',
  6: '#f53f3f', // 错误色 Error
  7: '#cb2634',
  8: '#a1142e',
  9: '#770813',
  10: '#4d0004',
} as const

/**
 * 链接色板 - Cyan
 */
export const ARCO_CYAN = {
  1: '#e8fffb',
  2: '#b7f4ec',
  3: '#89e9e0',
  4: '#5edfd6',
  5: '#37d4cf',
  6: '#14c9c9', // 链接色 Link
  7: '#0da5aa',
  8: '#07828b',
  9: '#03606c',
  10: '#00424d',
} as const

/**
 * 中性色板 - Gray
 * 用于文本、边框、背景等
 */
export const ARCO_GRAY = {
  1: '#f7f8fa',
  2: '#f2f3f5',
  3: '#e5e6eb',
  4: '#c9cdd4',
  5: '#a9aeb8',
  6: '#86909c',
  7: '#6b7785',
  8: '#4e5969',
  9: '#272e3b',
  10: '#1d2129',
} as const

/**
 * 紫色板 - Purple
 */
export const ARCO_PURPLE = {
  1: '#f5e8ff',
  2: '#ddbef6',
  3: '#c396ed',
  4: '#a871e3',
  5: '#8d4eda',
  6: '#722ed1', // 紫色
  7: '#551db0',
  8: '#3c108f',
  9: '#27066e',
  10: '#16014d',
} as const

/**
 * 品红色板 - Magenta
 */
export const ARCO_MAGENTA = {
  1: '#ffe8fb',
  2: '#f7baef',
  3: '#ef8fe3',
  4: '#e768d7',
  5: '#df45cb',
  6: '#d91ad9', // 品红色
  7: '#b010b6',
  8: '#870893',
  9: '#5e0370',
  10: '#35004d',
} as const

/**
 * ============================================
 * 间距系统 - Spacing System
 * ============================================
 */

/**
 * 标准间距
 * 基于 4px 网格系统
 */
export const ARCO_SPACING = {
  0: 0,
  mini: 4, // 迷你间距
  small: 8, // 小间距
  medium: 12, // 中等间距
  default: 16, // 默认间距
  large: 20, // 大间距
  xlarge: 24, // 超大间距
} as const

/**
 * ============================================
 * 圆角系统 - Border Radius System
 * ============================================
 */

/**
 * 标准圆角
 * Arco Design 使用较小的圆角值，呈现方正简洁的风格
 */
export const ARCO_RADIUS = {
  none: 0, // 无圆角
  small: 2, // 小圆角 - 用于按钮、输入框等
  medium: 4, // 中圆角 - 用于卡片、弹窗等
  large: 8, // 大圆角 - 用于特殊场景
  circle: '50%', // 圆形
} as const

/**
 * ============================================
 * 阴影系统 - Shadow System
 * ============================================
 */

/**
 * 标准阴影
 * Arco Design 的阴影层次分明，用于营造空间层次感
 */
export const ARCO_SHADOWS = {
  1: '0 0 1px rgba(0, 0, 0, 0.3)', // 最小阴影
  2: '0 2px 8px rgba(0, 0, 0, 0.12)', // 小阴影 - 用于悬浮卡片
  3: '0 4px 16px rgba(0, 0, 0, 0.12)', // 中阴影 - 用于弹窗
  4: '0 8px 24px rgba(0, 0, 0, 0.12)', // 大阴影 - 用于抽屉
  5: '0 12px 32px rgba(0, 0, 0, 0.12)', // 超大阴影 - 用于模态框
} as const

/**
 * ============================================
 * 字体系统 - Typography System
 * ============================================
 */

/**
 * 字体大小
 * Arco Design 基础字号为 14px
 */
export const ARCO_FONT_SIZE = {
  12: 12, // 辅助文字
  14: 14, // 基础字号（正文）
  16: 16, // 小标题
  18: 18, // 中标题
  20: 20, // 大标题
  24: 24, // 特大标题
  28: 28, // 超大标题
  32: 32, // 巨大标题
  36: 36, // 最大标题
} as const

/**
 * 字体粗细
 */
export const ARCO_FONT_WEIGHT = {
  regular: 400, // 常规
  medium: 500, // 中等
  semibold: 600, // 半粗
  bold: 700, // 粗体
} as const

/**
 * 行高
 * 与字体大小对应，确保良好的可读性
 */
export const ARCO_LINE_HEIGHT = {
  12: 1.67, // 20px
  14: 1.57, // 22px
  16: 1.5, // 24px
  18: 1.56, // 28px
  20: 1.6, // 32px
  24: 1.67, // 40px
  28: 1.57, // 44px
  32: 1.5, // 48px
  36: 1.56, // 56px
} as const

/**
 * ============================================
 * 尺寸系统 - Size System
 * ============================================
 */

/**
 * 组件高度
 * 用于按钮、输入框等组件的标准高度
 */
export const ARCO_SIZE_HEIGHT = {
  mini: 24, // 迷你
  small: 28, // 小
  medium: 32, // 中（默认）
  large: 36, // 大
} as const

/**
 * ============================================
 * Z-Index 层级系统
 * ============================================
 */

/**
 * 标准层级
 * 用于控制元素的堆叠顺序
 */
export const ARCO_Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal_backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const

/**
 * ============================================
 * 动画系统 - Animation System
 * ============================================
 */

/**
 * 动画时长
 */
export const ARCO_DURATION = {
  fast: 100, // 快速
  base: 200, // 基础
  slow: 300, // 缓慢
  slower: 400, // 更慢
} as const

/**
 * 动画曲线
 */
export const ARCO_EASING = {
  linear: 'linear',
  ease: 'ease',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  standard: 'cubic-bezier(0.34, 0.69, 0.1, 1)', // Arco Design 标准曲线
} as const

/**
 * ============================================
 * 语义化颜色 - Semantic Colors
 * ============================================
 */

/**
 * 功能色
 * 直接使用主色板的核心颜色
 */
export const ARCO_SEMANTIC_COLORS = {
  primary: ARCO_BLUE[6],
  success: ARCO_GREEN[6],
  warning: ARCO_ORANGE[6],
  danger: ARCO_RED[6],
  error: ARCO_RED[6],
  link: ARCO_CYAN[6],
  info: ARCO_BLUE[6],
} as const

/**
 * 文本颜色
 */
export const ARCO_TEXT_COLORS = {
  primary: ARCO_GRAY[10], // 主要文本 #1d2129
  regular: ARCO_GRAY[8], // 常规文本 #4e5969
  secondary: ARCO_GRAY[6], // 次要文本 #86909c
  placeholder: ARCO_GRAY[5], // 占位文本 #a9aeb8
  disabled: ARCO_GRAY[4], // 禁用文本 #c9cdd4
} as const

/**
 * 背景色
 */
export const ARCO_BG_COLORS = {
  white: '#ffffff',
  gray: ARCO_GRAY[1], // #f7f8fa
  light: ARCO_GRAY[2], // #f2f3f5
  hover: ARCO_GRAY[3], // #e5e6eb - 悬浮背景
  active: ARCO_GRAY[4], // #c9cdd4 - 激活背景
  disabled: ARCO_GRAY[2], // #f2f3f5 - 禁用背景
} as const

/**
 * 边框色
 */
export const ARCO_BORDER_COLORS = {
  default: ARCO_GRAY[3], // #e5e6eb - 默认边框
  light: ARCO_GRAY[2], // #f2f3f5 - 浅色边框
  dark: ARCO_GRAY[4], // #c9cdd4 - 深色边框
} as const

/**
 * ============================================
 * 导出类型定义
 * ============================================
 */

export type ArcoBlueKey = keyof typeof ARCO_BLUE
export type ArcoGreenKey = keyof typeof ARCO_GREEN
export type ArcoOrangeKey = keyof typeof ARCO_ORANGE
export type ArcoRedKey = keyof typeof ARCO_RED
export type ArcoCyanKey = keyof typeof ARCO_CYAN
export type ArcoGrayKey = keyof typeof ARCO_GRAY
export type ArcoPurpleKey = keyof typeof ARCO_PURPLE
export type ArcoMagentaKey = keyof typeof ARCO_MAGENTA

export type ArcoSpacingKey = keyof typeof ARCO_SPACING
export type ArcoRadiusKey = keyof typeof ARCO_RADIUS
export type ArcoShadowKey = keyof typeof ARCO_SHADOWS
export type ArcoFontSizeKey = keyof typeof ARCO_FONT_SIZE
export type ArcoFontWeightKey = keyof typeof ARCO_FONT_WEIGHT
export type ArcoLineHeightKey = keyof typeof ARCO_LINE_HEIGHT
export type ArcoSizeHeightKey = keyof typeof ARCO_SIZE_HEIGHT
