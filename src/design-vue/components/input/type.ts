import { DefaultSlots } from '../../types/vue'
import {
  InputGroup as AInputGroup,
  InputSearch as AInputSearch,
  InputPassword as AInputPassword
} from 'ant-design-vue'
import { PropsType } from '../../types/ts-helpers'
import { VNode } from 'vue'
import { DefaultInputExpose } from '../../types/antdv'

// 补充 a-input 的 slots 类型
export type AInputSlots = Readonly<
  DefaultSlots & {
    /* 带标签的 input，设置前置标签 */
    addonBefore?(): VNode[]
    /* 带标签的 input，设置后置标签 */
    addonAfter?(): VNode[]
    /* 带有后缀图标的 input */
    suffix?(): VNode[]
    /* 带有前缀图标的 input */
    prefix?(): VNode[]
    element?(): VNode[]
    iconRender?(): VNode[]
    /* input-search 确认按钮 */
    enterButton?(): VNode[]
  }
>

// 补充 a-input 的 expose 类型
export type AInputExpose = DefaultInputExpose & {
  setValue(): void
  /* textarea 专属方法 */
  resizableTextArea(): void
}

// 补充 a-input-password 的 props 类型
export type AInputPasswordProps = PropsType<typeof AInputPassword>

// 补充 a-input-search 的 props 类型
export type AInputSearchProps = PropsType<typeof AInputSearch>

// 补充 a-input-group 的 slots 类型
export type AInputGroupSlots = Readonly<DefaultSlots>

// 补充 a-input-group 的 props 类型
export type AInputGroupProps = PropsType<typeof AInputGroup>
