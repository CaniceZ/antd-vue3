import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-comment 的 slots 类型
export type ACommentSlots = Readonly<
  DefaultSlots & {
    /* 在评论内容下面呈现的操作项列表 */
    actions?(): VNode[]
    /* 要显示为注释作者的元素 */
    author?(): VNode[]
    /* 要显示为评论头像的元素 - 通常是 antd `Avatar` 或者 src */
    avatar?(): VNode[]
    /* 评论的主要内容 */
    content?(): VNode[]
    /* 展示时间描述 */
    datetime?(): VNode[]
  }
>
