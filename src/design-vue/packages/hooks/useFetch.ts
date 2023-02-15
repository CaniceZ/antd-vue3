import { Ref, ref } from 'vue'
import { FunctionArgs } from './types'

type Option = {
  immediate?: boolean
  initParams?: any
  defaultValue?: any
}

export type ResolveType<T extends FunctionArgs> = Awaited<
  PromiseLike<ReturnType<T>>
>

export default function useFetch<T extends FunctionArgs>(
  fn: T,
  opt?: Option
): [Ref<ResolveType<T>>, Ref<boolean>, T]
export default function useFetch(fn, opt?) {
  const option: Option = {
    immediate: true,
    defaultValue: [],
    ...(opt || {})
  }
  const data = ref(option.defaultValue)
  const loading = ref<boolean>(false)
  const handle = async (...args: any[]) => {
    if (fn && typeof fn === 'function') {
      loading.value = true
      try {
        const res = await fn(...args)
        if (res === void 0 || res === null) {
          data.value = option.defaultValue
        }
        data.value = res
        return data.value
      } finally {
        loading.value = false
      }
    }
  }
  if (option.immediate) {
    handle(option.initParams)
  }
  return [data, loading, handle]
}
