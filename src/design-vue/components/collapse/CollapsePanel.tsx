import {
  CollapsePanel as ACollapsePanel,
  CollapsePanelProps as ACollapsePanelProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ACollapsePanelSlots } from './type'

const [prefixName, prefixCls] = getPrefix('collapse-panel')

const CollapsePanel = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ACollapsePanelProps>())
    const slots = useSlots() as ACollapsePanelSlots
    return () => <ACollapsePanel class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type CollapsePanelProps = PropsType<typeof CollapsePanel> &
  PropsType<ACollapsePanelProps>
export type CollapsePanelExpose = {}
export type CollapsePanelSlots = ACollapsePanelSlots

export default CollapsePanel as GlobalComponentConstructor<
  CollapsePanelProps,
  CollapsePanelSlots
>
