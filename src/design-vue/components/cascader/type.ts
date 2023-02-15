import { VNode } from 'vue'
import { DefaultInputExpose } from '../../types/antdv'

// 补充 a-cascader 的 expose 类型
export type ACascaderExpose = DefaultInputExpose

// 补充 a-cascader 的 slots 类型
export type ACascaderSlots = Readonly<{
  /** 当下拉列表为空时显示的内容 */
  notFoundContent?(): VNode[]
  /** 自定义次级菜单展开图标 */
  expandIcon?(): VNode[]
  /** 隐藏 tag 时显示的内容 */
  maxTagPlaceholder?(): VNode[]
  /** 自定义的选择框清空图标 */
  clearIcon?(): VNode[]
  /** 自定义的多选框清除图标 */
  removeIcon?(): VNode[]
  /** 自定义 tag 内容，多选时生效 */
  tagRender?(): VNode[]
  /** 自定义的选择框后缀图标 */
  suffixIcon?(): VNode[]
  /** 选择后展示的内容, 单选时生效 */
  displayRender?(): VNode[]
}>
