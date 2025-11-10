import { Avatar, AvatarProps } from '@mantine/core'
import type { User } from '../model/types'

interface UserAvatarProps extends Omit<AvatarProps, 'children'> {
  user: User
}

/**
 * 用户头像组件
 * 基础 UI 组件,用于显示用户头像
 */
export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar
      src={user.avatar}
      alt={user.name}
      color="blue"
      radius="xl"
      {...props}
    >
      {user.name.charAt(0).toUpperCase()}
    </Avatar>
  )
}
