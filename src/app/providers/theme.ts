import { createTheme, rem } from '@mantine/core'
import {
  FIXED_FONT_SIZES,
  LINE_HEIGHTS,
  FONT_WEIGHTS,
  FONT_FAMILIES,
} from '@/shared/config/typography'

/**
 * Mantine theme configuration
 * 集中管理 spacing / radius / typography，保证全局一致性。
 */
export const theme = createTheme({
  // Base scale and rendering
  scale: 1,
  fontSmoothing: true,
  autoContrast: true,
  luminanceThreshold: 0.3,
  focusRing: 'auto',

  // Global font family
  fontFamily: FONT_FAMILIES.sans,

  // Breakpoints（保持原有配置）
  breakpoints: {
    xs: '36em', // 576px
    sm: '48em', // 768px
    md: '62em', // 992px
    lg: '75em', // 1200px
    xl: '88em', // 1408px
  },

  // Font sizes derived from FIXED_FONT_SIZES
  // 约束：正文 14px，组件字号最大 16px（标题单独控制）
  fontSizes: {
    xs: `${FIXED_FONT_SIZES.xs}rem`, // 13px
    sm: `${FIXED_FONT_SIZES.sm}rem`, // 14px（默认正文）
    md: `${FIXED_FONT_SIZES.md}rem`, // 16px（组件最大字号）
    lg: `${FIXED_FONT_SIZES.md}rem`, // 收敛到 16px
    xl: `${FIXED_FONT_SIZES.md}rem`, // 收敛到 16px
  },

  // Line heights
  lineHeights: {
    xs: String(LINE_HEIGHTS.tight),
    sm: '1.35',
    md: String(LINE_HEIGHTS.normal),
    lg: '1.65',
    xl: String(LINE_HEIGHTS.relaxed),
  },

  // Spacing system (matches design doc: xs10 / sm12 / md16 / lg20 / xl32)
  spacing: {
    xs: rem(10),
    sm: rem(12),
    md: rem(16),
    lg: rem(20),
    xl: rem(32),
  },

  // Radius system（稍微轻一点，避免太重）
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(6),
    lg: rem(10),
    xl: rem(16),
  },

  defaultRadius: 'sm',

  // Shadows tuned to feel lighter / cleaner
  shadows: {
    xs: '0 0.0625rem 0.125rem rgba(0, 0, 0, 0.03)',
    sm: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.05)',
    md: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.08)',
    lg: '0 0.5rem 1rem rgba(0, 0, 0, 0.12)',
    xl: '0 0.75rem 1.5rem rgba(0, 0, 0, 0.16)',
  },

  // Heading styles：正文 14px，主标题 18px，其它标题按层级递减
  headings: {
    fontFamily: FONT_FAMILIES.sans,
    fontWeight: String(FONT_WEIGHTS.semibold),
    sizes: {
      h1: {
        // 内容页主标题：18px（全局最大）
        fontSize: `${FIXED_FONT_SIZES.lg}rem`, // 18px
        lineHeight: String(LINE_HEIGHTS.normal),
      },
      h2: {
        // 二级标题：16px
        fontSize: `${FIXED_FONT_SIZES.md}rem`, // 16px
        lineHeight: '1.35',
      },
      h3: {
        // 三级标题：14px
        fontSize: `${FIXED_FONT_SIZES.sm}rem`, // 14px
        lineHeight: '1.4',
      },
      h4: {
        // 四级标题：13px
        fontSize: `${FIXED_FONT_SIZES.xs}rem`, // 13px
        lineHeight: '1.4',
      },
      h5: {
        // 五级标题：12px
        fontSize: `${FIXED_FONT_SIZES.xxs}rem`, // 12px
        lineHeight: String(LINE_HEIGHTS.normal),
      },
      h6: {
        // 六级标题：12px（与 h5 一致，用得很少）
        fontSize: `${FIXED_FONT_SIZES.xxs}rem`, // 12px
        lineHeight: String(LINE_HEIGHTS.normal),
      },
    },
  },

  // Component-level defaults：整体偏紧凑
  components: {
    Text: {
      defaultProps: {
        // 默认正文字号：sm ≈ 14px，作为全局基础字号
        size: 'sm',
      },
    },
    Button: {
      defaultProps: {
        radius: 0,
      },
      styles: {
        root: {
          height: rem(32),
          paddingLeft: rem(16),
          paddingRight: rem(16),
          fontSize: rem(14),
          fontWeight: 400,
        },
      },
      vars: (theme, props) => {
        if (props.variant === 'default') {
          return {
            root: {
              '--button-bg': 'transparent',
              '--button-hover-color': 'var(--mantine-color-text)',
              '--button-bd':
                'calc(var(--mantine-spacing-xs) * 0.1) solid light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-4))',
            },
          }
        }
        return { root: {} }
      },
    },
    TextInput: {
      defaultProps: {
        size: 'sm',
        radius: 'sm',
      },
    },
    Select: {
      defaultProps: {
        size: 'sm',
        radius: 'sm',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'md',
        shadow: 'xs',
      },
    },
  },

  // Other custom options
  other: {
    containerSizes: {
      xs: rem(540),
      sm: rem(720),
      md: rem(960),
      lg: rem(1140),
      xl: rem(1320),
    },
  },
})
