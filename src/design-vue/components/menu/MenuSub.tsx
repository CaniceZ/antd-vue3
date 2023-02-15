import { defineComponent, getCurrentInstance, useSlots } from 'vue'
import {
  SubMenu as ASubMenu,
  SubMenuProps as ASubMenuProps
} from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { AMenuSlots, ASubMenuSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('menu-sub')

/**
 * ant-design-vue 里原组件名是 `a-sub-menu`
 * 这里为了保持一致的命名规则，更名为 `y-menu-sub`
 */
const MenuSub = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ASubMenuProps>())
    const slots = useSlots() as ASubMenuSlots
    const instance = getCurrentInstance()
    const key = $computed(
      () => instance?.vnode?.key as PropsType<typeof ASubMenu>['key']
    )

    return () => (
      <ASubMenu class={prefixCls} {...attrs} key={key} v-slots={slots} />
    )
  }
})

export type MenuSubProps = PropsType<typeof MenuSub> & PropsType<ASubMenuProps>
export type MenuSubExpose = {}
export type MenuSubSlots = AMenuSlots

export default MenuSub as GlobalComponentConstructor<MenuSubProps, MenuSubSlots>
