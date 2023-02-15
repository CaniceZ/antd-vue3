import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-timeline 的 slots 类型
export type ATimelineSlots = Readonly<
  DefaultSlots & {
    /* 指定最后一个幽灵节点是否存在或内容 */
    pending?(): VNode[]
    /* 当最后一个幽灵节点存在時，指定其时间图点 */
    pendingDot?(): VNode[]
  }
>

// 补充 a-timeline-item 的 slots 类型
export type ATimelineItemSlots = Readonly<
  DefaultSlots & {
    /* 自定义时间轴点 */
    dot?(): VNode[]
    /* 设置标签 */
    label?(): VNode[]
  }
>
