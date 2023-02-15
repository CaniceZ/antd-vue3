import {
  Breadcrumb as ABreadcrumb,
  BreadcrumbProps as ABreadcrumbProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ABreadcrumbSlots } from './type'

const [prefixName, prefixCls] = getPrefix('breadcrumb')

const Breadcrumb = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ABreadcrumbProps>())
    const slots = useSlots() as ABreadcrumbSlots
    return () => <ABreadcrumb class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type BreadcrumbProps = PropsType<typeof Breadcrumb> &
  PropsType<ABreadcrumbProps>
export type BreadcrumbExpose = {}
export type BreadcrumbSlots = ABreadcrumbSlots

export default Breadcrumb as GlobalComponentConstructor<
  BreadcrumbProps,
  BreadcrumbSlots
>
