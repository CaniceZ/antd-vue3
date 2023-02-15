import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-steps 的 slots 类型
export type AStepsSlots = Readonly<
  DefaultSlots & {
    /* 点状步骤条，可以设置为一个 作用域插槽，labelPlacement 将强制为 `vertical` */
    progressDot?(): VNode[]
    stepIcon?(): VNode[]
  }
>

// 补充 a-step 的 slots 类型
export type AStepSlots = Readonly<
  DefaultSlots & {
    /* 步骤的详情描述，可选 */
    description?(): VNode[]
    /* 步骤图标的类型，可选 */
    icon?(): VNode[]
    /* 子标题 */
    subTitle?(): VNode[]
    /* 标题 */
    title?(): VNode[]
    tailContent?(): VNode[]
    stepIcon?(): VNode[]
    /* 点状步骤条，可以设置为一个 作用域插槽，labelPlacement 将强制为 `vertical` */
    progressDot?(): VNode[]
  }
>
