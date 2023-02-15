import { getCurrentInstance } from 'vue'

export default function useActualProps<T>(): T {
  const instance = getCurrentInstance()
  return instance?.vnode?.props as T
}
