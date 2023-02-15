import { defineComponent, useSlots } from 'vue'
import {
  Popover as APopover,
  PopoverProps as APopoverProps
} from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { APopoverExpose, APopoverSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('popover')

const Popover = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<APopoverProps>())
    const slots = useSlots() as APopoverSlots
    return () => <APopover class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type PopoverProps = PropsType<typeof Popover> & PropsType<APopoverProps>
export type PopoverExpose = APopoverExpose
export type PopoverSlots = APopoverSlots

export default Popover as GlobalComponentConstructor<PopoverProps, PopoverSlots>
