import produce from 'immer'
import { shallowRef, ShallowRef } from 'vue'

/**
 * immutable 不可变状态，类似 React.useState 的使用方式
 * 当前钩子函数的使用场景是：记录状态快照、实现 undo / redo 操作的时候
 * @param initialState 初始化状态
 */
export default function useImmer<T extends object>(
  initialState: T
): [ShallowRef<T>, (fn: (s: T) => void) => void]
export default function useImmer(initialState) {
  const state = shallowRef(initialState)
  const update = updater => {
    state.value = produce(state, updater)
  }
  return [state, update]
}
