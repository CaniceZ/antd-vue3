import { defineComponent, useSlots } from 'vue'
import { Menu as AMenu, MenuProps as AMenuProps } from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { AMenuSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('menu')

const Menu = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AMenuProps>())
    const slots = useSlots() as AMenuSlots
    return () => <AMenu class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type MenuProps = PropsType<typeof Menu> & PropsType<AMenuProps>
export type MenuExpose = {}
export type MenuSlots = AMenuSlots

export default Menu as GlobalComponentConstructor<MenuProps, MenuSlots>
