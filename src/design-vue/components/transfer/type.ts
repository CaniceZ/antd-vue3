import { TransferDirection } from 'ant-design-vue/lib/transfer'
import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-transfer 的 slots 类型
export type ATransferSlots = Readonly<
  DefaultSlots & {
    leftTitle?(): VNode[]
    rightTitle?(): VNode[]
    children?(): VNode[]
    /**
     * 每行数据渲染函数，该函数的入参为 dataSource 中的项，返回值为 element。或者返回一个普通对象，其中 label 字段为 element，value 字段为 title
     */
    render?(): VNode[]
    notFoundContent?(): VNode[]
    leftSelectAllLabel?(): VNode[]
    rightSelectAllLabel?(): VNode[]
    /* 可以设置为一个 作用域插槽 */
    footer?(props: any): VNode[]
  }
>

export type ATransferExpose = {
  handleSelectChange: (direction: TransferDirection, holder: string[]) => void
}
