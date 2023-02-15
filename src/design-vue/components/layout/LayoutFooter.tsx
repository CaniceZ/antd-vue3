import { LayoutFooter as ALayoutFooter } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ALayoutFooterProps, ALayoutFooterSlots } from './type'

const [prefixName, prefixCls] = getPrefix('layout-footer')

const LayoutFooter = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ALayoutFooterProps>())
    const slots = useSlots() as ALayoutFooterSlots
    return () => (
      <ALayoutFooter class={prefixCls} {...(attrs as any)} v-slots={slots} />
    )
  }
})

export type LayoutFooterProps = PropsType<typeof LayoutFooter> &
  PropsType<ALayoutFooterProps>
export type LayoutFooterExpose = {}
export type LayoutFooterSlots = ALayoutFooterSlots

export default LayoutFooter as GlobalComponentConstructor<
  LayoutFooterProps,
  LayoutFooterSlots
>
