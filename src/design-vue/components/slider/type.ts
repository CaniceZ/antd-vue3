import { VNode } from 'vue'
import { DefaultInputExpose } from '../../types/antdv'

// 补充 a-slider 的 slots 类型
export type ASliderSlots = Readonly<{
  /* 自定义刻度标记 */
  mark?(): VNode[]
}>

// 补充 a-slider 的 expose 类型
export type ASliderExpose = DefaultInputExpose
