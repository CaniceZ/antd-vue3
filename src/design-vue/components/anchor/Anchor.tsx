import { Anchor as AAnchor, AnchorProps as AAnchorProps } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AAnchorSlots } from './type'

const [prefixName, prefixCls] = getPrefix('anchor')

const Anchor = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AAnchorProps>())
    const slots = useSlots() as AAnchorSlots
    return () => <AAnchor class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type AnchorProps = PropsType<typeof Anchor> & PropsType<AAnchorProps>
export type AnchorExpose = {}
export type AnchorSlots = AAnchorSlots

export default Anchor as GlobalComponentConstructor<AnchorProps, AnchorSlots>
