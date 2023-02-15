import {
  defineComponent,
  computed,
  ref,
  resolveComponent,
  watch,
  h,
  nextTick
} from 'vue'
import { YCol, YRow } from '..'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { getPrefix, parseAttr } from '../../_utils/common'
import { getComponent } from '../../_utils/common'
import { FormItem } from '../form/types'

type Option = FormItem

const [prefixName, prefixCls] = getPrefix('option-input')

const OptionInput = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Array, Boolean]
    },
    selected: {
      type: String
    },
    selectWidth: {
      type: String,
      default: '50%'
    },
    keep: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    }
  },
  emits: ['update:modelValue', 'update:selected', 'selectedChange', 'change'],
  setup(props, { attrs, emit }) {
    const selectWidth = computed(() => props.selectWidth || '50%')

    const compact = computed(() => parseAttr(attrs['compact']))
    const options = computed(() => (attrs['options'] as Option[]) || [])
    const selected = ref(props.selected)

    const option = computed(() => {
      return (
        (options.value.find(opt => opt.name === selected.value) as Option) || {}
      )
    })

    watch(
      selected,
      val => {
        if (val === void 0) {
          selected.value = options.value[0].name
          return
        }
        emit('update:selected', val)
      },
      { immediate: true }
    )

    watch(
      () => props.selected,
      val => {
        selected.value = val
      }
    )

    function onSelectedChange(val, option) {
      if (!props.keep) {
        emit('update:modelValue', void 0)
      }
      selected.value = val
      nextTick(() => {
        emit('selectedChange', val, option)
      })
    }

    return () => {
      const { size, row, cols } = attrs
      const {
        name,
        type,
        options: childOptions,
        componentProps = {},
        onChange,
        ...resetOpt
      } = option.value

      const Comp = name
        ? (resolveComponent(
            getComponent(type as string, Boolean(childOptions))
          ) as string)
        : void 0

      const selectContent = (
        <y-select
          modelValue={name}
          options={options.value}
          propMap={{ label: 'label', value: 'name' }}
          disabled={props.disabled}
          {...(compact.value ? { style: `width: ${selectWidth.value}` } : {})}
          onChange={onSelectedChange}
          {...((attrs['select-props'] as object) ||
            (attrs['selectProps'] as object) ||
            {})}
          allowClear={false}
        />
      )

      const content =
        Comp &&
        h(Comp, {
          type,
          modelValue: props.modelValue,
          'onUpdate:modelValue': val => emit('update:modelValue', val),
          disabled: props.disabled,
          allowClear: attrs.allowClear || attrs['allow-clear'],
          ...(compact.value
            ? { style: `width: calc(100% - ${selectWidth.value})` }
            : {}),
          ...((attrs['component-props'] as object) ||
            (attrs['componentProps'] as object) ||
            {}),
          ...resetOpt,
          ...componentProps,
          options: childOptions,
          onChange(...args) {
            emit('change', ...args, option.value)
            onChange && onChange(...args, option.value)
          }
        })

      return (
        <y-input-group class={prefixCls} compact={compact.value} size={size}>
          {compact.value ? (
            [selectContent, content]
          ) : (
            <YRow gutter={10} {...((row as any) || {})}>
              <YCol
                style={{ width: selectWidth.value }}
                {...(((cols as any) || [])[0] || {})}
              >
                {selectContent}
              </YCol>
              <YCol
                style={{ width: `calc(100% - ${selectWidth.value})` }}
                {...(((cols as any) || [])[1] || {})}
              >
                {content}
              </YCol>
            </YRow>
          )}
        </y-input-group>
      )
    }
  }
})

export type OptionInputProps = PropsType<typeof OptionInput>
export type OptionInputExpose = {}
export type OptionInputSlots = {}

export default OptionInput as GlobalComponentConstructor<
  OptionInputProps,
  OptionInputSlots
>
