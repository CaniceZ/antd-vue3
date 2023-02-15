import { defineComponent, useSlots, type PropType } from 'vue'
import { AutoComplete as AAutoComplete } from 'ant-design-vue'
import { omit } from '../../packages//utils'
import useRefExpose from '../../_hooks/useRefExpose'
import type {
  GlobalComponentConstructor,
  PropsType
} from '../../types/ts-helpers'
import {
  AAutoCompleteExpose,
  AAutoCompleteProps,
  AAutoCompleteSlots,
  OptionsType
} from './types'
import propMapOptions from './propMapOptions'
import useAttrs from '../../_hooks/useAttrs'
import { LoadingOutlined } from '@ant-design/icons-vue'
import useOnSearch from './useOnSearch'
import { getPrefix } from '../../_utils/common'
import {
  definePropMap,
  SearchStatus,
  usePropMap
} from '../../_utils/select-utils'

const defaultPropMap = {
  value: 'name',
  options: 'options'
}

const [prefixName, prefixCls] = getPrefix('auto-complete')

export const autoCompleteProps = () => ({
  /** 指定当前选中的条目 */
  modelValue: [Array, Object, String, Number] as PropType<
    AAutoCompleteProps['value']
  >,
  /** 下拉框数据 */
  options: Object as PropType<OptionsType>,
  /** 最大输入长度 */
  maxlength: Number,
  /**
   * 以毫秒为单位，对 `onSearch` 进行去抖动处理
   * @default 500
   */
  inputDebounce: {
    type: Number,
    default: 500
  },
  /** 可用于自定义本地过滤或远程过滤的方法 */
  onSearch: Function as PropType<
    (
      value: AAutoCompleteProps['value'],
      update: (options: OptionsType) => void,
      abort: () => void
    ) => void
  >,
  /** 输入框类型，`search` | `textarea` */
  inputType: String as PropType<'search' | 'textarea'>,
  /** 输入框透传属性 */
  inputProps: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  }
})

const AutoComplete = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...autoCompleteProps(),
    ...definePropMap()
  },
  emits: {
    'update:modelValue': (_value: AAutoCompleteProps['value']) => true
  },
  setup(props, { emit, expose }) {
    const attrs = $(useAttrs<AAutoCompleteProps>())
    const slots = useSlots() as AAutoCompleteSlots

    // 继承 a-auto-complete 的 expose
    const [autoCompleteRef, autoCompleteExpose] =
      useRefExpose<AAutoCompleteExpose>(['blur', 'focus'])
    expose(autoCompleteExpose)

    const propMap = $(usePropMap(props, defaultPropMap))
    const computedOptions = $computed(() =>
      propMapOptions(props.options, propMap)
    )
    const {
      onSearch,
      options: innerOptions,
      searchStatus,
      setOptions
    } = $(
      useOnSearch({
        props,
        attrs,
        propMap: $$(propMap),
        options: $$(computedOptions)
      })
    )
    const options = $computed(() => innerOptions || computedOptions || [])

    function onBlur(e: FocusEvent) {
      if (!props.onSearch) {
        setOptions()
      }
      attrs.onBlur?.(e)
    }

    const notFoundContent = $computed(() => {
      switch (searchStatus) {
        case SearchStatus.Fetching:
          return () => (
            <>
              <LoadingOutlined />
              &nbsp;&nbsp;加载中...
            </>
          )
        case SearchStatus.NoData:
          return slots.notFoundContent || (() => <div>暂无数据</div>)
        default:
          return slots.notFoundContent
      }
    })

    return () => {
      return (
        <AAutoComplete
          ref={autoCompleteRef}
          class={prefixCls}
          // 透传 a-auto-complete 的 props
          {...omit(attrs, [
            'value',
            'onUpdate:value',
            'options',
            'onSearch',
            'onBlur',
            'placeholder',
            'filterOption'
          ])}
          value={props.modelValue}
          onUpdate:value={val => emit('update:modelValue', val)}
          options={options}
          onBlur={onBlur}
          onSearch={onSearch}
          /**
           * 透传 a-auto-complete 的 slots
           * dataSource 和 options 两个插槽已经在 antdv@3.1.1 中发布「遗弃」声明了
           */
          v-slots={{
            ...omit(slots, [
              'dataSource',
              'options',
              'placeholder',
              'notFoundContent',
              'default'
            ]),
            notFoundContent
          }}
        >
          <y-input
            {...props.inputProps}
            textarea={props.inputType === 'textarea'}
            search={props.inputType === 'search'}
            placeholder={attrs.placeholder}
            modelValue={props.modelValue}
            maxlength={props.maxlength}
            isAutoComplete
          />
        </AAutoComplete>
      )
    }
  }
})

export type AutoCompleteProps = PropsType<
  Omit<AAutoCompleteProps, 'value' | 'onUpdate:value'>
> &
  PropsType<typeof AutoComplete> &
  PropsType<typeof autoCompleteProps> &
  PropsType<typeof definePropMap>
export type AutoCompleteExpose = AAutoCompleteExpose
export type AutoCompleteSlots = AAutoCompleteSlots

export default AutoComplete as GlobalComponentConstructor<
  AutoCompleteProps,
  AutoCompleteSlots
>
