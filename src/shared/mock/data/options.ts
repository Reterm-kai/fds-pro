import type {
  FormGroupOptionsResponse,
  FormStepOptionsResponse,
} from '@/entities/form-options'

const formGroupOptions: FormGroupOptionsResponse = {
  projectTypes: [
    { value: 'internal', label: '内部项目' },
    { value: 'external', label: '外部项目' },
    { value: 'experiment', label: '实验项目' },
  ],
  tags: ['Web', '移动端', '数据', 'AI', 'BFF', '平台', '低代码'],
  regions: [
    {
      value: 'east',
      label: '华东',
      cities: [
        { value: 'shanghai', label: '上海' },
        { value: 'hangzhou', label: '杭州' },
        { value: 'nanjing', label: '南京' },
      ],
    },
    {
      value: 'south',
      label: '华南',
      cities: [
        { value: 'guangzhou', label: '广州' },
        { value: 'shenzhen', label: '深圳' },
        { value: 'xiamen', label: '厦门' },
      ],
    },
    {
      value: 'north',
      label: '华北',
      cities: [
        { value: 'beijing', label: '北京' },
        { value: 'tianjin', label: '天津' },
        { value: 'qingdao', label: '青岛' },
      ],
    },
    {
      value: 'west',
      label: '西南',
      cities: [
        { value: 'chengdu', label: '成都' },
        { value: 'chongqing', label: '重庆' },
        { value: 'kunming', label: '昆明' },
      ],
    },
  ],
}

const formStepOptions: FormStepOptionsResponse = {
  environments: [
    { value: 'dev', label: '测试环境' },
    { value: 'staging', label: '预发布环境' },
    { value: 'prod', label: '生产环境' },
  ],
  rolloutWindows: [
    { value: 'weekday-day', label: '工作日 10:00-18:00' },
    { value: 'weekday-night', label: '工作日 21:00-23:00' },
    { value: 'weekend', label: '周末 10:00-18:00' },
  ],
}

export function getFormGroupOptions(): FormGroupOptionsResponse {
  return formGroupOptions
}

export function getFormStepOptions(): FormStepOptionsResponse {
  return formStepOptions
}
