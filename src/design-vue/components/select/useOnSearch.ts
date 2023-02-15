import { PropMapType, SearchStatus } from '../../_utils/select-utils'
import { SelectProps as ASelectProps } from 'ant-design-vue'
import debounce from 'lodash-es/debounce'
import { selectProps } from './Select'
import propMapOptions from './propMapOptions'
import { ComputedRef, Ref } from 'vue'
import { OptionsType } from './type'
import { PropsType } from '../../types/ts-helpers'

type Options = PropsType<typeof selectProps>['options']
type AOptions = ASelectProps['options']

export default function useOnSearch({
  props,
  attrs: _attrs,
  propMap: _propMap,
  options: _options
}: {
  props: PropsType<typeof selectProps>
  attrs: ComputedRef<ASelectProps>
  propMap: ComputedRef<PropMapType>
  options: ComputedRef<Options>
}): {
  onSearch: ComputedRef<(input: string) => void>
  options: Ref<AOptions>
  searchStatus: Ref<SearchStatus>
  setOptions: (val?: AOptions) => void
  onScrollSearch: (e?: Event) => void
} {
  let increaseId = 0
  let options = $ref<AOptions>()
  let searchStatus = $ref<SearchStatus>()
  const propMap = $(_propMap)
  const computedOptions = $(_options)
  const attrs = $(_attrs)

  // 为本地过滤场景
  function onSearchLocale(input: string) {
    if (!input) {
      setOptions()
      return
    }
    const res = computedOptions?.filter(option =>
      typeof attrs.filterOption === 'function'
        ? attrs.filterOption?.(input, option)
        : String(option.label)
            .toLowerCase()
            .indexOf(String(input).toLowerCase()) > -1
    )
    setOptions(res)
    attrs.onSearch?.(input)
  }

  // 异步过滤场景
  function onSearchRemote(input: string) {
    const genUpdate = function () {
      const tempId = increaseId
      return function (opts: OptionsType) {
        if (tempId !== increaseId) {
          return
        }
        if (opts && opts.length > 0) {
          setOptions(propMapOptions(opts, propMap))
          searchStatus = SearchStatus.Done
        } else {
          setOptions([])
          searchStatus = SearchStatus.NoData
        }
      }
    }
    const genAbort = function () {
      const tempId = increaseId
      return function () {
        if (tempId !== increaseId) {
          return
        }
        searchStatus = SearchStatus.Abort
      }
    }
    increaseId++
    if (input) {
      if (options || (!options && computedOptions)) {
        setOptions([])
      }
      if (searchStatus !== SearchStatus.Fetching) {
        searchStatus = SearchStatus.Fetching
      }
    } else {
      searchStatus = SearchStatus.Abort
    }
    props.onSearch2?.(input, genUpdate(), genAbort())
  }

  const onSearchRemoteDebounce = $computed(() =>
    props.inputDebounce === 0
      ? onSearchRemote
      : debounce(onSearchRemote, props.inputDebounce || 500)
  )
  const onSearchLocaleDebounce = $computed(() =>
    props.inputDebounce && props.inputDebounce > 0
      ? debounce(onSearchLocale, props.inputDebounce)
      : onSearchLocale
  )
  const onSearch = $computed(() =>
    props.onSearch2 ? onSearchRemoteDebounce : onSearchLocaleDebounce
  )

  function onScrollSearch(e: UIEvent) {
    const genUpdate = function () {
      const tempId = increaseId
      return function (opts: OptionsType) {
        if (tempId !== increaseId) {
          return
        }
        if (opts && opts.length > 0) {
          if (options) {
            options.push(...propMapOptions(opts, propMap)!)
          } else {
            setOptions(
              propMapOptions([...(props.options || []), ...opts], propMap)
            )
          }
        }
      }
    }
    props.onScrollSearch?.(e, options, genUpdate())
  }

  function setOptions(val?: AOptions) {
    options = val
  }

  return {
    onSearch: $$(onSearch),
    options: $$(options),
    searchStatus: $$(searchStatus),
    setOptions,
    onScrollSearch
  }
}
