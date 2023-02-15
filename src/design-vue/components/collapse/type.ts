import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-collapse 的 slots 类型
export type ACollapseSlots = Readonly<
  DefaultSlots & {
    /* 自定义切换图标 */
    expandIcon?(props?: any): VNode[]
  }
>

// 补充 a-collapse-panel 的 slots 类型
export type ACollapsePanelSlots = Readonly<
  DefaultSlots & {
    /* 自定义渲染每个面板右上角的内容 */
    extra?(): VNode[]
    /* 面板头内容 */
    header?(): VNode[]
  }
>
