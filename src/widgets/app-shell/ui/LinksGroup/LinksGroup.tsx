import { useState } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import type { Icon as TablerIcon } from '@tabler/icons-react'
import {
  Box,
  Collapse,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core'
import { Link } from 'react-router-dom'
import classes from './LinksGroup.module.css'

interface LinksGroupProps {
  icon?: TablerIcon
  label: string
  initiallyOpened?: boolean
  link?: string
  links?: { label: string; link: string }[]
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)

  const items = (hasLinks ? links : []).map(subLink => (
    <Text<typeof Link>
      component={Link}
      className={classes.link}
      to={subLink.link}
      key={subLink.label}
    >
      {subLink.label}
    </Text>
  ))

  const buttonContent = (
    <Group justify="space-between" gap={0}>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <ThemeIcon variant="light" size={30}>
            <Icon size={18} />
          </ThemeIcon>
        )}
        <Box ml={Icon ? 'md' : 0}>{label}</Box>
      </Box>
      {hasLinks && (
        <IconChevronRight
          className={classes.chevron}
          stroke={1.5}
          size={16}
          style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
        />
      )}
    </Group>
  )

  return (
    <>
      {!hasLinks && link ? (
        <UnstyledButton
          component={Link}
          to={link}
          className={classes.control}
        >
          {buttonContent}
        </UnstyledButton>
      ) : (
        <UnstyledButton
          onClick={() => setOpened(o => !o)}
          className={classes.control}
        >
          {buttonContent}
        </UnstyledButton>
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}
