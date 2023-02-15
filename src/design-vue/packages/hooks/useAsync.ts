import { Ref, ref } from 'vue'
import { FunctionArgs } from './types'

export default function useAsync<T extends FunctionArgs = FunctionArgs>(
  fn: T
): [T, Ref<boolean>]
export default function useAsync(fn) {
  const loading = ref<boolean>(false)
  const handle = async (...args: any[]) => {
    if (fn && typeof fn === 'function') {
      loading.value = true
      try {
        return await fn(...args)
      } finally {
        loading.value = false
      }
    }
  }
  return [handle, loading]
}
