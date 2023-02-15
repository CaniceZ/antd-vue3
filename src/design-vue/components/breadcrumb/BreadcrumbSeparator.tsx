import {
  BreadcrumbSeparator as ABreadcrumbSeparator,
  BreadcrumbSeparatorProps as ABreadcrumbSeparatorProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ABreadcrumbSeparatorSlots } from './type'

const [prefixName, prefixCls] = getPrefix('breadcrumb-separator')

const BreadcrumbSeparator = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ABreadcrumbSeparatorProps>())
    const slots = useSlots() as ABreadcrumbSeparatorSlots
    return () => (
      <ABreadcrumbSeparator class={prefixCls} {...attrs} v-slots={slots} />
    )
  }
})

export type BreadcrumbSeparatorProps = PropsType<typeof BreadcrumbSeparator> &
  PropsType<ABreadcrumbSeparatorProps>
export type BreadcrumbSeparatorExpose = {}
export type BreadcrumbSeparatorSlots = ABreadcrumbSeparatorSlots

export default BreadcrumbSeparator as GlobalComponentConstructor<
  BreadcrumbSeparatorProps,
  BreadcrumbSeparatorSlots
>
