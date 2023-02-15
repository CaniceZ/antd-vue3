import { List as AList, ListProps as AListProps } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AListSlots } from './type'

const [prefixName, prefixCls] = getPrefix('list')

const List = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AListProps>())
    const slots = useSlots() as AListSlots
    return () => <AList class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type ListProps = PropsType<typeof List> & PropsType<AListProps>
export type ListExpose = {}
export type ListSlots = AListSlots

export default List as GlobalComponentConstructor<ListProps, ListSlots>
