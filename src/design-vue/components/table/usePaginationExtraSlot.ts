import { nextTick, Ref } from 'vue'
import { TableSlots } from './Table'

export default function usePaginationExtraSlot(
  slots: TableSlots,
  tableRef: Ref<any>
): HTMLLIElement {
  const clsName = 'ygp-table-pagination-extra'
  const li = document.createElement('li')
  li.className = clsName
  if (slots['pagination-extra']) {
    nextTick(() => {
      const tableDom = tableRef.value?.$el
      const pagination = tableDom?.querySelector(
        ':scope > .ant-spin-nested-loading > .ant-spin-container > .ant-pagination'
      )
      if (pagination && pagination.firstChild) {
        if (!pagination.firstChild.className.includes(clsName)) {
          pagination.insertBefore(li, pagination.firstChild)
        }
      }
    })
  }
  return li
}
