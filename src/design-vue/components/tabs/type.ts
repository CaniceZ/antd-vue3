import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-tabs 的 slots 类型
export type ATabsSlots = Readonly<
  DefaultSlots & {
    tabBarExtraContent?(): VNode[]
    leftExtra?(): VNode[]
    rightExtra?(): VNode[]
    moreIcon?(): VNode[]
    addIcon?(): VNode[]
    removeIcon?(): VNode[]
    renderTabBar?(): VNode[]
  }
>

// 补充 a-tab-pane 的 slots 类型
export type ATabPaneSlots = Readonly<
  DefaultSlots & {
    closeIcon?(): VNode[]
    tab?(): VNode[]
  }
>
