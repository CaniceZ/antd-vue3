import { SelectOptGroup as ASelectOptGroup } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ASelectOptGroupProps, ASelectOptGroupSlots } from './type'

const [prefixName, prefixCls] = getPrefix('select-opt-group')

const SelectOptGroup = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ASelectOptGroupProps>())
    const slots = useSlots() as ASelectOptGroupSlots
    return () => (
      <ASelectOptGroup class={prefixCls} {...attrs} v-slots={slots} />
    )
  }
})

export type SelectOptGroupProps = PropsType<typeof SelectOptGroup> &
  PropsType<ASelectOptGroupProps>
export type SelectOptGroupExpose = {}
export type SelectOptGroupSlots = ASelectOptGroupSlots

export default SelectOptGroup as GlobalComponentConstructor<
  SelectOptGroupProps,
  SelectOptGroupSlots
>
