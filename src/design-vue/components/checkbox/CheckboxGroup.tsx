import { computed, defineComponent, PropType, useSlots } from 'vue'
import { getPrefix } from '../../_utils/common'
import {
  CheckboxGroup as ACheckboxGroup,
  CheckboxGroupProps as ACheckboxGroupProps
} from 'ant-design-vue'
import useAttrs from '../../_hooks/useAttrs'
import { ACheckboxGroupSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { omit } from '../../packages//utils'

const [prefixName, prefixCls] = getPrefix('checkbox-group')

const checkboxGroupProps = () => ({
  /** 双向绑定的值 */
  modelValue: {
    type: Array as PropType<ACheckboxGroupProps['value']>
  },
  /** options 的字段映射 */
  propMap: {
    type: Object,
    default: () => ({
      label: 'name',
      value: 'type'
    })
  },
  /** 只读 */
  readonly: {
    type: Boolean,
    default: false
  }
})

const CheckboxGroup = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...checkboxGroupProps()
  },
  emits: {
    'update:modelValue': (_val: ACheckboxGroupProps['value']) => true
  },
  setup(props, { emit }) {
    const attrs = $(useAttrs<ACheckboxGroupProps>())
    const slots = useSlots() as ACheckboxGroupSlots

    const options = computed(() => {
      if (attrs['options']) {
        return (attrs['options'] as any[]).map(row => {
          if (typeof row === 'number' || typeof row === 'string') {
            return row
          }
          const option = {
            label: row[props.propMap.label || 'name'],
            value: row[props.propMap.value || 'type'],
            item: row
          }
          if ('disabled' in row) {
            option['disabled'] = row['disabled']
          }
          return option
        })
      }
      return void 0
    })

    return () => (
      <ACheckboxGroup
        class={prefixCls}
        {...omit(attrs, ['value', 'onUpdate:value'])}
        value={props.modelValue}
        {...(props.readonly
          ? {}
          : {
              'onUpdate:value': val => emit('update:modelValue', val)
            })}
        options={options.value}
        v-slots={slots}
      />
    )
  }
})

export type CheckboxGroupProps = PropsType<typeof CheckboxGroup> &
  PropsType<Omit<ACheckboxGroupProps, 'value' | 'onUpdate:value'>> &
  PropsType<typeof checkboxGroupProps>
export type CheckboxGroupExpose = {}
export type CheckboxGroupSlots = ACheckboxGroupSlots

export default CheckboxGroup as GlobalComponentConstructor<
  CheckboxGroupProps,
  CheckboxGroupSlots
>
