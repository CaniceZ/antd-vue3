import { reactive } from 'vue'

type Option = {
  pageSize?: number
  immediate?: boolean
  useScrollSearch?: boolean
}

const defaultOption: Option = {
  pageSize: 20,
  immediate: true,
  useScrollSearch: true
}

export default function useSelectSearch(
  fn: (val: any, pagination: any) => Promise<any>,
  option?: Option
): any {
  const {
    pageSize: limit,
    immediate,
    useScrollSearch
  } = Object.assign({}, defaultOption, option || {})
  const pagination = reactive({
    page: 1,
    limit
  })
  let total = $ref(0)
  let keyword = $ref()
  let loading = $ref(false)
  let options = $ref([])

  const loadData = async () => {
    try {
      const data = await fn(keyword, pagination)
      if (Array.isArray(data)) {
        total = data.length
        return data
      } else {
        if (data && 'total' in data && 'list' in data) {
          total = data.total
          return data.list
        } else {
          return data
        }
      }
    } finally {
      loading = false
    }
  }

  if (immediate) {
    loadData().then(res => {
      options = res
    })
  }

  const onSearch2 = (val, update, abort) => {
    keyword = val
    pagination.page = 1
    loadData()
      .then(res => {
        update(res)
      })
      .catch(abort)
  }

  const onScrollSearch = (e: UIEvent, innerOptions, update) => {
    const opts = innerOptions || []
    const target = e.target as HTMLDivElement
    if (!loading && target && opts.length < total) {
      const { scrollHeight, scrollTop, clientHeight } = target
      if (scrollHeight - scrollTop < clientHeight + 10) {
        pagination.page++
        loading = true
        loadData()
          .then(update)
          .catch(() => {
            pagination.page--
          })
          .finally(() => {
            loading = false
          })
      }
    }
  }

  return reactive({
    loading: useScrollSearch ? $$(loading) : void 0,
    options: $$(options),
    onSearch2,
    onScrollSearch: useScrollSearch ? onScrollSearch : void 0
  })
}
