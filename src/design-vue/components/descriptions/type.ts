import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-descriptions 的 slots 类型
export type ADescriptionsSlots = Readonly<
  DefaultSlots & {
    /** 描述列表的标题，显示在最顶部 */
    title?(): VNode[]
    /** 描述列表的操作区域，显示在右上方 */
    extra?(): VNode[]
  }
>

// 补充 a-descriptions-item 的 slots 类型
export type ADescriptionsItemSlots = Readonly<
  DefaultSlots & {
    /** 内容的描述 */
    label?(): VNode[]
  }
>
