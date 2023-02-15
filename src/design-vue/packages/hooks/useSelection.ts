import { TableRowSelection } from 'ant-design-vue/lib/table/interface'
import { reactive, Ref, watch } from 'vue'

type Key = string | number

export default function useSelections<T = any>(
  opts: TableRowSelection = {}
): {
  selectedKeys: Ref<Key[]>
  selectedRows: Ref<T[]>
  rowSelection: TableRowSelection<T>
  cleanSelection: () => void
} {
  let selectedKeys = $ref<Key[]>([])
  let selectedRows = $ref<any[]>([])
  const rowSelection = reactive<TableRowSelection>({
    selectedRowKeys: selectedKeys,
    ...opts,
    onChange
  })

  watch($$(selectedKeys), newVal => {
    if (newVal !== rowSelection.selectedRowKeys) {
      rowSelection.selectedRowKeys = newVal
    }
  })

  function onChange(keys: Key[], rows: any[]) {
    rowSelection.selectedRowKeys = keys
    selectedKeys = keys
    selectedRows = rows
    opts.onChange?.(keys, rows)
  }

  function cleanSelection() {
    selectedKeys = []
    selectedRows = []
  }

  return {
    selectedKeys: $$(selectedKeys),
    selectedRows: $$(selectedRows),
    rowSelection,
    cleanSelection
  }
}
