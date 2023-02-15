import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-page-header 的 slots 类型
export type APageHeaderSlots = Readonly<
  DefaultSlots & {
    /* 自定义 back icon ，如果为 false 不渲染 back icon */
    backIcon?(): VNode[]
    /* 标题栏旁的头像 */
    avatar?(): VNode[]
    /* 面包屑的配置 */
    breadcrumb?(): VNode[]
    /* 自定义标题文字 */
    title?(): VNode[]
    /* 自定义的二级标题文 */
    subTitle?(): VNode[]
    /* title 旁的 tag 列表 */
    tags?(): VNode[]
    /* 操作区，位于 title 行的行尾 */
    extra?(): VNode[]
    /* PageHeader 的页脚，一般用于渲染 TabBar */
    footer?(): VNode[]
  }
>
