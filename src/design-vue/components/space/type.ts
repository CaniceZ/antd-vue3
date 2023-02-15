import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-space 的 slots 类型
export type ASpaceSlots = Readonly<
  DefaultSlots & {
    /* 自定义刻度标记 */
    split?(): VNode[]
  }
>
