import { StatisticProps as AStatisticProps } from 'ant-design-vue'
import { VNode } from 'vue'

// 补充 a-statistic 的 slots 类型
export type AStatisticSlots = Readonly<{
  /* 自定义数值展示 */
  formatter?(): VNode[]
  /* 设置数值的前缀 */
  prefix?(): VNode[]
  /* 设置数值的后缀 */
  suffix?(): VNode[]
  /* 数值的标题 */
  title?(): VNode[]
}>

// 补充 a-statistic-countdown 的 slots 类型
export type AStatisticCountdownSlots = Readonly<{
  /* 自定义数值展示 */
  formatter?(): VNode[]
  /* 设置数值的前缀 */
  prefix?(): VNode[]
  /* 设置数值的后缀 */
  suffix?(): VNode[]
  /* 数值的标题 */
  title?(): VNode[]
}>

// 补充 a-statistic-countdown 的 props 类型
export type AStatisticCountdownProps = Omit<
  AStatisticProps,
  'onFinish' | 'onChange' | 'value' | 'valueRender' | 'formatter'
>
