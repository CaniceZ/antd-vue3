import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-card 的 slots 类型定义
export type ACardSlots = Readonly<
  DefaultSlots & {
    /** 卡片标题 */
    title?(): VNode[]
    /** 卡片右上角的操作区域 */
    extra?(): VNode[]
    /** tab bar 上额外的元素 */
    tabBarExtraContent?(): VNode[]
    /** 卡片操作组，位置在卡片底部 */
    actions?(): VNode[]
    /** 卡片封面插槽 */
    cover?(): VNode[]
    /** 自定义 tabList tab 标签 */
    customTab?(): VNode[]
  }
>

// 补充 a-card-grid 的 slots 类型
export type ACardGridSlots = Readonly<DefaultSlots>

// 补充 a-card-meta 的 slots 类型
export type ACardMetaSlots = Readonly<{
  /** 卡片头像 */
  avatar?(): VNode[]
  /** 卡片标题 */
  title?(): VNode[]
  /** 卡片描述 */
  description?(): VNode[]
}>
