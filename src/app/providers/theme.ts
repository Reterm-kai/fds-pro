import { createTheme, rem, MantineColorsTuple } from '@mantine/core'
import {
  FIXED_FONT_SIZES,
  LINE_HEIGHTS,
  FONT_WEIGHTS,
  FONT_FAMILIES,
} from '@/shared/config/typography'
import {
  ARCO_BLUE,
  ARCO_GREEN,
  ARCO_ORANGE,
  ARCO_RED,
  ARCO_CYAN,
  ARCO_GRAY,
  ARCO_PURPLE,
  ARCO_MAGENTA,
  ARCO_SPACING,
  ARCO_RADIUS,
  ARCO_SHADOWS,
} from '@/shared/config/arco-design-tokens'

/**
 * Mantine 主题配置
 * 完全遵循 Arco Design 设计规范
 * 包括颜色、间距、圆角、阴影、字体等所有设计 tokens
 */

/**
 * Arco Design 色板转换为 Mantine ColorsTuple
 */
const arcoblue: MantineColorsTuple = [
  ARCO_BLUE[1],
  ARCO_BLUE[2],
  ARCO_BLUE[3],
  ARCO_BLUE[4],
  ARCO_BLUE[5],
  ARCO_BLUE[6], // 主色
  ARCO_BLUE[7],
  ARCO_BLUE[8],
  ARCO_BLUE[9],
  ARCO_BLUE[10],
]

const arcogreen: MantineColorsTuple = [
  ARCO_GREEN[1],
  ARCO_GREEN[2],
  ARCO_GREEN[3],
  ARCO_GREEN[4],
  ARCO_GREEN[5],
  ARCO_GREEN[6], // 成功色
  ARCO_GREEN[7],
  ARCO_GREEN[8],
  ARCO_GREEN[9],
  ARCO_GREEN[10],
]

const arcoorange: MantineColorsTuple = [
  ARCO_ORANGE[1],
  ARCO_ORANGE[2],
  ARCO_ORANGE[3],
  ARCO_ORANGE[4],
  ARCO_ORANGE[5],
  ARCO_ORANGE[6], // 警告色
  ARCO_ORANGE[7],
  ARCO_ORANGE[8],
  ARCO_ORANGE[9],
  ARCO_ORANGE[10],
]

const arcored: MantineColorsTuple = [
  ARCO_RED[1],
  ARCO_RED[2],
  ARCO_RED[3],
  ARCO_RED[4],
  ARCO_RED[5],
  ARCO_RED[6], // 错误色
  ARCO_RED[7],
  ARCO_RED[8],
  ARCO_RED[9],
  ARCO_RED[10],
]

const arcocyan: MantineColorsTuple = [
  ARCO_CYAN[1],
  ARCO_CYAN[2],
  ARCO_CYAN[3],
  ARCO_CYAN[4],
  ARCO_CYAN[5],
  ARCO_CYAN[6], // 链接色
  ARCO_CYAN[7],
  ARCO_CYAN[8],
  ARCO_CYAN[9],
  ARCO_CYAN[10],
]

const arcogray: MantineColorsTuple = [
  ARCO_GRAY[1],
  ARCO_GRAY[2],
  ARCO_GRAY[3],
  ARCO_GRAY[4],
  ARCO_GRAY[5],
  ARCO_GRAY[6], // 中性色
  ARCO_GRAY[7],
  ARCO_GRAY[8],
  ARCO_GRAY[9],
  ARCO_GRAY[10],
]

const arcopurple: MantineColorsTuple = [
  ARCO_PURPLE[1],
  ARCO_PURPLE[2],
  ARCO_PURPLE[3],
  ARCO_PURPLE[4],
  ARCO_PURPLE[5],
  ARCO_PURPLE[6],
  ARCO_PURPLE[7],
  ARCO_PURPLE[8],
  ARCO_PURPLE[9],
  ARCO_PURPLE[10],
]

const arcomagenta: MantineColorsTuple = [
  ARCO_MAGENTA[1],
  ARCO_MAGENTA[2],
  ARCO_MAGENTA[3],
  ARCO_MAGENTA[4],
  ARCO_MAGENTA[5],
  ARCO_MAGENTA[6],
  ARCO_MAGENTA[7],
  ARCO_MAGENTA[8],
  ARCO_MAGENTA[9],
  ARCO_MAGENTA[10],
]

export const theme = createTheme({
  /** rem 单位缩放系数，基于 14px */
  scale: 14 / 16,

  /** 字体平滑处理 */
  fontSmoothing: true,

  /** 自动对比度，根据背景色自动调整文本颜色 */
  autoContrast: true,
  luminanceThreshold: 0.3,

  /** 默认焦点环样式 */
  focusRing: 'auto',

  /** 默认字体 */
  fontFamily: FONT_FAMILIES.sans,

  /** 默认文本颜色 */
  black: '#1d2129', // Arco Gray 10 - 主要文本颜色
  white: '#ffffff',

  /** Arco Design 色板 */
  colors: {
    arcoblue,
    arcogreen,
    arcoorange,
    arcored,
    arcocyan,
    arcogray,
    arcopurple,
    arcomagenta,
  },

  /** 主色 */
  primaryColor: 'arcoblue',

  /** 响应式断点 */
  breakpoints: {
    xs: '36em', // 576px
    sm: '48em', // 768px
    md: '62em', // 992px
    lg: '75em', // 1200px
    xl: '88em', // 1408px
  },

  /** 响应式字体大小系统 */
  fontSizes: {
    xs: `${FIXED_FONT_SIZES.xs}rem`,
    sm: `${FIXED_FONT_SIZES.sm}rem`,
    md: `${FIXED_FONT_SIZES.md}rem`,
    lg: `${FIXED_FONT_SIZES.lg}rem`,
    xl: `${FIXED_FONT_SIZES.xl}rem`,
  },

  /** 行高系统 */
  lineHeights: {
    xs: String(LINE_HEIGHTS.tight),
    sm: '1.35',
    md: String(LINE_HEIGHTS.normal),
    lg: '1.65',
    xl: String(LINE_HEIGHTS.relaxed),
  },

  /** Arco Design 间距系统 */
  spacing: {
    xs: rem(ARCO_SPACING.mini), // 4px
    sm: rem(ARCO_SPACING.small), // 8px
    md: rem(ARCO_SPACING.default), // 16px
    lg: rem(ARCO_SPACING.large), // 20px
    xl: rem(ARCO_SPACING.xlarge), // 24px
  },

  /** Arco Design 圆角系统 - 方正简洁风格 */
  radius: {
    xs: rem(ARCO_RADIUS.small), // 2px
    sm: rem(ARCO_RADIUS.small), // 2px
    md: rem(ARCO_RADIUS.medium), // 4px
    lg: rem(ARCO_RADIUS.large), // 8px
    xl: rem(ARCO_RADIUS.large), // 8px
  },

  /** 默认圆角 - 小圆角，方正风格 */
  defaultRadius: 'sm',

  /** Arco Design 阴影系统 */
  shadows: {
    xs: ARCO_SHADOWS[1], // 最小阴影
    sm: ARCO_SHADOWS[2], // 小阴影
    md: ARCO_SHADOWS[3], // 中阴影
    lg: ARCO_SHADOWS[4], // 大阴影
    xl: ARCO_SHADOWS[5], // 超大阴影
  },

  /** 标题样式配置 */
  headings: {
    fontFamily: FONT_FAMILIES.sans,
    fontWeight: String(FONT_WEIGHTS.semibold),
    sizes: {
      h1: {
        fontSize: rem(FIXED_FONT_SIZES['3xl']),
        lineHeight: String(LINE_HEIGHTS.tight),
      },
      h2: {
        fontSize: rem(FIXED_FONT_SIZES['2xl'] + 0.286),
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

  /** 组件默认属性 - 应用 Arco Design 风格到所有组件 */
  components: {
    Button: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
      styles: {
        root: {
          fontWeight: 400, // Arco Design 按钮字重为 400（正常）
          fontSize: '14px', // Arco Design 基准字号
          height: '32px', // Arco Design 中等按钮高度
          lineHeight: '32px',
          padding: '0 15px', // Arco Design 按钮内边距
        },
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
      styles: {
        input: {
          fontSize: '14px', // Arco Design 基准字号
          height: '32px', // Arco Design 输入框高度
          lineHeight: '32px',
          padding: '0 12px', // Arco Design 输入框内边距
          borderWidth: '1px', // Arco Design 边框粗细
          borderColor: '#e5e6eb', // Arco Gray 3
          '&:hover': {
            borderColor: '#a9aeb8', // Arco Gray 5
          },
          '&:focus': {
            borderColor: '#165dff', // Arco Blue 6
          },
        },
        label: {
          fontSize: '14px',
          fontWeight: 500,
          color: '#1d2129', // Arco Gray 10 - 主要文本
          marginBottom: '4px',
        },
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
      styles: {
        input: {
          fontSize: '14px',
          height: '32px',
          lineHeight: '32px',
          padding: '0 12px',
          borderWidth: '1px',
          borderColor: '#e5e6eb',
          '&:hover': {
            borderColor: '#a9aeb8',
          },
          '&:focus': {
            borderColor: '#165dff',
          },
        },
        label: {
          fontSize: '14px',
          fontWeight: 500,
          color: '#1d2129',
          marginBottom: '4px',
        },
      },
    },
    NumberInput: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
    },
    Textarea: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
    },
    Select: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
      styles: {
        input: {
          fontSize: '14px',
          height: '32px',
          lineHeight: '32px',
          padding: '0 12px',
          borderWidth: '1px',
          borderColor: '#e5e6eb',
          '&:hover': {
            borderColor: '#a9aeb8',
          },
          '&:focus': {
            borderColor: '#165dff',
          },
        },
        label: {
          fontSize: '14px',
          fontWeight: 500,
          color: '#1d2129',
          marginBottom: '4px',
        },
      },
    },
    MultiSelect: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
    },
    Card: {
      defaultProps: {
        radius: 'md', // 4px 中圆角
        shadow: 'sm', // Arco Design 小阴影
      },
    },
    Paper: {
      defaultProps: {
        radius: 'md', // 4px 中圆角
      },
    },
    Modal: {
      defaultProps: {
        radius: 'md', // 4px 中圆角
        shadow: 'md', // Arco Design 中阴影
      },
    },
    Drawer: {
      defaultProps: {
        radius: 0, // 抽屉无圆角
        shadow: 'lg', // Arco Design 大阴影
      },
    },
    Popover: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
        shadow: 'sm', // Arco Design 小阴影
      },
    },
    Menu: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
        shadow: 'sm', // Arco Design 小阴影
      },
    },
    Tooltip: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
    },
    Badge: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
    },
    Checkbox: {
      defaultProps: {
        radius: 'xs', // 2px 最小圆角
      },
    },
    Radio: {
      defaultProps: {
        radius: 'xl', // 圆形
      },
    },
    Switch: {
      defaultProps: {
        radius: 'xl', // 圆形
      },
    },
    ActionIcon: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
    },
    Avatar: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角（方形头像，Arco 风格）
      },
    },
    Image: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
    },
    Alert: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
    },
    Notification: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
    },
    Table: {
      defaultProps: {
        highlightOnHover: true,
        withTableBorder: true,
        withColumnBorders: false,
      },
    },
  },
})
