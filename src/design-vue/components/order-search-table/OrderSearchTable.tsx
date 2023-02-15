import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import SearchTable, {
  SearchTableProps,
  SearchTableExpose,
  SearchTableSlots
} from '../search-table/SearchTable'
import OrderTable, {
  OrderTableProps,
  OrderTableSlots
} from '../order-table/OrderTable'
import useRefExpose from '../../_hooks/useRefExpose'

const [prefixName, prefixCls] = getPrefix('order-search-table')

const OrderSearchTable = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup(_, { expose }) {
    const attrs = $(useAttrs<SearchTableProps & OrderTableProps>())
    const slots = useSlots() as SearchTableSlots
    const [orderSearchTableRef, orderSearchTAbleExpose] =
      useRefExpose<SearchTableExpose>([
        'form',
        'reset',
        'table',
        'search',
        'export',
        'toggle',
        'expand',
        'collapse',
        'setTableHeader'
      ])
    expose(orderSearchTAbleExpose)

    return () => (
      <SearchTable
        ref={orderSearchTableRef}
        wrapperClassName={`${prefixCls} ${attrs.wrapperClassName || ''}`}
        {...attrs}
        v-slots={{
          ...slots,
          default({ tableProps, tableRef, tableSlots }) {
            return (
              <OrderTable ref={tableRef} {...tableProps} v-slots={tableSlots} />
            )
          }
        }}
      />
    )
  }
})

export type OrderSearchTableProps = PropsType<typeof OrderSearchTable> &
  SearchTableProps &
  OrderTableProps
export type OrderSearchTableExpose = SearchTableExpose
export type OrderSearchTableSlots = SearchTableSlots & OrderTableSlots

export default OrderSearchTable as GlobalComponentConstructor<
  OrderSearchTableProps,
  OrderSearchTableSlots
>
