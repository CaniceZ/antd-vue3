import { defineComponent, useSlots } from 'vue'
import {
  MenuDivider as AMenuDivider,
  MenuDividerProps as AMenuDividerProps
} from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { AMenuDividerSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('menu-divider')

const MenuDivider = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AMenuDividerProps>())
    const slots = useSlots() as AMenuDividerSlots
    return () => <AMenuDivider class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type MenuDividerProps = PropsType<typeof MenuDivider> &
  PropsType<AMenuDividerProps>
export type MenuDividerExpose = {}
export type MenuDividerSlots = AMenuDividerSlots

export default MenuDivider as GlobalComponentConstructor<
  MenuDividerProps,
  MenuDividerSlots
>
