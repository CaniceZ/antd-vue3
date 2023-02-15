import { StatisticCountdown as AStatisticCountdown } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AStatisticCountdownSlots, AStatisticCountdownProps } from './type'

const [prefixName, prefixCls] = getPrefix('statistic-countdown')

const StatisticCountdown = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AStatisticCountdownProps>())
    const slots = useSlots() as AStatisticCountdownSlots
    return () => (
      <AStatisticCountdown class={prefixCls} {...attrs} v-slots={slots} />
    )
  }
})

export type StatisticCountdownProps = PropsType<typeof StatisticCountdown> &
  PropsType<AStatisticCountdownProps>
export type StatisticCountdownExpose = {}
export type StatisticCountdownSlots = AStatisticCountdownSlots

export default StatisticCountdown as GlobalComponentConstructor<
  StatisticCountdownProps,
  StatisticCountdownSlots
>
