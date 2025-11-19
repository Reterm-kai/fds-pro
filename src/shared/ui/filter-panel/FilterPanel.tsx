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
import classes from './FilterPanel.module.css'

/**
 * 渲染单个筛选字段
 */
function renderField<T extends Record<string, unknown>>(
  field: FilterFieldConfig<T>,
  values: T,
  onChange: (name: keyof T, value: T[keyof T]) => void,
  loading?: boolean
) {
  const { name, label, type, placeholder, options, disabled, clearable } = field

  const value = values[name as keyof T]
  const isDisabled =
    loading || (typeof disabled === 'function' ? disabled(values) : disabled)

  const baseProps = {
    label,
    placeholder,
    disabled: isDisabled,
  }

  const clearableProps = {
    ...baseProps,
    clearable: clearable !== false,
  }

  switch (type) {
    case 'text':
      return (
        <TextInput
          {...baseProps}
          value={typeof value === 'string' ? value : ''}
          onChange={e =>
            onChange(name as keyof T, e.currentTarget.value as T[keyof T])
          }
        />
      )

    case 'select':
      return (
        <Select
          {...clearableProps}
          value={typeof value === 'string' ? value : null}
          onChange={val => onChange(name as keyof T, (val ?? '') as T[keyof T])}
          data={options || []}
        />
      )

    case 'multiSelect':
      return (
        <MultiSelect
          {...clearableProps}
          value={Array.isArray(value) ? (value as string[]) : []}
          onChange={val => onChange(name as keyof T, val as T[keyof T])}
          data={options || []}
        />
      )

    case 'date':
      return (
        <DateInput
          {...clearableProps}
          value={typeof value === 'string' && value ? new Date(value) : null}
          onChange={date => {
            // DateInput onChange 接收 Date | null
            const dateValue = date as Date | null
            const dateString = dateValue ? dateValue.toISOString() : ''
            onChange(name as keyof T, dateString as T[keyof T])
          }}
          valueFormat="YYYY-MM-DD"
        />
      )

    case 'dateRange':
      return (
        <DatePickerInput
          {...clearableProps}
          type="range"
          value={
            Array.isArray(value)
              ? [
                  value[0]
                    ? new Date(value[0] as string | number | Date)
                    : null,
                  value[1]
                    ? new Date(value[1] as string | number | Date)
                    : null,
                ]
              : [null, null]
          }
          onChange={dates => {
            const formatDate = (date: Date | string | null): string => {
              if (!date) return ''
              if (typeof date === 'string') return new Date(date).toISOString()
              return date.toISOString()
            }
            const range = dates
              ? [formatDate(dates[0]), formatDate(dates[1])]
              : ['', '']
            onChange(name as keyof T, range as T[keyof T])
          }}
          valueFormat="YYYY-MM-DD"
        />
      )

    case 'number': {
      const numValue = value as number | undefined
      return (
        <NumberInput
          {...baseProps}
          value={numValue}
          onChange={val => {
            onChange(name as keyof T, val as T[keyof T])
          }}
        />
      )
    }

    case 'numberRange': {
      const rangeValue = (value as [number?, number?]) || [undefined, undefined]
      return (
        <Group gap="xs" grow>
          <NumberInput
            placeholder="最小值"
            value={rangeValue[0]}
            onChange={val => {
              onChange(
                name as keyof T,
                [val, rangeValue[1]] as unknown as T[keyof T]
              )
            }}
            disabled={isDisabled}
          />
          <NumberInput
            placeholder="最大值"
            value={rangeValue[1]}
            onChange={val => {
              onChange(
                name as keyof T,
                [rangeValue[0], val] as unknown as T[keyof T]
              )
            }}
            disabled={isDisabled}
          />
        </Group>
      )
    }

    default:
      return null
  }
}

export function FilterPanel<T extends Record<string, unknown>>({
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
            <Group gap="xs" className={classes.actionButtons}>
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
