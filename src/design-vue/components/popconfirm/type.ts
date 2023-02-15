import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-popconfirm 的 slots 类型
export type APopconfirmSlots = Readonly<
  DefaultSlots & {
    title?(): VNode[]
    content?(): VNode[]
    okText?(): VNode[]
    icon?(): VNode[]
    cancelText?(): VNode[]
    cancelButton?(): VNode[]
    okButton?(): VNode[]
  }
>

// 补充 a-popconfirm 的 expose 类型
export type APopconfirmExpose = {
  getPopupDomNode(): any
}
