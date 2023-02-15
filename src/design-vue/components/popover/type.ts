import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-popover 的 slots 类型
export type APopoverSlots = Readonly<
  DefaultSlots & {
    title?(): VNode[]
    content?(): VNode[]
  }
>

// 补充 a-popover 的 expose 类型
export type APopoverExpose = {
  getPopupDomNode(): any
}
