import { useState } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import type { Icon as TablerIcon } from '@tabler/icons-react'
import {
  Box,
  Collapse,
  Text,
  UnstyledButton,
  HoverCard,
  Stack,
  Center,
} from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import classes from './LinksGroup.module.css'

interface LinksGroupProps {
  icon?: TablerIcon
  label: string
  initiallyOpened?: boolean
  link?: string
  links?: { label: string; link: string }[]
  collapsed?: boolean
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
  collapsed = false,
}: LinksGroupProps) {
  const location = useLocation()
  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)

  // 精确匹配:只有当前路由完全匹配时才激活
  const isActive = link && location.pathname === link

  // 子菜单中是否有激活项(用于收缩模式的图标高亮)
  const hasActiveChild =
    hasLinks && links?.some(subLink => location.pathname === subLink.link)

  // 生成普通模式的子菜单项
  const items = (hasLinks ? links : []).map(subLink => {
    const isSubLinkActive = location.pathname === subLink.link
    return (
      <Text<typeof Link>
        component={Link}
        className={`${classes.link} ${isSubLinkActive ? classes.linkActive : ''}`}
        to={subLink.link}
        key={subLink.label}
      >
        {subLink.label}
      </Text>
    )
  })

  // 生成 Popover 模式的子菜单项
  const popoverItems = (hasLinks ? links : []).map(subLink => {
    const isSubLinkActive = location.pathname === subLink.link
    return (
      <Text<typeof Link>
        component={Link}
        className={`${classes.popoverLink} ${isSubLinkActive ? classes.popoverLinkActive : ''}`}
        to={subLink.link}
        key={subLink.label}
      >
        {subLink.label}
      </Text>
    )
  })

  // 收缩模式：仅显示图标
  if (collapsed && Icon) {
    // 收缩模式下:本身激活或子菜单有激活项都显示激活状态
    const isCollapsedActive = isActive || hasActiveChild

    const iconButton =
      !hasLinks && link ? (
        <UnstyledButton
          component={Link}
          to={link}
          className={`${classes.collapsedControl} ${isCollapsedActive ? classes.active : ''}`}
          data-active={isCollapsedActive || undefined}
        >
          <Center>
            <Icon size={24} />
          </Center>
        </UnstyledButton>
      ) : (
        <UnstyledButton
          className={`${classes.collapsedControl} ${isCollapsedActive ? classes.active : ''}`}
          data-active={isCollapsedActive || undefined}
        >
          <Center>
            <Icon size={24} />
          </Center>
        </UnstyledButton>
      )

    // 如果有子菜单,使用 HoverCard (hover 触发)
    if (hasLinks) {
      return (
        <HoverCard
          position="right-start"
          withArrow
          shadow="md"
          offset={12}
          openDelay={100}
          closeDelay={100}
        >
          <HoverCard.Target>{iconButton}</HoverCard.Target>
          <HoverCard.Dropdown p={0}>
            <Box px="xs" pt="xs" pb={4}>
              <Text
                size="sm"
                fw={600}
                c="dimmed"
                className={classes.popoverTitle}
              >
                {label}
              </Text>
            </Box>
            <Box px="xs" pb="xs">
              <Stack gap={2}>{popoverItems}</Stack>
            </Box>
          </HoverCard.Dropdown>
        </HoverCard>
      )
    }

    // 无子菜单,使用 HoverCard (hover 触发)
    return (
      <HoverCard
        position="right"
        withArrow
        offset={12}
        openDelay={100}
        closeDelay={100}
      >
        <HoverCard.Target>{iconButton}</HoverCard.Target>
        <HoverCard.Dropdown p="sm">
          <Text size="sm" fw={500}>
            {label}
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    )
  }

  // 正常模式
  const buttonContent = (
    <>
      <Box className={classes.iconWrapper}>{Icon && <Icon size={20} />}</Box>
      <Box className={classes.labelWrapper} ml={Icon ? 'sm' : 0}>
        {label}
      </Box>
      {hasLinks && (
        <Box ml="auto">
          <IconChevronRight
            className={classes.chevron}
            stroke={1.5}
            size={16}
            style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
          />
        </Box>
      )}
    </>
  )

  return (
    <>
      {!hasLinks && link ? (
        <UnstyledButton
          component={Link}
          to={link}
          className={`${classes.control} ${isActive ? classes.active : ''}`}
          data-active={isActive || undefined}
        >
          {buttonContent}
        </UnstyledButton>
      ) : (
        <UnstyledButton
          onClick={() => setOpened(o => !o)}
          className={`${classes.control} ${isActive ? classes.active : ''}`}
          data-active={isActive || undefined}
        >
          {buttonContent}
        </UnstyledButton>
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}
