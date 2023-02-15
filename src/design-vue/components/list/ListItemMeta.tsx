import {
  ListItemMeta as AListItemMeta,
  ListItemMetaProps as AListItemMetaProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AListItemMetaSlots } from './type'

const [prefixName, prefixCls] = getPrefix('list-item-meta')

const ListItemMeta = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AListItemMetaProps>())
    const slots = useSlots() as AListItemMetaSlots
    return () => <AListItemMeta class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type ListItemMetaProps = PropsType<typeof ListItemMeta> &
  PropsType<AListItemMetaProps>
export type ListItemMetaExpose = {}
export type ListItemMetaSlots = AListItemMetaSlots

export default ListItemMeta as GlobalComponentConstructor<
  ListItemMetaProps,
  ListItemMetaSlots
>
