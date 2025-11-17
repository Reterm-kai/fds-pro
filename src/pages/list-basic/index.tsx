import { Title, Text } from '@mantine/core'
import { CollectionsBasicView } from '@/features/basic-list'
import classes from './BasicListPage.module.css'

/**
 * 基础列表页面
 *
 * 展示支持分页、检索和排序的标准查询表格
 */
export function BasicListPage() {
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.header}>
          <Title order={1}>基础列表</Title>
          <Text size="sm" c="dimmed">
            典型的查询表格模板，支持分页、检索和排序能力，可用于大多数业务列表场景。
          </Text>
        </div>

        <CollectionsBasicView />
      </div>
    </div>
  )
}

