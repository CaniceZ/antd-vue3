import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-empty 的 slots 类型
export type AEmptySlots = Readonly<
  DefaultSlots & {
    /* 设置显示图片，为 string 时表示自定义图片地址 */
    image?(): VNode[]
    /* 自定义描述内容 */
    description?(): VNode[]
  }
>
