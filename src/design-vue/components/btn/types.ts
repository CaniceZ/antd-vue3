import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-button 的 slots 类型
export type AButtonSlots = DefaultSlots & {
  /** 覆盖按钮的icon插槽 */
  icon(): VNode[]
}
