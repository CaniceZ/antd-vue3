import { LayoutHeader as ALayoutHeader } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ALayoutHeaderProps, ALayoutHeaderSlots } from './type'

const [prefixName, prefixCls] = getPrefix('layout-header')

const LayoutHeader = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ALayoutHeaderProps>())
    const slots = useSlots() as ALayoutHeaderSlots
    return () => (
      <ALayoutHeader class={prefixCls} {...(attrs as any)} v-slots={slots} />
    )
  }
})

export type LayoutHeaderProps = PropsType<typeof LayoutHeader> &
  PropsType<ALayoutHeaderProps>
export type LayoutHeaderExpose = {}
export type LayoutHeaderSlots = ALayoutHeaderSlots

export default LayoutHeader as GlobalComponentConstructor<
  LayoutHeaderProps,
  LayoutHeaderSlots
>
