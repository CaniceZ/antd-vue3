import { CaretDownOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { Select as ASelect, SelectProps as ASelectProps } from 'ant-design-vue'
import { defineComponent, PropType, useSlots } from 'vue'
import { useGlobalConfig } from '../../plugins/global-config'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import useRefExpose from '../../_hooks/useRefExpose'
import { getPrefix } from '../../_utils/common'
import {
  definePropMap,
  SearchStatus,
  usePropMap
} from '../../_utils/select-utils'
import { ASelectExpose, ASelectSlots, OptionsType } from './type'
import propMapOptions from './propMapOptions'
import useOnSearch from './useOnSearch'
import { omit } from '../../packages//utils'

const optionAll = { value: '', label: '全部' }

const defaultPropMap = {
  value: 'type',
  label: 'name',
  options: 'options',
  children: 'children',
  disabled: 'disabled',
  title: 'title',
  key: 'key'
}

const [prefixName, prefixCls] = getPrefix('select')

export const selectProps = () => ({
  modelValue: {
    type: [Array, Object, String, Number, Boolean] as PropType<
      ASelectProps['value']
    >
  },
  options: Array as PropType<OptionsType>,
  type: {
    type: String as PropType<'select' | 'multipleselect'>,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  optionAll: {
    type: Boolean,
    default: false
  },
  /**
   * 以毫秒为单位，对 `onSearch2` 进行去抖动处理
   */
  inputDebounce: Number,
  /** 可用于自定义本地过滤或远程过滤的方法 */
  onSearch2: Function as PropType<
    (
      value: string,
      update: (options: OptionsType) => void,
      abort: () => void
    ) => void
  >,
  onScrollSearch: Function as PropType<
    (
      e: UIEvent,
      options: ASelectProps['options'],
      update: (options: OptionsType) => void
    ) => void
  >
  // TODO feat 支持 group options 配置
  // TODO feat 引入 tiny-pinyin，支持拼音模糊搜索
})

const Select = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...selectProps(),
    ...definePropMap()
  },
  emits: {
    'update:modelValue': (_val: ASelectProps['value']) => true
  },
  setup(props, { expose, emit }) {
    const globalConfig = useGlobalConfig()
    const slots = useSlots() as ASelectSlots
    const attrs = $(useAttrs<ASelectProps>(['showSearch', 'loading']))
    const [selectRef, selectExpose] = useRefExpose<ASelectExpose>([
      'blur',
      'focus'
    ])
    expose(selectExpose)

    const isMultiple = $computed(
      () => props.multiple || props.type === 'multipleselect'
    )
    const propMap = $(usePropMap(props, defaultPropMap))
    const computedOptions = $computed(() => {
      const options = propMapOptions(props.options, propMap)
      if (options && props.optionAll) {
        return [optionAll, ...options]
      } else {
        return options
      }
    })
    const {
      onSearch,
      options: innerOptions,
      searchStatus,
      setOptions,
      onScrollSearch
    } = $(
      useOnSearch({
        props,
        attrs: $$(attrs),
        propMap: $$(propMap),
        options: $$(computedOptions)
      })
    )

    const options = $computed(() => innerOptions || computedOptions)

    const showSearch = $computed(() => {
      if ('showSearch' in attrs) {
        return attrs.showSearch!
      } else if (attrs.onSearch || props.onSearch2) {
        return true
      } else {
        return computedOptions && computedOptions.length > 8
      }
    })

    let dropdownVisible = $ref<boolean>()
    function onDropdownVisibleChange(open: boolean) {
      dropdownVisible = open
      if (!props.onSearch2 && !open) {
        setOptions()
      }
      attrs.onDropdownVisibleChange?.(open)
    }

    const value = $computed(() => {
      if (props.optionAll) {
        if (isMultiple) {
          return props.modelValue === void 0 ||
            props.modelValue === null ||
            (Array.isArray(props.modelValue) && props.modelValue.length === 0)
            ? ['']
            : props.modelValue
        } else {
          return props.modelValue === void 0 || props.modelValue === null
            ? ''
            : props.modelValue
        }
      }
      return props.modelValue
    })

    function onUpdateValue(val) {
      let value = val
      if (props.optionAll && isMultiple) {
        if (Array.isArray(val)) {
          if (val.length > 0 && val[val.length - 1] !== optionAll.value) {
            value = val.filter(row => row !== optionAll.value)
          } else {
            value = void 0
          }
        }
      }
      emit('update:modelValue', value)
    }

    function onPopupScroll(e: UIEvent) {
      attrs.onPopupScroll?.(e)
      onScrollSearch(e)
    }

    function filterOptionFn(input: string, option: any) {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    const filterOption = $computed(() => {
      if (attrs.filterOption) {
        return attrs.filterOption
      } else if (slots.default && !attrs.onSearch) {
        return filterOptionFn
      }
      return false
    })

    return () => (
      <ASelect
        ref={selectRef}
        class={prefixCls}
        mode={isMultiple ? 'multiple' : void 0}
        defaultActiveFirstOption={false}
        maxTagCount={3}
        suffixIcon={
          attrs.loading
            ? void 0
            : globalConfig?.appConfig?.selectProps?.suffixIcon || (
                <CaretDownOutlined
                  class={['ant-select-suffix', dropdownVisible ? 'up' : '']}
                />
              )
        }
        {...omit(attrs, [
          'filterOption',
          'onSearch',
          'onDropdownVisibleChange',
          'placeholder',
          'showSearch',
          'value',
          'onUpdate:value',
          'options',
          'onPopupScroll'
        ])}
        onPopupScroll={onPopupScroll}
        onDropdownVisibleChange={onDropdownVisibleChange}
        filterOption={filterOption}
        // onSearch={slots.default ? attrs.onSearch : showSearch ? attrs.onSearch || onSearch : void 0}
        onSearch={showSearch ? attrs.onSearch || onSearch : void 0}
        placeholder={attrs.placeholder || '请选择'}
        showSearch={showSearch}
        value={value}
        onUpdate:value={val => onUpdateValue(val)}
        options={options}
        v-slots={{
          ...omit(slots, ['notFoundContent']),
          notFoundContent: props.onSearch2
            ? () => {
                switch (searchStatus) {
                  case SearchStatus.Fetching:
                    return (
                      <>
                        <LoadingOutlined />
                        &nbsp;&nbsp;加载中...
                      </>
                    )
                  case SearchStatus.NoData:
                    return slots.notFoundContent?.() || <div>暂无数据</div>
                  default:
                    return slots.notFoundContent?.() || <div>请输入关键字</div>
                }
              }
            : slots.notFoundContent
        }}
      />
    )
  }
})

export type SelectProps = PropsType<ASelectProps> &
  PropsType<typeof Select> &
  PropsType<typeof selectProps> &
  PropsType<typeof definePropMap>
export type SelectExpose = ASelectExpose
export type SelectSlots = ASelectSlots

export default Select as GlobalComponentConstructor<SelectProps, SelectSlots>
