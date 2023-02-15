import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-anchor 的 slots 类型
export type AAnchorSlots = Readonly<DefaultSlots>

// 补充 a-anchor-link 的 slots 类型
export type AAnchorLinkSlots = Readonly<
  DefaultSlots & {
    /* 文字内容 */
    title?(): VNode[]
  }
>
