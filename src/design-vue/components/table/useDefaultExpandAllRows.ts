import { nextTick, Ref, watch } from 'vue'
import { TableProps } from './Table'

export default function useDefaultExpandAllRows(
  props: TableProps,
  tableRef: Ref<any>
) {
  if (props.defaultExpandAllRows2) {
    watch(
      [() => props.data, () => props.defaultExpandAllRows2],
      () => {
        if (props.data?.length && props.defaultExpandAllRows2) {
          nextTick(() => {
            const tableDom = tableRef.value?.$el
            const collapsed_list = tableDom?.querySelectorAll(
              '.ant-table-cell-with-append button.ant-table-row-expand-icon-collapsed'
            )
            collapsed_list?.forEach(btn => {
              btn.click()
            })
          })
        }
      },
      {
        immediate: true
      }
    )
  }
}
