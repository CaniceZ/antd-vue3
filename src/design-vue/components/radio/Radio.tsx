import { RadioProps as ARadioProps } from 'ant-design-vue'
import { computed, defineComponent } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useRefExpose from '../../_hooks/useRefExpose'
import { getPrefix } from '../../_utils/common'
import { ARadioExpose, ARadioSlots } from './type'

const [prefixName, prefixCls] = getPrefix('radio')

const Radio = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Boolean, String, Number]
    },
    label: {
      type: [String, Number],
      default: ''
    },
    unchecked: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit, expose }) {
    const [radioRef, radioExpose] = useRefExpose<ARadioExpose>([
      'blur',
      'focus'
    ])
    expose(radioExpose)

    const checked = computed(() => {
      if ('value' in attrs) {
        return attrs['value'] === props.modelValue
      } else {
        return props.modelValue
      }
    })

    function onUpdateChecked(val) {
      let res
      if ('value' in attrs) {
        if (val) {
          res = attrs['value']
        } else {
          res = void 0
        }
      } else {
        res = val
      }
      emit('update:modelValue', res)
    }

    return () => (
      <a-radio
        ref={radioRef}
        class={prefixCls}
        {...attrs}
        {...(props.unchecked && !props.readonly
          ? {
              onClick: evt => {
                if (evt.target?.nodeName === 'INPUT') {
                  if (props.modelValue) {
                    emit('update:modelValue', false)
                  }
                }
              }
            }
          : {})}
        checked={checked.value}
        {...(props.readonly
          ? {}
          : {
              'onUpdate:checked': onUpdateChecked
            })}
        v-slots={{
          default: () => slots.default?.() || props.label,
          ...slots
        }}
      />
    )
  }
})

export type RadioProps = PropsType<typeof Radio> & PropsType<ARadioProps>
export type RadioExpose = {}
export type RadioSlots = ARadioSlots

export default Radio as GlobalComponentConstructor<RadioProps, RadioSlots>
