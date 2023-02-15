import { CardGrid as ACardGrid } from 'ant-design-vue'
import { CardGridProps as ACardGridProps } from 'ant-design-vue/lib/card/Grid'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ACardGridSlots } from './type'

const [prefixName, prefixCls] = getPrefix('card-grid')

const CardGrid = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup(_) {
    const attrs = $(useAttrs<ACardGridProps>())
    const slots = useSlots() as ACardGridSlots
    return () => <ACardGrid class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type CardGridProps = PropsType<typeof CardGrid> &
  PropsType<ACardGridProps>
export type CardGridExpose = {}
export type CardGridSlots = ACardGridSlots

export default CardGrid as GlobalComponentConstructor<
  CardGridProps,
  CardGridSlots
>
