import {
  ListItem as AListItem,
  ListItemProps as AListItemProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AListItemSlots } from './type'

const [prefixName, prefixCls] = getPrefix('list-item')

const ListItem = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AListItemProps>())
    const slots = useSlots() as AListItemSlots
    return () => <AListItem class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type ListItemProps = PropsType<typeof ListItem> &
  PropsType<AListItemProps>
export type ListItemExpose = {}
export type ListItemSlots = AListItemSlots

export default ListItem as GlobalComponentConstructor<
  ListItemProps,
  ListItemSlots
>
