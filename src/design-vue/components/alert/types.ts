import { VNode } from 'vue'

// 补充 a-alert 的 expose 类型定义
export type AAlertExpose = {
  /** 结束动画，并关闭隐藏当前组件 */
  animationEnd(): void
}

// 补充 a-alert 的 slots 类型定义
export type AAlertSlots = Readonly<{
  /** 关闭图标 */
  closeIcon?(): VNode[]
  /** 关闭按钮 */
  closeText?(): VNode[]
  /** 附加信息 */
  description?(): VNode[]
  /** 图标 */
  icon?(): VNode[]
  /** 主文本内容 */
  message?(): VNode[]
}>
