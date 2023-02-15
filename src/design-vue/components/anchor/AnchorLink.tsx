import {
  AnchorLink as AAnchorLink,
  AnchorLinkProps as AAnchorLinkProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AAnchorLinkSlots } from './type'

const [prefixName, prefixCls] = getPrefix('anchor-link')

const AnchorLink = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AAnchorLinkProps>())
    const slots = useSlots() as AAnchorLinkSlots
    return () => <AAnchorLink class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type AnchorLinkProps = PropsType<typeof AnchorLink> &
  PropsType<AAnchorLinkProps>
export type AnchorLinkExpose = {}
export type AnchorLinkSlots = AAnchorLinkSlots

export default AnchorLink as GlobalComponentConstructor<
  AnchorLinkProps,
  AnchorLinkSlots
>
