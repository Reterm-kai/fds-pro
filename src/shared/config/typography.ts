/**
 * Typography configuration
 * Single source of truth for font sizes / line heights / weights.
 * All theme and component typography should reference values from here.
 */

/**
 * Base font size in pixels (used for rem/px helpers)
 */
export const BASE_FONT_SIZE = 16

/**
 * Fluid font sizes using CSS clamp()
 * Format: clamp(min, preferred, max)
 */
export const FLUID_FONT_SIZES = {
  xxs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', // 12–14px
  xs: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', // 14–16px
  sm: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', // 16–18px
  md: 'clamp(1rem, 0.95rem + 0.5vw, 1.25rem)', // 16–20px
  lg: 'clamp(1.125rem, 1.05rem + 0.625vw, 1.375rem)', // 18–22px
  xl: 'clamp(1.25rem, 1.15rem + 0.75vw, 1.5rem)', // 20–24px
  '2xl': 'clamp(1.625rem, 1.45rem + 1.125vw, 2rem)', // 26–32px
  '3xl': 'clamp(2.125rem, 1.75rem + 2vw, 2.625rem)', // 34–42px
  '4xl': 'clamp(2.625rem, 2.125rem + 2.5vw, 3.25rem)', // 42–52px
} as const

/**
 * Fixed font sizes in rem
 * Used by Mantine theme and places that need fixed sizes.
 * We keep base body text around 14px.
 */
export const FIXED_FONT_SIZES = {
  xxs: 0.75, // 12px
  xs: 0.8125, // 13px
  sm: 0.875, // 14px
  md: 1, // 16px
  lg: 1.125, // 18px
  xl: 1.25, // 20px
  '2xl': 1.5, // 24px
  '3xl': 1.875, // 30px
  '4xl': 2.25, // 36px
} as const

/**
 * Font sizes in pixels for places that require px values (e.g. icons)
 */
export const FONT_SIZES_PX = {
  xxs: 12,
  xs: 13,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const

/**
 * Line heights
 */
export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const

/**
 * Font weights
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
 * Font families
 */
export const FONT_FAMILIES = {
  // 优先使用 Inter，其次系统无衬线和常见中文无衬线字体
  sans:
    'Inter, -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Noto Sans", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const

/**
 * Helpers
 */
export function remToPx(rem: number): number {
  return rem * BASE_FONT_SIZE
}

export function pxToRem(px: number): number {
  return px / BASE_FONT_SIZE
}

export function rem(value: number): string {
  return `${value}rem`
}

export type FontSizeKey = keyof typeof FIXED_FONT_SIZES
export type LineHeightKey = keyof typeof LINE_HEIGHTS
export type FontWeightKey = keyof typeof FONT_WEIGHTS

