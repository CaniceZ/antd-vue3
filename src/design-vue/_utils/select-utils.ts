import { ComputedRef, PropType } from 'vue'
import { PropsType } from '../types/ts-helpers'

export enum SearchStatus {
  Fetching = 'fetching',
  Done = 'done',
  NoData = 'nodata',
  Abort = 'abort'
}

export type PropMapType = {
  label?: string
  value?: string
  options?: string
  disabled?: string
  title?: string
  key?: string
}

export const definePropMap = () => ({
  /**
   * 配置 options 的自定义字段
   *
   * @default `{value: 'name'}`
   *
   * Example: {value: 'nickname'}
   */
  propMap: {
    type: Object as PropType<Partial<PropMapType>>,
    default: () => ({})
  }
})

// const defaultPropMap = {
//   value: 'name',
//   label: 'type',
//   options: 'options',
//   children: 'children',
//   disabled: 'disabled',
//   title: 'title',
//   key: 'key',
// }

export function usePropMap(
  props: PropsType<typeof definePropMap>,
  defaultPropMap: PropMapType
): ComputedRef<PropMapType> {
  const propMap = $computed(() => ({
    ...defaultPropMap,
    ...(props.propMap || {})
  }))
  return $$(propMap)
}
