import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-list 的 slots 类型
export type AListSlots = Readonly<
  DefaultSlots & {
    extra?(): VNode[]
    loadMore?(): VNode[]
    renderItem?(): VNode[]
    header?(): VNode[]
    footer?(): VNode[]
  }
>

// 补充 a-list-item 的 slots 类型
export type AListItemSlots = Readonly<
  DefaultSlots & {
    actions?(): VNode[]
    extra?(): VNode[]
  }
>

// 补充 a-list-item-meta 的 slots 类型
export type AListItemMetaSlots = Readonly<{
  avatar?(): VNode[]
  description?(): VNode[]
  title?(): VNode[]
}>
