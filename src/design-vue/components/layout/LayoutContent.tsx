import { LayoutContent as ALayoutContent } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ALayoutContentProps, ALayoutContentSlots } from './type'

const [prefixName, prefixCls] = getPrefix('layout-content')

const LayoutContent = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ALayoutContentProps>())
    const slots = useSlots() as ALayoutContentSlots
    return () => (
      <ALayoutContent class={prefixCls} {...(attrs as any)} v-slots={slots} />
    )
  }
})

export type LayoutContentProps = PropsType<typeof LayoutContent> &
  PropsType<ALayoutContentProps>
export type LayoutContentExpose = {}
export type LayoutContentSlots = ALayoutContentSlots

export default LayoutContent as GlobalComponentConstructor<
  LayoutContentProps,
  LayoutContentSlots
>
