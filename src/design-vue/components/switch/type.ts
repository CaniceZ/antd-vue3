import { VNode } from 'vue'
import { DefaultInputExpose } from '../../types/antdv'

// 补充 a-switch 的 slots 类型
export type ASwitchSlots = Readonly<{
  /* 选中时的内容 */
  checkedChildren?(): VNode[]
  /* 非选中时的内容 */
  unCheckedChildren?(): VNode[]
}>

// 补充 a-switch 的 expose 类型
export type ASwitchExpose = DefaultInputExpose
