import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-modal 的 slots 类型
export type AModalSlots = Readonly<
  DefaultSlots & {
    okText?(): VNode[]
    cancelText?(): VNode[]
    closeIcon?(): VNode[]
    footer?(): VNode[]
  }
>
