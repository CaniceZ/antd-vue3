import { VNode } from 'vue'
import { DefaultInputExpose } from '../../types/antdv'

// 补充 a-time 的 slots 类型
export type ATimeSlots = Readonly<{
  addon?(): VNode[]
  renderExtraFooter?(): VNode[]
  suffixIcon?(): VNode[]
  clearIcon?(): VNode[]
}>

// 补充 a-time 的 expose 类型
export type ATimeExpose = DefaultInputExpose
