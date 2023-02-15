import { Ref, watch } from 'vue'

export default function useAttrsComputed<T>(watcher, handler: () => T): Ref<T>
export default function useAttrsComputed(watcher, handler) {
  let res = $ref()
  watch(
    watcher,
    () => {
      res = handler()
    },
    {
      immediate: true
    }
  )
  return $$(res)
}
