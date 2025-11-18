/**
 * FilterPanel - 通用筛选面板组件
 *
 * 支持多种筛选字段类型,配置化使用
 */

import { useState } from 'react'
import {
  Paper,
  Grid,
  TextInput,
  Select,
  MultiSelect,
  NumberInput,
  Button,
  Group,
  Collapse,
} from '@mantine/core'
import { DateInput, DatePickerInput } from '@mantine/dates'
import { Search, RotateCw, ChevronDown, ChevronUp } from 'lucide-react'
import type { FilterFieldConfig, FilterPanelProps } from './types'

/**
 * 渲染单个筛选字段
 */
function renderField<T extends Record<string, any>>(
  field: FilterFieldConfig,
  values: T,
  onChange: (name: keyof T, value: any) => void,
  loading?: boolean
) {
  const { name, label, type, placeholder, options, disabled, clearable } = field

  const value = values[name]
  const isDisabled =
    loading || (typeof disabled === 'function' ? disabled(values) : disabled)

  const commonProps = {
    label,
    placeholder,
    disabled: isDisabled,
    clearable: clearable !== false,
  }

  switch (type) {
    case 'text':
      return (
        <TextInput
          {...commonProps}
          value={value || ''}
          onChange={e => onChange(name as keyof T, e.currentTarget.value)}
        />
      )

    case 'select':
      return (
        <Select
          {...commonProps}
          value={value || null}
          onChange={val => onChange(name as keyof T, val || '')}
          data={options || []}
        />
      )

    case 'multiSelect':
      return (
        <MultiSelect
          {...commonProps}
          value={value || []}
          onChange={val => onChange(name as keyof T, val)}
          data={options || []}
        />
      )

    case 'date':
      return (
        <DateInput
          {...commonProps}
          value={value ? new Date(value) : null}
          onChange={date =>
            onChange(name as keyof T, date?.toISOString() || '')
          }
          valueFormat="YYYY-MM-DD"
        />
      )

    case 'dateRange':
      return (
        <DatePickerInput
          {...commonProps}
          type="range"
          value={
            value
              ? [
                  value[0] ? new Date(value[0]) : null,
                  value[1] ? new Date(value[1]) : null,
                ]
              : [null, null]
          }
          onChange={dates => {
            const range = dates
              ? [dates[0]?.toISOString() || '', dates[1]?.toISOString() || '']
              : ['', '']
            onChange(name as keyof T, range)
          }}
          valueFormat="YYYY-MM-DD"
        />
      )

    case 'number':
      return (
        <NumberInput
          {...commonProps}
          value={value || ''}
          onChange={val => onChange(name as keyof T, val)}
        />
      )

    case 'numberRange':
      return (
        <Group gap="xs" grow>
          <NumberInput
            placeholder="最小值"
            value={value?.[0] || ''}
            onChange={val => onChange(name as keyof T, [val, value?.[1] || ''])}
            disabled={isDisabled}
          />
          <NumberInput
            placeholder="最大值"
            value={value?.[1] || ''}
            onChange={val => onChange(name as keyof T, [value?.[0] || '', val])}
            disabled={isDisabled}
          />
        </Group>
      )

    default:
      return null
  }
}

export function FilterPanel<T extends Record<string, any>>({
  fields,
  values,
  loading = false,
  collapsible = false,
  defaultCollapsed = false,
  onChange,
  onSearch,
  onReset,
  searchText = '查询',
  resetText = '重置',
  showActions = true,
}: FilterPanelProps<T>) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  // 计算是否有筛选条件
  const hasFilters = Object.values(values).some(v => {
    if (Array.isArray(v)) return v.some(item => item !== '' && item != null)
    return v !== '' && v != null
  })

  // 过滤显示的字段
  const visibleFields = fields.filter(field => {
    if (field.show) {
      return field.show(values)
    }
    return true
  })

  // 分离主要字段和折叠字段
  const displayFields = collapsible
    ? collapsed
      ? visibleFields.slice(0, 3)
      : visibleFields
    : visibleFields

  return (
    <Paper withBorder radius="md" shadow="xs" p="md">
      <Grid gutter="md">
        {displayFields.map(field => (
          <Grid.Col
            key={field.name}
            span={field.span || { base: 12, md: 6, lg: 3 }}
          >
            {renderField(field, values, onChange, loading)}
          </Grid.Col>
        ))}

        {/* 操作按钮 */}
        {showActions && (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Group
              gap="xs"
              style={{
                height: '100%',
                alignItems: 'flex-end',
              }}
            >
              <Button
                leftSection={<Search size={16} />}
                onClick={onSearch}
                disabled={loading}
              >
                {searchText}
              </Button>
              <Button
                variant={hasFilters ? 'light' : 'default'}
                leftSection={<RotateCw size={16} />}
                onClick={onReset}
                disabled={loading}
              >
                {resetText}
              </Button>
              {collapsible && visibleFields.length > 3 && (
                <Button
                  variant="subtle"
                  onClick={() => setCollapsed(!collapsed)}
                  rightSection={
                    collapsed ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronUp size={16} />
                    )
                  }
                >
                  {collapsed ? '展开' : '收起'}
                </Button>
              )}
            </Group>
          </Grid.Col>
        )}
      </Grid>

      {/* 折叠区域 */}
      {collapsible && visibleFields.length > 3 && (
        <Collapse in={!collapsed}>
          <Grid gutter="md" mt="md">
            {visibleFields.slice(3).map(field => (
              <Grid.Col
                key={field.name}
                span={field.span || { base: 12, md: 6, lg: 3 }}
              >
                {renderField(field, values, onChange, loading)}
              </Grid.Col>
            ))}
          </Grid>
        </Collapse>
      )}
    </Paper>
  )
}
