import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-spin 的 slots 类型
export type ASpinSlots = Readonly<
  DefaultSlots & {
    tip?(): VNode[]
  }
>
