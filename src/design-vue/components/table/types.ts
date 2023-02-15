import { FormItem } from '../form/types'
import { TableProps as AATableProps } from 'ant-design-vue'
import {
  TableColumnType,
  TableSummary as ATableSummary,
  TableSummaryRow as ATableSummaryRow,
  TableSummaryCell as ATableSummaryCell
} from 'ant-design-vue'
import { CSSProperties, VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'
import { PropsType } from '../../types/ts-helpers'
import { FilterDropdownProps } from 'ant-design-vue/lib/table/interface'

type NewFormItem = Omit<
  FormItem,
  'name' | 'names' | 'label' | 'row' | 'newline' | 'hide'
>

export type BodyCellParams = {
  record: any
  column: TableColumn
  index: number
  text: any
}

export type HeaderCellParams = {
  column: TableColumn
  title: string
}

type Col<T> = T extends Array<infer O> ? O : T

type CustomRender = TableColumnType['customRender']

export type TableColumn = Omit<Col<AATableProps['columns']>, 'rowSpan'> & {
  editable?: boolean | ((prop: BodyCellParams) => boolean)
  title?: string
  key?: TableColumnType['key']
  dataIndex?:
    | TableColumnType['dataIndex']
    | ((editable: boolean) => TableColumnType['dataIndex'])
  fixed?: TableColumnType['fixed']
  width?: string | number | undefined
  minWidth?: TableColumnType['minWidth']
  maxWidth?: TableColumnType['maxWidth']
  resizable?: TableColumnType['resizable']
  customRender?: (
    props: Parameters<NonNullable<CustomRender>>[0] & { parentRecord?: any }
  ) => any
  sorter?: TableColumnType['sorter']
  ellipsis?: TableColumnType['ellipsis']
  align?: TableColumnType['align']
  required?: boolean
  item?: NewFormItem | ((prop: BodyCellParams) => NewFormItem)
  /** 解密接口服务前缀 */
  decryptApiPrefix?: string
  emptyCell?: VNode | VNode[] | string
  customHeaderCell?: (column: TableColumn) => Record<string, any>
  rowSpan?: number | boolean
  style?: CSSProperties
  headerStyle?: CSSProperties
  class?: string
  headerClass?: string
  [key: string]: any
}

// 补充 a-table 的 slots 类型
export type ATableSlots = Readonly<
  DefaultSlots & {
    emptyText?(): VNode[]
    expandIcon?(props: any): VNode[]
    title?(currentPageData: any[]): VNode[]
    footer?(currentPageData: any[]): VNode[]
    summary?(): VNode[]
    expandedRowRender?(props: BodyCellParams): VNode[]
    bodyCell?(props: BodyCellParams): VNode[]
    headerCell?(props: HeaderCellParams): VNode[]
    customFilterIcon?(props: { filtered: any; column: TableColumn }): VNode[]
    customFilterDropdown?(props: FilterDropdownProps<any>): VNode[]
  }
>

// 补充 a-table 的 expose 类型
export type ATableExpose = {
  selectedKeySet: any[]
}

export type ATableProps = Omit<AATableProps, 'columns' | 'rowSelection'> & {
  columns?: TableColumn[]
  rowSelection?: AATableProps['rowSelection'] & { selectAllPage?: boolean }
}

// 补充 a-table-summary 的 props 类型
export type ATableSummaryProps = PropsType<typeof ATableSummary>

// 补充 a-table-summary 的 slots 类型
export type ATableSummarySlots = Readonly<DefaultSlots>

// 补充 a-table-summary-row 的 props 类型
export type ATableSummaryRowProps = PropsType<typeof ATableSummaryRow>

// 补充 a-table-summary-row 的 slots 类型
export type ATableSummaryRowSlots = Readonly<DefaultSlots>

// 补充 a-table-summary-cell 的 props 类型
export type ATableSummaryCellProps = PropsType<typeof ATableSummaryCell>

// 补充 a-table-summary-cell 的 slots 类型
export type ATableSummaryCellSlots = Readonly<DefaultSlots>
