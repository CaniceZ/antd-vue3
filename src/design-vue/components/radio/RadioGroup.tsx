import { RadioGroupProps as ARadioGroupProps } from 'ant-design-vue'
import { computed, defineComponent } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { getPrefix } from '../../_utils/common'
import { ARadioGroupSlots } from './type'

const [prefixName, prefixCls] = getPrefix('radio-group')

const RadioGroup = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Boolean, String, Number]
    },
    propMap: {
      type: Object,
      default: () => ({
        label: 'name',
        value: 'type'
      })
    },
    button: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
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

    const size = computed(() => {
      if (attrs['size']) {
        return attrs['size']
      } else if (props.large) {
        return 'large'
      } else if (props.small) {
        return 'small'
      }
      return 'default'
    })

    return () => (
      <a-radio-group
        class={prefixCls}
        optionType={props.button || props.outline ? 'button' : 'default'}
        buttonStyle={props.outline ? 'outline' : 'solid'}
        {...attrs}
        value={props.modelValue}
        {...(props.readonly
          ? {}
          : {
              'onUpdate:value': val => emit('update:modelValue', val)
            })}
        options={options.value}
        size={size.value}
        v-slots={slots}
      />
    )
  }
})

export type RadioGroupProps = PropsType<typeof RadioGroup> &
  PropsType<ARadioGroupProps>
export type RadioGroupExpose = {}
export type RadioGroupSlots = ARadioGroupSlots

export default RadioGroup as GlobalComponentConstructor<
  RadioGroupProps,
  RadioGroupSlots
>
