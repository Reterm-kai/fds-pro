import {
  Paper,
  Grid,
  TextInput,
  Select,
  Group,
  Button,
} from '@mantine/core'
import { Search, RotateCw } from 'lucide-react'
import type {
  CollectionContentType,
  CollectionStrategy,
  CollectionStatus,
} from '@/entities/collection'

interface CollectionListFiltersProps {
  code: string
  name: string
  contentType: CollectionContentType | ''
  strategy: CollectionStrategy | ''
  status: CollectionStatus | ''
  createdFrom: string
  createdTo: string
  loading?: boolean
  onCodeChange: (value: string) => void
  onNameChange: (value: string) => void
  onContentTypeChange: (value: CollectionContentType | '') => void
  onStrategyChange: (value: CollectionStrategy | '') => void
  onStatusChange: (value: CollectionStatus | '') => void
  onCreatedFromChange: (value: string) => void
  onCreatedToChange: (value: string) => void
  onSearch: () => void
  onReset: () => void
}

/**
 * 集合列表筛选区域
 *
 * 支持按照编号、名称、内容体裁、策略方式、状态和创建时间范围进行检索
 */
export function CollectionListFilters({
  code,
  name,
  contentType,
  strategy,
  status,
  createdFrom,
  createdTo,
  loading,
  onCodeChange,
  onNameChange,
  onContentTypeChange,
  onStrategyChange,
  onStatusChange,
  onCreatedFromChange,
  onCreatedToChange,
  onSearch,
  onReset,
}: CollectionListFiltersProps) {
  const hasFilters =
    code ||
    name ||
    contentType ||
    strategy ||
    status ||
    createdFrom ||
    createdTo

  return (
    <Paper withBorder radius="md" shadow="xs" p="md">
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <TextInput
            label="集合编号"
            placeholder="请输入集合编号"
            value={code}
            onChange={event => onCodeChange(event.currentTarget.value)}
            disabled={loading}
            name="collection-code"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <TextInput
            label="集合名称"
            placeholder="请输入集合名称"
            value={name}
            onChange={event => onNameChange(event.currentTarget.value)}
            disabled={loading}
            name="collection-name"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Select
            label="内容体裁"
            placeholder="全部"
            value={contentType}
            onChange={value =>
              onContentTypeChange(
                (value as CollectionContentType) || ''
              )
            }
            data={[
              { value: '', label: '全部' },
              { value: 'image', label: '图文' },
              { value: 'template', label: '模板视频' },
              { value: 'video', label: '短视频' },
              { value: 'text', label: '文本' },
            ]}
            clearable
            disabled={loading}
            name="content-type"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Select
            label="筛选方式"
            placeholder="全部"
            value={strategy}
            onChange={value =>
              onStrategyChange((value as CollectionStrategy) || '')
            }
            data={[
              { value: '', label: '全部' },
              { value: 'artificial', label: '人工筛选' },
              { value: 'rules', label: '规则筛选' },
            ]}
            clearable
            disabled={loading}
            name="strategy"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <TextInput
            type="date"
            label="创建时间起"
            placeholder="开始日期"
            value={createdFrom}
            onChange={event =>
              onCreatedFromChange(event.currentTarget.value)
            }
            disabled={loading}
            name="created-from"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <TextInput
            type="date"
            label="创建时间止"
            placeholder="结束日期"
            value={createdTo}
            onChange={event =>
              onCreatedToChange(event.currentTarget.value)
            }
            disabled={loading}
            name="created-to"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Select
            label="状态"
            placeholder="全部"
            value={status}
            onChange={value =>
              onStatusChange((value as CollectionStatus) || '')
            }
            data={[
              { value: '', label: '全部' },
              { value: 'online', label: '已上架' },
              { value: 'offline', label: '已下架' },
            ]}
            clearable
            disabled={loading}
            name="status"
          />
        </Grid.Col>

        <Grid.Col
          span={{ base: 12, md: 6, lg: 3 }}
          style={{ display: 'flex', alignItems: 'flex-end' }}
        >
          <Group gap="xs" justify="flex-end" w="100%">
            <Button
              leftSection={<Search size={16} />}
              onClick={onSearch}
              disabled={loading}
            >
              查询
            </Button>
            <Button
              variant={hasFilters ? 'light' : 'default'}
              leftSection={<RotateCw size={16} />}
              onClick={onReset}
              disabled={loading}
            >
              重置
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  )
}

