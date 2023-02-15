import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-config-provider 的 slots 类型
export type AConfigProviderSlots = Readonly<
  DefaultSlots & {
    renderEmpty?(name: string): VNode[]
  }
>
