import {
  TabPane as ATabPane,
  TabPaneProps as ATabPaneProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ATabPaneSlots } from './type'

const [prefixName, prefixCls] = getPrefix('tab-pane')

const TabPane = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ATabPaneProps>())
    const slots = useSlots() as ATabPaneSlots
    return () => <ATabPane class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type TabPaneProps = PropsType<typeof TabPane> & PropsType<ATabPaneProps>
export type TabPaneExpose = {}
export type TabPaneSlots = ATabPaneSlots

export default TabPane as GlobalComponentConstructor<TabPaneProps, TabPaneSlots>
