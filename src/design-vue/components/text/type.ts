import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-typography-text 的 slots 类型
export type ATypographyTextSlots = Readonly<
  DefaultSlots & {
    copyableIcon?(): VNode[]
    copyableTooltip?(): VNode[]
    editableIcon?(): VNode[]
    editableTooltip?(): VNode[]
    ellipsisSymbol?(): VNode[]
    ellipsisTooltip?(): VNode[]
    enterEnterIcon?(): VNode[]
  }
>
