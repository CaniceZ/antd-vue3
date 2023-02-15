import { defineComponent, useSlots } from 'vue'
import { InputGroup as AInputGroup } from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import { AInputGroupProps, AInputGroupSlots } from './type'
import useAttrs from '../../_hooks/useAttrs'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('input-group')

const InputGroup = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AInputGroupProps>())
    const slots = useSlots() as AInputGroupSlots
    return () => (
      <AInputGroup class={prefixCls} {...(attrs as any)} v-slots={slots} />
    )
  }
})

export type InputGroupProps = PropsType<typeof InputGroup> &
  PropsType<AInputGroupProps>
export type InputGroupExpose = {}
export type InputGroupSlots = AInputGroupSlots

export default InputGroup as GlobalComponentConstructor<
  InputGroupProps,
  InputGroupSlots
>
