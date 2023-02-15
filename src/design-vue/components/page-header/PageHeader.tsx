import {
  PageHeader as APageHeader,
  PageHeaderProps as APageHeaderProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { APageHeaderSlots } from './type'

const [prefixName, prefixCls] = getPrefix('page-header')

const PageHeader = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<APageHeaderProps>())
    const slots = useSlots() as APageHeaderSlots
    return () => <APageHeader class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type PageHeaderProps = PropsType<typeof PageHeader> &
  PropsType<APageHeaderProps>
export type PageHeaderExpose = {}
export type PageHeaderSlots = APageHeaderSlots

export default PageHeader as GlobalComponentConstructor<
  PageHeaderProps,
  PageHeaderSlots
>
