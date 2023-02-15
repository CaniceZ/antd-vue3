import { TablePaginationConfig, TableProps } from 'ant-design-vue'
import { onMounted, reactive, ref, unref } from 'vue'

type FormPageOption = {
  immediate?: boolean
  pageSize?: number
  onChange?: TableProps['onChange']
  useParam?: boolean
}

export default function useFormPage(fetchData, options?: FormPageOption) {
  const defaultOptions = {
    immediate: true,
    pageSize: 20,
    useParam: false
  }
  if (options) {
    Object.assign(defaultOptions, options || {})
  }
  const { pageSize, immediate, useParam } = defaultOptions
  const pagination = reactive<TablePaginationConfig>({
    current: 1,
    pageSize,
    total: 0
  })
  const data = ref([])
  const formData = reactive<{ [key: string]: any }>({})
  const loading = ref(false)

  const loadData = async () => {
    const params = {
      page: pagination.current,
      limit: pagination.pageSize
    }
    if (useParam) {
      Object.assign(params, {
        param: { ...unref(formData) }
      })
    } else {
      Object.assign(params, { ...unref(formData) })
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

  const onSearch = () => {
    pagination.current = 1
    loadData()
  }

  const onChange: TableProps['onChange'] = (page, filters, sorter, extra) => {
    options?.onChange?.(page, filters, sorter, extra)
    Object.assign(pagination, page)
    loadData()
  }

  if (immediate) {
    onMounted(() => {
      onSearch()
    })
  }

  const formTableProps = reactive({
    loading,
    pagination,
    data,
    onSearch,
    onChange
  })

  return { formData, fetchData: loadData, formTableProps, pagination }
}
