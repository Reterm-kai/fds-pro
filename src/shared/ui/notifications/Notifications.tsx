import { notifications } from '@mantine/notifications'
import { IconCheck, IconInfoSmall, IconX } from '@tabler/icons-react'
import type { JSX } from 'react'

/*
 * 应用全局通知工具方法集合。
 *
 * 设计目标：
 * - 统一 success / error / info 的视觉风格（与 Mantine Notifications 组件保持一致）
 * - 集中管理颜色 / 图标 / 自动关闭时间等配置，避免在业务代码中散落魔法值
 * - 为业务代码提供语义化的快捷方法，调用方只关注文案，不关心展示细节
 */
export interface AppNotificationOptions {
  /*
   * 通知标题（主文案，用于概括本次操作结果或异常原因）
   */
  title: string
  /*
   * 通知正文（详细描述，用于补充上下文信息）
   */
  message: string
  /*
   * 自动关闭时间（毫秒）。
   * 传入 false 时表示不自动关闭，需要用户手动关闭。
   * 默认按不同通知类型使用预设值（成功较短、错误较长、信息居中）。
   */
  autoClose?: number | boolean
  /*
   * 是否显示关闭按钮。
   * 默认值为 true，一般情况下业务无需修改，仅在需要“强提醒”时可关闭按钮并配合 autoClose=false 使用。
   */
  withCloseButton?: boolean
}

type AppNotificationType = 'success' | 'error' | 'info'

/*
 * 所有通知共用的默认配置（业务侧不传时的基础行为）
 */
const DEFAULT_NOTIFICATION_OPTIONS = {
  withCloseButton: true,
  radius: 'md' as const,
}

/*
 * 各通知类型的基础配置：
 * - color: Mantine 主题色名称，用于统一不同类型的视觉语义
 * - icon: Tabler 图标组件，增强可读性
 * - autoClose: 默认自动关闭时间（业务可通过 options.autoClose 覆写）
 */
const NOTIFICATION_TYPE_CONFIG: Record<
  AppNotificationType,
  {
    color: string
    autoClose: number
    icon: JSX.Element
  }
> = {
  success: {
    /*
     * 成功通知：绿色 + 对勾图标（与 Mantine 官方示例保持一致）
     */
    color: 'teal',
    autoClose: 3000,
    icon: <IconCheck size={20} />,
  },
  error: {
    /*
     * 错误通知：红色 + 关闭图标，展示时间稍长方便用户阅读错误信息
     */
    color: 'red',
    autoClose: 5000,
    icon: <IconX size={20} />,
  },
  info: {
    /*
     * 信息通知：蓝色 + 信息图标，用于中性提示
     */
    color: 'blue',
    autoClose: 4000,
    icon: <IconInfoSmall size={20} />,
  },
}

/*
 * 内部工具方法：
 * 根据通知类型读取基础配置，并与调用方传入的 options 合并后展示通知。
 * 调用方只需要关心业务文案与特殊需求（如不自动关闭），无需关注颜色与图标等细节。
 */
function showAppNotification(
  type: AppNotificationType,
  options: AppNotificationOptions
) {
  const typeConfig = NOTIFICATION_TYPE_CONFIG[type]

  notifications.show({
    ...DEFAULT_NOTIFICATION_OPTIONS,
    ...options,
    color: typeConfig.color,
    icon: typeConfig.icon,
    autoClose: options.autoClose ?? typeConfig.autoClose,
    withCloseButton:
      options.withCloseButton ?? DEFAULT_NOTIFICATION_OPTIONS.withCloseButton,
  })
}

/*
 * 成功通知：用于表示操作已正确完成，例如“创建成功”、“保存成功”等。
 */
export function showSuccessNotification(options: AppNotificationOptions) {
  showAppNotification('success', options)
}

/*
 * 错误通知：用于表示操作失败或发生异常，例如“请求失败”、“表单校验失败”等。
 */
export function showErrorNotification(options: AppNotificationOptions) {
  showAppNotification('error', options)
}

/*
 * 信息通知：用于中性信息提示，不代表成功或失败，例如“功能说明”、“操作提醒”等。
 */
export function showInfoNotification(options: AppNotificationOptions) {
  showAppNotification('info', options)
}
