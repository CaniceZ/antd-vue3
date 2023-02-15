import { defineComponent, useSlots } from 'vue'
import { MenuItemGroup as AMenuItemGroup } from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { AMenuItemGroupProps, AMenuItemGroupSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('menu-item-group')

const MenuItemGroup = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AMenuItemGroupProps>())
    const slots = useSlots() as AMenuItemGroupSlots
    return () => (
      <AMenuItemGroup class={prefixCls} {...(attrs as any)} v-slots={slots} />
    )
  }
})

export type MenuItemGroupProps = PropsType<typeof MenuItemGroup> &
  PropsType<AMenuItemGroupProps>
export type MenuItemGroupExpose = {}
export type MenuItemGroupSlots = AMenuItemGroupSlots

export default MenuItemGroup as GlobalComponentConstructor<
  MenuItemGroupProps,
  MenuItemGroupSlots
>
