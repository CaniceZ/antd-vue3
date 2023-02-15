import { DeepReadonly, readonly, ShallowRef, shallowRef } from 'vue'

export function useState<T>(
  initialState: T
): [Readonly<ShallowRef<DeepReadonly<T>>>, (state: T) => void] {
  const state = shallowRef(initialState)
  const setState = (newState: T) => {
    state.value = newState
  }

  return [readonly(state), setState]
}
