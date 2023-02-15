import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-drawer 的 slots 类型
export type ADrawerSlots = Readonly<
  DefaultSlots & {
    /** 自定义关闭图标 */
    closeIcon?(): VNode[]
    /** 标题 */
    title?(): VNode[]
    /** 抽屉右上角的操作区域 */
    extra?(): VNode[]
    /** 抽屉的页脚 */
    footer?(): VNode[]
    handle?(): VNode[]
  }
>
