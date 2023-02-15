import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-tag 的 slots 类型
export type ATagSlots = Readonly<
  DefaultSlots & {
    /** 关闭图标 */
    closeIcon?(): VNode[]
    /** 图标 */
    icon?(): VNode[]
  }
>
