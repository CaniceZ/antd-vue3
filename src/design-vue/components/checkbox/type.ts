import { CheckboxGroupProps, CheckboxOptionType } from 'ant-design-vue'
import { VNode } from 'vue'
import { DefaultInputExpose } from '../../types/antdv'
import { DefaultSlots } from '../../types/vue'

// 补充 a-checkbox 的 expose 类型
export type ACheckboxExpose = DefaultInputExpose

// 补充 a-checkbox 的 slots 类型
export type ACheckboxSlots = Readonly<DefaultSlots>

// 补充 a-checkbox-group 的 expose 类型
export type ACheckboxGroupExpose = {
  mergedValue: CheckboxGroupProps['value']
}

// 补充 a-checkbox-group 的 slots 类型
export type ACheckboxGroupSlots = Readonly<
  DefaultSlots & {
    /** 每个 checkbox 的标签内容 */
    label?(option: CheckboxOptionType): VNode[]
  }
>
