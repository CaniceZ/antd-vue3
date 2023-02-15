import { VNode } from 'vue'
import { DefaultInputExpose } from '../../types/antdv'
import { DefaultSlots } from '../../types/vue'

// 补充 a-mentions 的 slots 类型
export type AMentionsSlots = Readonly<
  DefaultSlots & {
    /* 当下拉列表为空时显示的内容 */
    notFoundContent?(): VNode[]
    option?(): VNode[]
  }
>

// 补充 a-mentions 的 expose 类型
export type AMentionsExpose = DefaultInputExpose

// 补充 a-mentions-option 的 slots 类型
export type AMentionsOptionSlots = Readonly<DefaultSlots>
