import { Switch as ASwitch, SwitchProps as ASwitchProps } from 'ant-design-vue'
import { defineComponent, PropType, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ASwitchExpose, ASwitchSlots } from './type'

const [prefixName, prefixCls] = getPrefix('switch')

const Switch = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Boolean, String, Number] as PropType<ASwitchProps['checked']>,
      default: false
    }
  },
  emits: {
    'update:modelValue': (_val: ASwitchProps['checked']) => true
  },
  setup(props, { emit }) {
    const attrs = $(useAttrs<ASwitchProps>())
    const slots = useSlots() as ASwitchSlots
    return () => (
      <ASwitch
        class={prefixCls}
        {...attrs}
        checked={props.modelValue}
        onUpdate:checked={val => emit('update:modelValue', val)}
        v-slots={slots}
      />
    )
  }
})

export type SwitchProps = PropsType<typeof Switch> & PropsType<ASwitchProps>
export type SwitchExpose = ASwitchExpose
export type SwitchSlots = ASwitchSlots

export default Switch as GlobalComponentConstructor<SwitchProps, SwitchSlots>
