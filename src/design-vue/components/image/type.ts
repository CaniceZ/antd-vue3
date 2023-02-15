import { ImagePreviewGroup as AImagePreviewGroup } from 'ant-design-vue'
import { VNode } from 'vue'
import { PropsType } from '../../types/ts-helpers'
import { DefaultSlots } from '../../types/vue'

// 补充 a-image 的 slots 类型
export type AImageSlots = Readonly<{
  /* 自定义 `mask` */
  reviewMask?(): VNode[]
  /* 加载占位, 为 `true` 时使用默认占位 */
  placeholder?(): VNode[]
}>

// 补充 a-image-preview-group 的 props 类型
export type AImagePreviewGroupProps = PropsType<typeof AImagePreviewGroup>

// 补充 a-image-preview-group 的 slots 类型
export type AImagePreviewGroupSlots = Readonly<DefaultSlots>
