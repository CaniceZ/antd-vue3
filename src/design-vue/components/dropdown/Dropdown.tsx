import { defineComponent, useSlots } from 'vue'
import {
  Dropdown as ADropdown,
  DropdownProps as ADropdownProps
} from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { ADropdownSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('dropdown')

const Dropdown = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ADropdownProps>())
    const slots = useSlots() as ADropdownSlots
    return () => <ADropdown class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type DropdownProps = PropsType<typeof Dropdown> &
  PropsType<ADropdownProps>
export type DropdownExpose = {}
export type DropdownSlots = ADropdownSlots

export default Dropdown as GlobalComponentConstructor<
  DropdownProps,
  DropdownSlots
>
