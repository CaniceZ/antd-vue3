import {
  LayoutContent as ALayoutContent,
  LayoutFooter as ALayoutFooter,
  LayoutHeader as ALayoutHeader,
  LayoutSider as ALayoutSider
} from 'ant-design-vue'
import { PropsType } from '../../types/ts-helpers'
import { DefaultSlots } from '../../types/vue'

// 补充 a-layout 的 slots 类型
export type ALayoutSlots = Readonly<DefaultSlots>

// 补充 a-layout-header 的 slots 类型
export type ALayoutHeaderSlots = Readonly<DefaultSlots>

// 补充 a-layout-header 的 props 类型
export type ALayoutHeaderProps = PropsType<typeof ALayoutHeader>

// 补充 a-layout-sider 的 slots 类型
export type ALayoutSiderSlots = Readonly<DefaultSlots>

// 补充 a-layout-sider 的 props 类型
export type ALayoutSiderProps = PropsType<typeof ALayoutSider>

// 补充 a-layout-content 的 slots 类型
export type ALayoutContentSlots = Readonly<DefaultSlots>

// 补充 a-layout-content 的 props 类型
export type ALayoutContentProps = PropsType<typeof ALayoutContent>

// 补充 a-layout-footer 的 slots 类型
export type ALayoutFooterSlots = Readonly<DefaultSlots>

// 补充 a-layout-footer 的 props 类型
export type ALayoutFooterProps = PropsType<typeof ALayoutFooter>
