import { defineComponent, PropType, useSlots } from 'vue'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import {
  Checkbox as ACheckbox,
  CheckboxProps as ACheckboxProps
} from 'ant-design-vue'
import { omit } from '../../packages//utils'
import { ACheckboxExpose, ACheckboxSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useRefExpose from '../../_hooks/useRefExpose'

const [prefixName, prefixCls] = getPrefix('checkbox')

const checkboxProps = () => ({
  /** 双向绑定值 */
  modelValue: {
    type: [Boolean, String, Number] as PropType<ACheckboxProps['value']>
  },
  /** 标签内容 */
  label: {
    type: String,
    default: ''
  },
  /** 只读 */
  readonly: {
    type: Boolean,
    default: false
  }
})

const Checkbox = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...checkboxProps()
  },
  emits: {
    'update:modelValue': (_val: ACheckboxProps['value']) => true
  },
  setup(props, { emit, expose }) {
    const attrs = $(useAttrs<ACheckboxProps>())
    const slots = useSlots() as ACheckboxSlots
    const [checkboxRef, checkboxExpose] = useRefExpose<ACheckboxExpose>([
      'blur',
      'focus'
    ])
    expose(checkboxExpose)

    return () => (
      <ACheckbox
        ref={checkboxRef}
        class={prefixCls}
        {...omit(attrs, ['checked', 'onUpdate:checked'])}
        checked={props.modelValue}
        {...(props.readonly
          ? {}
          : {
              'onUpdate:checked': val => emit('update:modelValue', val)
            })}
        v-slots={{
          default: () => slots.default?.() || props.label,
          ...slots
        }}
      />
    )
  }
})

export type CheckboxProps = PropsType<typeof Checkbox> &
  PropsType<Omit<ACheckboxProps, 'checked' | 'onUpdate:checked'>> &
  PropsType<typeof checkboxProps>
export type CheckboxExpose = ACheckboxExpose
export type CheckboxSlots = ACheckboxSlots

export default Checkbox as GlobalComponentConstructor<
  CheckboxProps,
  CheckboxSlots
>
