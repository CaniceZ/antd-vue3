import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-tree 的 slots 类型
export type ATreeSlots = Readonly<
  DefaultSlots & {
    /** 自定义图标。可接收组件，props 为当前节点 props */
    icon?(): VNode[]
    /** 自定义标题 */
    title?(): VNode[]
    /** 自定义树节点的展开/折叠图标 */
    switcherIcon?(): VNode[]
  }
>
