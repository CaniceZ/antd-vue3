import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-avatar 的 slots 类型
export type AAvatarSlots = Readonly<
  DefaultSlots & {
    /** 图标 */
    icon?(): VNode[]
  }
>
