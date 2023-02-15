import {
  SelectOption as ASelectOption,
  SelectOptGroup as ASelectOptGroup
} from 'ant-design-vue'
import { VNode } from 'vue'
import { DefaultInputExpose } from '../../types/antdv'
import { PropsType } from '../../types/ts-helpers'
import { DefaultSlots } from '../../types/vue'

// 补充 a-select 的 slots 类型
export type ASelectSlots = Readonly<
  DefaultSlots & {
    /* 	当下拉列表为空时显示的内容 */
    notFoundContent?(): VNode[]
    /* 自定义的选择框后缀图标 */
    suffixIcon?(): VNode[]
    itemIcon?(): VNode[]
    /* 自定义的多选框清除图标 */
    removeIcon?(): VNode[]
    /* 自定义的多选框清空图标 */
    clearIcon?(): VNode[]
    /* 自定义下拉框内容 */
    dropdownRender?(): VNode[]
    /* 通过 option 插槽，自定义节点 */
    option?(): VNode[]
    /* 选择框默认文字 */
    placeholder?(): VNode[]
    /* 自定义 tag 内容 render，仅在 mode 为 multiple 或 tags 时生效 */
    tagRender?(): VNode[]
    /* 隐藏 tag 时显示的内容 */
    maxTagPlaceholder?(): VNode[]
  }
>

// 补充 a-select 的 expose 类型
export type ASelectExpose = DefaultInputExpose

// 补充 a-select-option 的 slots 类型
export type ASelectOptionSlots = Readonly<DefaultSlots>

// 补充 a-select-option 的 props 类型
export type ASelectOptionProps = PropsType<typeof ASelectOption>

// 补充 a-select-opt-group 的 slots 类型
export type ASelectOptGroupSlots = Readonly<DefaultSlots>

// 补充 a-select-opt-group 的 props 类型
export type ASelectOptGroupProps = PropsType<typeof ASelectOptGroup>

export type OptionsType =
  | ASelectOptionProps['options']
  | number[]
  | string[]
  | boolean[]

export type PropMapType = {
  label?: string
  value?: string
  disabled?: boolean
  title?: string
  key?: string | number
}
