import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-result 的 slots 类型
export type AResultSlots = Readonly<
  DefaultSlots & {
    /* title 文字 */
    title?(): VNode[]
    /* subTitle 文字 */
    subTitle?(): VNode[]
    /* 自定义 icon */
    icon?(): VNode[]
    /* 操作区 */
    extra?(): VNode[]
  }
>
