import { TableSummary as ATableSummary } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ATableSummaryProps, ATableSummarySlots } from './types'

const [prefixName, prefixCls] = getPrefix('table-summary')

const TableSummary = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ATableSummaryProps>())
    const slots = useSlots() as ATableSummarySlots

    return () => <ATableSummary class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type TableSummaryProps = PropsType<typeof TableSummary> &
  PropsType<ATableSummaryProps>
export type TableSummaryExpose = {}
export type TableSummarySlots = ATableSummarySlots

export default TableSummary as GlobalComponentConstructor<
  TableSummaryProps,
  TableSummarySlots
>
