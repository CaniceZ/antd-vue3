import type { AAutoCompleteProps, OptionsType } from './types'
import debounce from 'lodash-es/debounce'
import type { AutoCompleteProps } from './AutoComplete'
import { autoCompleteProps } from './AutoComplete'
import propMapOptions from './propMapOptions'
import { ComputedRef, Ref } from 'vue'
import type { PropMapType } from '../../_utils/select-utils'
import { SearchStatus } from '../../_utils/select-utils'
import { PropsType } from '../../types/ts-helpers'

type Options = AutoCompleteProps['options']

export default function useOnSearch({
  props,
  attrs,
  propMap: _propMap,
  options: _options
}: {
  props: PropsType<typeof autoCompleteProps>
  attrs: Pick<AAutoCompleteProps, 'filterOption'>
  propMap: ComputedRef<PropMapType>
  options: ComputedRef<AAutoCompleteProps['options']>
}): {
  onSearch: ComputedRef<(input: AAutoCompleteProps['value']) => void>
  options: Ref<Options>
  searchStatus: Ref<SearchStatus>
  setOptions: (val?: Options) => void
} {
  let increaseId = 0
  let options = $ref<Options>()
  let searchStatus = $ref<SearchStatus>()
  const propMap = $(_propMap)
  const computedOptions = $(_options)

  // 为本地过滤场景
  function onSearchLocale(input: AAutoCompleteProps['value']) {
    if (!input) {
      setOptions()
      return
    }
    const res = computedOptions?.filter(option =>
      typeof attrs.filterOption === 'function'
        ? attrs.filterOption?.(input, option)
        : String(option.value)
            .toUpperCase()
            .indexOf(String(input).toUpperCase()) > -1
    )
    if (res && res.length === 0) {
      setOptions([{ value: String(input) }])
    } else {
      setOptions(res)
    }
  }

  // 异步过滤场景
  function onSearchRemote(input: AAutoCompleteProps['value']) {
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
          setOptions()
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
      if (options) {
        setOptions()
      }
      if (searchStatus !== SearchStatus.Fetching) {
        searchStatus = SearchStatus.Fetching
      }
    } else {
      searchStatus = SearchStatus.Abort
    }
    props.onSearch?.(input, genUpdate(), genAbort())
  }

  const onSearchRemoteDebounce = $computed(() =>
    props.inputDebounce! > 0
      ? debounce(onSearchRemote, props.inputDebounce)
      : onSearchRemote
  )
  const onSearchLocaleDebounce = $computed(() =>
    props.inputDebounce! > 0
      ? debounce(onSearchLocale, props.inputDebounce)
      : onSearchLocale
  )
  const onSearch = $computed(() =>
    props.onSearch ? onSearchRemoteDebounce : onSearchLocaleDebounce
  )

  function setOptions(val?: AutoCompleteProps['options']) {
    options = val
  }

  return {
    onSearch: $$(onSearch),
    options: $$(options),
    searchStatus: $$(searchStatus),
    setOptions
  }
}
