import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-badge 的 slots 类型
export type ABadgeSlots = Readonly<
  DefaultSlots & {
    /* 展示的数字，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏 */
    count?(): VNode[]
  }
>

// 补充 a-badge-ribbon 的 slots 类型
export type ABadgeRibbonSlots = Readonly<
  DefaultSlots & {
    /* 缎带中填入的内容 */
    text?(): VNode[]
  }
>
