import { LayoutSider as ALayoutSider } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ALayoutSiderProps, ALayoutSiderSlots } from './type'

const [prefixName, prefixCls] = getPrefix('layout-sider')

const LayoutSider = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ALayoutSiderProps>())
    const slots = useSlots() as ALayoutSiderSlots
    return () => (
      <ALayoutSider class={prefixCls} {...(attrs as any)} v-slots={slots} />
    )
  }
})

export type LayoutSiderProps = PropsType<typeof LayoutSider> &
  PropsType<ALayoutSiderProps>
export type LayoutSiderExpose = {}
export type LayoutSiderSlots = ALayoutSiderSlots

export default LayoutSider as GlobalComponentConstructor<
  LayoutSiderProps,
  LayoutSiderSlots
>
