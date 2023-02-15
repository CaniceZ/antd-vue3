import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-tree-select 的 slots 类型
export type ATreeSelectSlots = Readonly<
  DefaultSlots & {
    /** 自定义标题 */
    title?(): VNode[]
    /** 选择框默认文字 */
    placeholder?(): VNode[]
    /** 搜索框默认文字 */
    searchPlaceholder?(): VNode[]
    /** 隐藏 tag 时显示的内容 */
    maxTagPlaceholder?(): VNode[]
    switcherIcon?(): VNode[]
    /** 当下拉列表为空时显示的内容 */
    notFoundContent?(): VNode[]
    /** 自定义的选择框后缀图标 */
    suffixIcon?(): VNode[]
    /** 自定义 tag 内容，多选时生效 */
    tagRender?(): VNode[]
  }
>
