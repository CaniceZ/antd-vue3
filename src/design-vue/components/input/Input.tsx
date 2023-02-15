import {
  InputProps as AInputProps,
  InputNumberProps as AInputNumberProps,
  TextAreaProps as ATextAreaProps
} from 'ant-design-vue'
import { getPrefix, isAttrTrue } from '../../_utils/common'
import {
  defineComponent,
  PropType,
  h,
  resolveComponent,
  onMounted,
  nextTick
} from 'vue'
import useRefExpose from '../../_hooks/useRefExpose'
import {
  AInputExpose,
  AInputPasswordProps,
  AInputSearchProps,
  AInputSlots
} from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

type InputType =
  | 'text'
  | 'input'
  | 'number'
  | 'password'
  | 'search'
  | 'textarea'

const [prefixName] = getPrefix('input')

const Input = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number]
    },
    type: {
      type: String as PropType<InputType>,
      default: ''
    },
    number: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    textarea: {
      type: Boolean,
      default: false
    },
    /* 是否自动填充精确度的小数0 */
    fillPrecision: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, expose, emit }) {
    const [inputRef, inputExpose] = useRefExpose<AInputExpose>([
      'blur',
      'focus',
      'setValue'
    ])

    expose(inputExpose)

    onMounted(() => {
      nextTick(() => {
        // TODO fix 需要排除 disabled 和 readonly 的情况
        if (attrs['autofocus']) {
          inputRef.value?.focus()
        }
      })
    })

    function getComponent(t?: InputType) {
      if (t === 'search' && isAttrTrue(attrs.isAutoComplete)) {
        return getComponent()
      }
      let type: InputType
      if (t) {
        type = t
      } else if (props.number) {
        type = 'number'
      } else if (props.password) {
        type = 'password'
      } else if (props.search) {
        type = 'search'
      } else if (props.textarea) {
        type = 'textarea'
      } else {
        type = 'input'
      }
      if (['text', 'input'].includes(type)) {
        return 'input'
      } else if (['number', 'password', 'search'].includes(type)) {
        return `input-${type}`
      } else {
        return type
      }
    }

    function formatter(
      value: number | string,
      { userTyping, input }: { userTyping: boolean; input: string }
    ): string {
      if (userTyping) {
        return input
      }
      return typeof value === 'number' ? String(value) : value
    }

    return () => {
      const type = getComponent(props.type)
      const Component = resolveComponent(`a-${type}`) as string
      return h(
        Component,
        {
          htmlSize: 20,
          formatter:
            type === 'input-number' && !props.fillPrecision
              ? formatter
              : void 0,
          ...attrs,
          value: props.modelValue,
          'onUpdate:value': val => emit('update:modelValue', val),
          class: [`ygp-${type}`, attrs.class],
          ref: inputRef
        },
        slots
      )
    }
  }
})

export type InputProps = PropsType<typeof Input> &
  (
    | PropsType<AInputProps>
    | PropsType<ATextAreaProps>
    | PropsType<AInputNumberProps>
    | PropsType<AInputSearchProps>
    | PropsType<AInputPasswordProps>
  )
export type InputExpose = AInputExpose
export type InputSlots = AInputSlots

export default Input as GlobalComponentConstructor<InputProps, InputSlots>
