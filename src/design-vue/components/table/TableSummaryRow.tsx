import { TableSummaryRow as ATableSummaryRow } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ATableSummaryRowProps, ATableSummaryRowSlots } from './types'

const [prefixName, prefixCls] = getPrefix('table-summary-row')

const TableSummaryRow = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ATableSummaryRowProps>())
    const slots = useSlots() as ATableSummaryRowSlots

    return () => (
      <ATableSummaryRow class={prefixCls} {...attrs} v-slots={slots} />
    )
  }
})

export type TableSummaryRowProps = PropsType<typeof TableSummaryRow> &
  PropsType<ATableSummaryRowProps>
export type TableSummaryRowExpose = {}
export type TableSummaryRowSlots = ATableSummaryRowSlots

export default TableSummaryRow as GlobalComponentConstructor<
  TableSummaryRowProps,
  TableSummaryRowSlots
>
