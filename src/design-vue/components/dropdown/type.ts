import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-dropdown 的 slots 类型
export type ADropdownSlots = Readonly<
  DefaultSlots & {
    /* 菜单 */
    overlay?(): VNode[]
  }
>
