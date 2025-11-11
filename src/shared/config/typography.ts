/**
 * 响应式字体系统配置
 *
 * 这是项目中字体大小的唯一真实来源（Single Source of Truth）
 * 所有字体配置都应该引用这里的值
 *
 * 设计原则：
 * 1. 基于 Arco Design 的 14px 根字体大小
 * 2. 使用 rem 单位确保可访问性
 * 3. 使用 clamp() 实现流体排版
 * 4. 与 Mantine 主题系统集成，但遵循 Arco Design 规范
 */

/**
 * 基础字体大小（px）
 * Arco Design 标准：14px
 */
export const BASE_FONT_SIZE = 14

/**
 * 响应式字体配置
 * 使用 CSS clamp() 函数实现流体排版
 * 格式：clamp(最小值, 理想值, 最大值)
 */
export const FLUID_FONT_SIZES = {
  /** 超小字体：12-14px，用于辅助信息 */
  xxs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',

  /** 特小字体：14-16px，用于次要文本 */
  xs: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',

  /** 小字体：16-18px，用于标签和说明 */
  sm: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',

  /** 基础字体：16-18px，正文文本 */
  md: 'clamp(1rem, 0.95rem + 0.5vw, 1.25rem)',

  /** 大字体：18-20px，强调文本 */
  lg: 'clamp(1.125rem, 1.05rem + 0.625vw, 1.375rem)',

  /** 超大字体：20-24px，小标题 */
  xl: 'clamp(1.25rem, 1.15rem + 0.75vw, 1.5rem)',

  /** 二倍大字体：26-32px，标题 */
  '2xl': 'clamp(1.625rem, 1.45rem + 1.125vw, 2rem)',

  /** 三倍大字体：34-42px，主标题 */
  '3xl': 'clamp(2.125rem, 1.75rem + 2vw, 2.625rem)',

  /** 四倍大字体：42-52px，超大标题 */
  '4xl': 'clamp(2.625rem, 2.125rem + 2.5vw, 3.25rem)',
} as const

/**
 * 固定字体大小（rem）
 * 基于 Arco Design 14px 基准
 * 用于 Mantine 主题和需要固定大小的场景
 */
export const FIXED_FONT_SIZES = {
  xxs: 0.857, // 12px (12/14)
  xs: 1, // 14px (14/14) - Arco Design 基础字号
  sm: 1.143, // 16px (16/14)
  md: 1.286, // 18px (18/14)
  lg: 1.429, // 20px (20/14)
  xl: 1.714, // 24px (24/14)
  '2xl': 2, // 28px (28/14)
  '3xl': 2.286, // 32px (32/14)
  '4xl': 2.571, // 36px (36/14)
} as const

/**
 * 字体大小（像素值）
 * 基于 Arco Design 规范
 * 用于需要像素值的场景（如图标大小）
 */
export const FONT_SIZES_PX = {
  xxs: 12,
  xs: 14, // Arco Design 基础字号
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 36,
} as const

/**
 * 行高配置
 * 与字体大小相对应，确保良好的可读性
 */
export const LINE_HEIGHTS = {
  /** 紧凑行高：1.2，用于标题 */
  tight: 1.2,

  /** 标准行高：1.5，用于正文 */
  normal: 1.5,

  /** 宽松行高：1.75，用于长文本 */
  relaxed: 1.75,

  /** 超宽松行高：2，用于特殊场景 */
  loose: 2,
} as const

/**
 * 字体粗细配置
 */
export const FONT_WEIGHTS = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const

/**
 * 字体家族配置
 */
export const FONT_FAMILIES = {
  sans: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const

/**
 * 工具函数：将 rem 转换为像素
 */
export function remToPx(rem: number): number {
  return rem * BASE_FONT_SIZE
}

/**
 * 工具函数：将像素转换为 rem
 */
export function pxToRem(px: number): number {
  return px / BASE_FONT_SIZE
}

/**
 * 工具函数：格式化 rem 值为 CSS 字符串
 */
export function rem(value: number): string {
  return `${value}rem`
}

/**
 * 类型定义
 */
export type FontSizeKey = keyof typeof FIXED_FONT_SIZES
export type LineHeightKey = keyof typeof LINE_HEIGHTS
export type FontWeightKey = keyof typeof FONT_WEIGHTS
