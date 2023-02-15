import { AutoCompleteProps } from 'ant-design-vue'
import { VNode } from 'vue'
import { DefaultInputExpose } from '../../types/antdv'
import { DefaultSlots } from '../../types/vue'

export type OptionsType = AutoCompleteProps['options'] | number[] | string[]

export type AAutoCompleteProps = AutoCompleteProps

// 补充 a-auto-complete 的 expose 类型
export type AAutoCompleteExpose = DefaultInputExpose

// 补充 a-auto-complete 的 slots 类型
export type AAutoCompleteSlots = Readonly<
  DefaultSlots & {
    /** 找不到结果时展示的内容插槽 */
    notFoundContent?(): VNode[]
    /**
     * 通过 option 插槽，自定义节点
     * @param {any} data 当前行数据
     */
    option?(data: any): VNode[]
    /* @depreated */
    dataSource?(): VNode[]
    /* @depreated */
    options?(): VNode[]
    /* @depreated */
    placeholder?(): VNode[]
  }
>
