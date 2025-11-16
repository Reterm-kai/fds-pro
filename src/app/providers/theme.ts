import { createTheme, rem } from '@mantine/core'
import {
  FIXED_FONT_SIZES,
  LINE_HEIGHTS,
  FONT_WEIGHTS,
  FONT_FAMILIES,
} from '@/shared/config/typography'

/**
 * Mantine theme configuration
 * Central place for spacing / radius / typography so the UI stays consistent.
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

  // Breakpoints (kept from original config)
  breakpoints: {
    xs: '36em', // 576px
    sm: '48em', // 768px
    md: '62em', // 992px
    lg: '75em', // 1200px
    xl: '88em', // 1408px
  },

  // Font sizes derived from FIXED_FONT_SIZES
  fontSizes: {
    xs: `${FIXED_FONT_SIZES.xs}rem`,
    sm: `${FIXED_FONT_SIZES.sm}rem`,
    md: `${FIXED_FONT_SIZES.md}rem`,
    lg: `${FIXED_FONT_SIZES.lg}rem`,
    xl: `${FIXED_FONT_SIZES.xl}rem`,
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

  // Radius system (slightly lighter to reduce visual heaviness)
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

  // Heading styles
  headings: {
    fontFamily: FONT_FAMILIES.sans,
    fontWeight: String(FONT_WEIGHTS.semibold),
    sizes: {
      h1: {
        fontSize: rem(FIXED_FONT_SIZES['3xl']),
        lineHeight: String(LINE_HEIGHTS.tight),
      },
      h2: {
        fontSize: rem(FIXED_FONT_SIZES['2xl']),
        lineHeight: '1.3',
      },
      h3: {
        fontSize: rem(FIXED_FONT_SIZES.xl),
        lineHeight: '1.35',
      },
      h4: {
        fontSize: rem(FIXED_FONT_SIZES.lg),
        lineHeight: '1.4',
      },
      h5: {
        fontSize: rem(FIXED_FONT_SIZES.md),
        lineHeight: String(LINE_HEIGHTS.normal),
      },
      h6: {
        fontSize: rem(FIXED_FONT_SIZES.sm),
        lineHeight: String(LINE_HEIGHTS.normal),
      },
    },
  },

  // Component-level defaults to make the overall UI more compact by default
  components: {
    Text: {
      defaultProps: {
        // 默认正文字号：sm ≈ 14px，作为全局基础字号
        size: 'sm',
      },
    },
    Button: {
      defaultProps: {
        size: 'sm',
        radius: 'sm',
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
