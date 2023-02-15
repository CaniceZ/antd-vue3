import { ATableProps } from './types'
import { TableProps, TableSlots } from './Table'
import { ComputedRef, h } from 'vue'
import Checkbox from '../checkbox/Checkbox'

export default function useRowSelection(
  props: TableProps,
  attrs: ATableProps,
  slots: TableSlots
): ComputedRef<ATableProps['rowSelection']> {
  const rowKey = (attrs.rowKey || attrs['row-key'] || 'id') as string
  const childrenKey = (attrs.childrenColumnName ||
    attrs['children-column-name'] ||
    'children') as string

  const rowSelection = $computed(() => {
    const selection = (attrs.rowSelection ||
      attrs['row-selection']) as ATableProps['rowSelection']
    const SelectionColumnTitleSlot = slots['header-cell-selection-title']

    if (selection && (SelectionColumnTitleSlot || selection.selectAllPage)) {
      const allData: any[] = []
      const selectedKeys = selection.selectedRowKeys || []
      const defaultSelectAll =
        selection.selectAllPage && !SelectionColumnTitleSlot
      if (defaultSelectAll) {
        const run = (list: any[] = []) => {
          if (!list || list.length === 0) return
          list.forEach((record: any) => {
            const disabled = Boolean(
              selection.getCheckboxProps?.(record)?.disabled
            )
            if (!disabled) {
              allData.push(record)
            }
            if (record[childrenKey]) {
              run(record[childrenKey])
            }
          })
        }
        run(props.data as any[])
      }
      return {
        ...selection,
        columnTitle: defaultSelectAll
          ? h(Checkbox, {
              modelValue:
                selectedKeys.length > 0 &&
                allData.length === selectedKeys.length,
              indeterminate:
                selectedKeys.length > 0 && selectedKeys.length < allData.length,
              disabled: allData.length === 0,
              onChange() {
                if (
                  selectedKeys.length > 0 &&
                  allData.length === selectedKeys.length
                ) {
                  selection.onChange?.([], [])
                } else {
                  selection.onChange?.(
                    allData.map(row => row[rowKey]),
                    allData
                  )
                }
              }
            })
          : h(SelectionColumnTitleSlot!)
      }
    }
    return selection
  })

  return $$(rowSelection)
}
