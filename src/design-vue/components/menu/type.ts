import { MenuItemGroup as AMenuItemGroup } from 'ant-design-vue'
import { VNode } from 'vue'
import { PropsType } from '../../types/ts-helpers'
import { DefaultSlots } from '../../types/vue'

// 补充 a-menu 的 slots 类型
export type AMenuSlots = Readonly<
  DefaultSlots & {
    /* 自定义 Menu 展开收起图标 */
    expandIcon?(): VNode[]
    /* 用于自定义 Menu 水平空间不足时的省略收缩的图标 */
    overflowedIndicator?(): VNode[]
  }
>

// 补充 a-menu-divider 的 slots 类型
export type AMenuDividerSlots = Readonly<{}>

// 补充 a-menu-item 的 slots 类型
export type AMenuItemSlots = Readonly<
  DefaultSlots & {
    /* 菜单图标 */
    icon?(): VNode[]
    /* 设置收缩时展示的悬浮标题 */
    title?(): VNode[]
  }
>

// 补充 a-menu-item-group 的 slots 类型
export type AMenuItemGroupSlots = Readonly<
  DefaultSlots & {
    title?(): VNode[]
  }
>

// 补充 a-menu-item-group 的 props 类型
export type AMenuItemGroupProps = PropsType<typeof AMenuItemGroup>

// 补充 a-sub-menu 的 slots 类型
export type ASubMenuSlots = Readonly<
  DefaultSlots & {
    /* 菜单图标 */
    icon?(): VNode[]
    /* 子菜单项值 */
    title?(): VNode[]
    /* 自定义 Menu 展开收起图标 */
    expandIcon?(): VNode[]
  }
>
