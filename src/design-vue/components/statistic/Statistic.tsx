import {
  Statistic as AStatistic,
  StatisticProps as AStatisticProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AStatisticSlots } from './type'

const [prefixName, prefixCls] = getPrefix('statistic')

const Statistic = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AStatisticProps>())
    const slots = useSlots() as AStatisticSlots
    return () => <AStatistic class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type StatisticProps = PropsType<typeof Statistic> &
  PropsType<AStatisticProps>
export type StatisticExpose = {}
export type StatisticSlots = AStatisticSlots

export default Statistic as GlobalComponentConstructor<
  StatisticProps,
  StatisticSlots
>
