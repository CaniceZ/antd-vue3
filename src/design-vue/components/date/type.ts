import { VNode } from 'vue'
import { DefaultInputExpose } from '../../types/antdv'

// 补充 a-date 的 slots 类型
export type ADateSlots = Readonly<{
  suffixIcon?(): VNode[]
  prevIcon?(): VNode[]
  nextIcon?(): VNode[]
  superPrevIcon?(): VNode[]
  superNextIcon?(): VNode[]
  dateRender?(): VNode[]
  renderExtraFooter?(): VNode[]
  monthCellRender?(): VNode[]
}>

// 补充 a-date 的 expose 类型
export type ADateExpose = DefaultInputExpose
