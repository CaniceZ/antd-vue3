import { TablePaginationConfig, TableProps } from 'ant-design-vue'
import { onMounted, reactive, ref } from 'vue'

type PageOption = {
  immediate?: boolean
  pageSize?: number
  onChange?: TableProps['onChange']
}

export default function usePage(fetchData, options?: PageOption) {
  const defaultOptions = {
    immediate: true,
    pageSize: 20
  }
  if (options) {
    Object.assign(defaultOptions, options || {})
  }
  const { pageSize, immediate } = defaultOptions
  const pagination = reactive<TablePaginationConfig>({
    current: 1,
    pageSize,
    total: 0
  })
  const data = ref([])
  const loading = ref(false)

  const loadData = async () => {
    const params = {
      page: pagination.current,
      limit: pagination.pageSize
    }
    loading.value = true
    try {
      const { list, total } = await fetchData(params)
      data.value = list
      pagination.total = total
    } finally {
      loading.value = false
    }
  }

  const onChange: TableProps['onChange'] = (page, filters, sorter, extra) => {
    options?.onChange?.(page, filters, sorter, extra)
    Object.assign(pagination, page)
    loadData()
  }

  if (immediate) {
    onMounted(() => {
      loadData()
    })
  }

  const tableProps = reactive({
    loading,
    pagination,
    data,
    onChange
  })

  return { fetchData: loadData, tableProps, pagination }
}
