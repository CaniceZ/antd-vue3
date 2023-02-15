import { VNode } from 'vue'
import { DefaultInputExpose } from '../../types/antdv'

// 补充 a-rate 的 slots 类型
export type ARateSlots = Readonly<{
  /* 自定义字符 */
  character?(): VNode[]
}>

// 补充 a-rate 的 expose 类型
export type ARateExpose = DefaultInputExpose
