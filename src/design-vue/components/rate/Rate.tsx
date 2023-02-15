import { Rate as ARate, RateProps as ARateProps } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import useRefExpose from '../../_hooks/useRefExpose'
import { getPrefix } from '../../_utils/common'
import { ARateExpose, ARateSlots } from './type'

const [prefixName, prefixCls] = getPrefix('rate')

const Rate = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup(_, { expose }) {
    const attrs = $(useAttrs<ARateProps>())
    const slots = useSlots() as ARateSlots
    const [rateRef, rateExpose] = useRefExpose<ARateExpose>(['focus', 'blur'])
    expose(rateExpose)

    return () => (
      <ARate ref={rateRef} class={prefixCls} {...attrs} v-slots={slots} />
    )
  }
})

export type RateProps = PropsType<typeof Rate> & PropsType<ARateProps>
export type RateExpose = {}
export type RateSlots = ARateSlots

export default Rate as GlobalComponentConstructor<RateProps, RateSlots>
