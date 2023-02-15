import { DropdownButton as ADropdownButton } from 'ant-design-vue'
import { VNode } from 'vue'
import { PropsType } from '../../types/ts-helpers'
import { DefaultSlots } from '../../types/vue'

// 补充 a-dropdown-button 的 props 类型
export type ADropdownButtonProps = PropsType<typeof ADropdownButton>

// 补充 a-dropdown-button 的 slots 类型
export type ADropdownButtonSlots = Readonly<
  DefaultSlots & {
    /* 菜单 */
    overlay?(): VNode[]
    icon?(): VNode[]
    leftButton?(): VNode[]
    rightButton?(): VNode[]
  }
>
