import type { ReactNode } from 'react'
import { Badge, Button, Divider, Group, Tabs, Text } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import classes from './ProfileBasic.module.css'

interface DetailItem {
  label: string
  value: ReactNode
}

export function ProfileBasicPage() {
  const navigate = useNavigate()

  const userInfo: DetailItem[] = [
    { label: '用户姓名', value: '付小小' },
    { label: '会员卡号', value: '32943898021309809423' },
    { label: '身份证', value: '3321944288191034921' },
    { label: '联系方式', value: '18112345678' },
    {
      label: '联系地址',
      value: '曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口',
    },
  ]

  const groupInfo: DetailItem[] = [
    { label: '某某数据', value: '725' },
    { label: '更新时间', value: '2017-08-08' },
    { label: '某某数据', value: '725' },
    { label: '更新时间', value: '2017-08-08' },
  ]

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {/* 页面头部卡片 */}
        <div className={classes.card}>
          <Group justify="space-between" align="flex-start" mb="md">
            <div>
              <Text className={classes.pageTitle}>单号：234231029431</Text>
              <Badge variant="light" color="blue" size="sm">
                待审批
              </Badge>
            </div>
            <Group gap="xs">
              <Button variant="default" size="xs">
                操作一
              </Button>
              <Button variant="default" size="xs">
                操作二
              </Button>
              <Button variant="default" size="xs" px="xs">
                <IconDots size={14} />
              </Button>
              <Button size="xs" onClick={handleBack}>
                主操作
              </Button>
            </Group>
          </Group>

          <Divider mb="md" />

          <div className={classes.headerGrid}>
            <div className={classes.headerItem}>
              <Text className={classes.headerLabel}>创建人</Text>
              <Text className={classes.headerValue}>曲丽丽</Text>
            </div>
            <div className={classes.headerItem}>
              <Text className={classes.headerLabel}>订购产品</Text>
              <Text className={classes.headerValue}>XX 服务</Text>
            </div>
            <div className={classes.headerItem}>
              <Text className={classes.headerLabel}>创建时间</Text>
              <Text className={classes.headerValue}>2017-07-07</Text>
            </div>
            <div className={classes.headerItem}>
              <Text className={classes.headerLabel}>关联单据</Text>
              <Text className={classes.headerValue}>12421</Text>
            </div>
            <div className={classes.headerItem}>
              <Text className={classes.headerLabel}>生效日期</Text>
              <Text className={classes.headerValue}>
                2017-07-07 ~ 2017-08-08
              </Text>
            </div>
            <div className={classes.headerItem}>
              <Text className={classes.headerLabel}>备注</Text>
              <Text className={classes.headerValue}>请于两个工作日内确认</Text>
            </div>
          </div>

          <Divider my="md" />

          <Group justify="flex-end">
            <div className={classes.statsItem}>
              <Text className={classes.statsLabel}>订单金额</Text>
              <Text className={classes.statsValue}>¥568.08</Text>
            </div>
          </Group>
        </div>

        <div className={classes.divider} />

        {/* Tabs 卡片 */}
        <div className={classes.card}>
          <Tabs defaultValue="detail">
            <Tabs.List>
              <Tabs.Tab value="detail">详情</Tabs.Tab>
              <Tabs.Tab value="rules">规则</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div>

        <div className={classes.divider} />

        {/* 流程进度卡片 */}
        <div className={classes.card}>
          <Text className={classes.cardTitle}>流程进度</Text>
          <div className={classes.progressGrid}>
            <div className={classes.progressItem}>
              <div
                className={`${classes.progressDot} ${classes.progressDotCompleted}`}
              />
              <Text className={classes.progressLabel}>创建项目</Text>
              <Text className={classes.progressMeta}>曲丽丽</Text>
              <Text className={classes.progressMeta}>2016-12-12 12:32</Text>
            </div>
            <div className={classes.progressItem}>
              <div
                className={`${classes.progressDot} ${classes.progressDotActive}`}
              />
              <Text className={classes.progressLabel}>部门初审</Text>
              <Text className={classes.progressMeta}>周毛毛</Text>
              <Text className={classes.progressMeta}>催一下</Text>
            </div>
            <div className={classes.progressItem}>
              <div className={classes.progressDot} />
              <Text className={classes.progressLabel}>财务复核</Text>
            </div>
            <div className={classes.progressItem}>
              <div className={classes.progressDot} />
              <Text className={classes.progressLabel}>完成</Text>
            </div>
          </div>
        </div>

        <div className={classes.divider} />

        {/* 用户信息卡片 */}
        <div className={classes.card}>
          <Text className={classes.cardTitle}>用户信息</Text>
          <div className={classes.infoGrid}>
            {userInfo.map(item => (
              <div key={item.label} className={classes.infoItem}>
                <Text className={classes.infoLabel}>{item.label}</Text>
                <Text className={classes.infoValue}>{item.value}</Text>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.divider} />

        {/* 信息组卡片 */}
        <div className={classes.card}>
          <Text className={classes.cardTitle}>信息组</Text>
          <div className={classes.infoGrid}>
            {groupInfo.map((item, index) => (
              <div key={`${item.label}-${index}`} className={classes.infoItem}>
                <Text className={classes.infoLabel}>{item.label}</Text>
                <Text className={classes.infoValue}>{item.value}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
