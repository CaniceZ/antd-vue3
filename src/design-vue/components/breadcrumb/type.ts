import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-breadcrumb 的 slots 类型
export type ABreadcrumbSlots = Readonly<
  DefaultSlots & {
    /* 分隔符自定义 */
    separator?(): VNode[]
    itemRender?(): VNode[]
  }
>

// 补充 a-breadcrumb-item 的 slots 类型
export type ABreadcrumbItemSlots = Readonly<
  DefaultSlots & {
    /* 分隔符自定义 */
    separator?(): VNode[]
    overlay?(): VNode[]
  }
>

// 补充 a-breadcrumb-separator 的 slots 类型
export type ABreadcrumbSeparatorSlots = Readonly<DefaultSlots>
