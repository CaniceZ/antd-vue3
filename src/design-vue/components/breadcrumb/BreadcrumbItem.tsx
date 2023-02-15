import {
  BreadcrumbItem as ABreadcrumbItem,
  BreadcrumbItemProps as ABreadcrumbItemProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ABreadcrumbItemSlots } from './type'

const [prefixName, prefixCls] = getPrefix('breadcrumb-item')

const BreadcrumbItem = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ABreadcrumbItemProps>())
    const slots = useSlots() as ABreadcrumbItemSlots
    return () => (
      <ABreadcrumbItem class={prefixCls} {...attrs} v-slots={slots} />
    )
  }
})

export type BreadcrumbItemProps = PropsType<typeof BreadcrumbItem> &
  PropsType<ABreadcrumbItemProps>
export type BreadcrumbItemExpose = {}
export type BreadcrumbItemSlots = ABreadcrumbItemSlots

export default BreadcrumbItem as GlobalComponentConstructor<
  BreadcrumbItemProps,
  BreadcrumbItemSlots
>
