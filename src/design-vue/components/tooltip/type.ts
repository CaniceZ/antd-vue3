import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-tooltip 的 slots 插槽
export type ATooltipSlots = Readonly<
  DefaultSlots & {
    /** 提示标题 */
    title?(): VNode[]
  }
>
