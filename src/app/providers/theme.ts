import { createTheme, rem } from '@mantine/core'
import {
  FIXED_FONT_SIZES,
  LINE_HEIGHTS,
  FONT_WEIGHTS,
  FONT_FAMILIES,
} from '@/shared/config/typography'

/**
 * Mantine 主题配置
 * 实现响应式字体和间距系统，使用统一的 typography 配置
 */
export const theme = createTheme({
  /** rem 单位缩放系数，默认基于 16px */
  scale: 1,

  /** 字体平滑处理 */
  fontSmoothing: true,

  /** 自动对比度，根据背景色自动调整文本颜色 */
  autoContrast: true,
  luminanceThreshold: 0.3,

  /** 默认焦点环样式 */
  focusRing: 'auto',

  /** 默认字体大小 - 应用到所有未指定 size 的组件 */
  fontFamily: FONT_FAMILIES.sans,

  /** 响应式断点（与 CSS 变量保持一致）*/
  breakpoints: {
    xs: '36em', // 576px
    sm: '48em', // 768px
    md: '62em', // 992px
    lg: '75em', // 1200px
    xl: '88em', // 1408px
  },

  /** 响应式字体大小系统（使用统一配置）*/
  fontSizes: {
    xs: `${FIXED_FONT_SIZES.xs}rem`,
    sm: `${FIXED_FONT_SIZES.sm}rem`,
    md: `${FIXED_FONT_SIZES.md}rem`,
    lg: `${FIXED_FONT_SIZES.lg}rem`,
    xl: `${FIXED_FONT_SIZES.xl}rem`,
  },

  /** 行高系统（使用统一配置）*/
  lineHeights: {
    xs: String(LINE_HEIGHTS.tight),
    sm: '1.35',
    md: String(LINE_HEIGHTS.normal),
    lg: '1.65',
    xl: String(LINE_HEIGHTS.relaxed),
  },

  /** 响应式间距系统（使用 rem 单位）*/
  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  /** 圆角系统（使用 rem 单位实现响应式）*/
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(16),
    xl: rem(32),
  },

  /** 默认圆角 */
  defaultRadius: 'sm',

  /** 阴影系统 */
  shadows: {
    xs: '0 0.0625rem 0.125rem rgba(0, 0, 0, 0.05)',
    sm: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.05)',
    md: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
    lg: '0 0.625rem 1rem rgba(0, 0, 0, 0.15)',
    xl: '0 1rem 2rem rgba(0, 0, 0, 0.2)',
  },

  /** 标题样式配置（使用统一配置）*/
  headings: {
    fontFamily: FONT_FAMILIES.sans,
    fontWeight: String(FONT_WEIGHTS.semibold),
    sizes: {
      h1: {
        fontSize: rem(FIXED_FONT_SIZES['3xl']),
        lineHeight: String(LINE_HEIGHTS.tight),
      },
      h2: {
        fontSize: rem(FIXED_FONT_SIZES['2xl'] + 0.25),
        lineHeight: '1.3',
      },
      h3: {
        fontSize: rem(FIXED_FONT_SIZES['2xl']),
        lineHeight: '1.35',
      },
      h4: {
        fontSize: rem(FIXED_FONT_SIZES.xl),
        lineHeight: '1.4',
      },
      h5: {
        fontSize: rem(FIXED_FONT_SIZES.lg),
        lineHeight: String(LINE_HEIGHTS.normal),
      },
      h6: {
        fontSize: rem(FIXED_FONT_SIZES.md),
        lineHeight: String(LINE_HEIGHTS.normal),
      },
    },
  },

  /** 其他自定义配置 */
  other: {
    /** 容器最大宽度 */
    containerSizes: {
      xs: rem(540),
      sm: rem(720),
      md: rem(960),
      lg: rem(1140),
      xl: rem(1320),
    },
  },
})
