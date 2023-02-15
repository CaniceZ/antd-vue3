import { TableSummaryCell as ATableSummaryCell } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ATableSummaryCellProps, ATableSummaryCellSlots } from './types'

const [prefixName, prefixCls] = getPrefix('table-summary-cell')

const TableSummaryCell = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ATableSummaryCellProps>())
    const slots = useSlots() as ATableSummaryCellSlots

    return () => (
      <ATableSummaryCell class={prefixCls} {...attrs} v-slots={slots} />
    )
  }
})

export type TableSummaryCellProps = PropsType<typeof TableSummaryCell> &
  PropsType<ATableSummaryCellProps>
export type TableSummaryCellExpose = {}
export type TableSummaryCellSlots = ATableSummaryCellSlots

export default TableSummaryCell as GlobalComponentConstructor<
  TableSummaryCellProps,
  TableSummaryCellSlots
>
