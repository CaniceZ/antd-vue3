import { Layout as ALayout, LayoutProps as ALayoutProps } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ALayoutSlots } from './type'

const [prefixName, prefixCls] = getPrefix('layout')

const Layout = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ALayoutProps>())
    const slots = useSlots() as ALayoutSlots
    return () => <ALayout class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type LayoutProps = PropsType<typeof Layout> & PropsType<ALayoutProps>
export type LayoutExpose = {}
export type LayoutSlots = ALayoutSlots

export default Layout as GlobalComponentConstructor<LayoutProps, LayoutSlots>
