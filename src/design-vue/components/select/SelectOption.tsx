import { SelectOption as ASelectOption } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ASelectOptionProps, ASelectOptionSlots } from './type'

const [prefixName, prefixCls] = getPrefix('select-option')

const SelectOption = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ASelectOptionProps>())
    const slots = useSlots() as ASelectOptionSlots
    return () => <ASelectOption class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type SelectOptionProps = PropsType<typeof SelectOption> &
  PropsType<ASelectOptionProps>
export type SelectOptionExpose = {}
export type SelectOptionSlots = ASelectOptionSlots

export default SelectOption as GlobalComponentConstructor<
  SelectOptionProps,
  SelectOptionSlots
>
