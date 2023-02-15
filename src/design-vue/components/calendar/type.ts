import { Dayjs } from 'dayjs'
import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-calendar 的 slots 类型
export type ACalendarSlots = Readonly<
  DefaultSlots & {
    /* 作用域插槽，用来自定义渲染日期单元格，返回内容会被追加到单元格 */
    dateCellRender?(props: { current: Dayjs }): VNode[]
    /* 作用域插槽，自定义渲染日期单元格，返回内容覆盖单元格 */
    dateFullCellRender?(props: { current: Dayjs }): VNode[]
    /* 自定义头部内容 */
    headerRender?(props: {
      value: Dayjs
      type: string
      onChange: () => void
      onTypeChange: () => void
    }): VNode[]
    /* 作用域插槽，自定义渲染月单元格，返回内容会被追加到单元格 */
    monthCellRender?(props: { current: Dayjs }): VNode[]
    /* 作用域插槽，自定义渲染月单元格，返回内容覆盖单元格 */
    monthFullCellRender?(props: { current: Dayjs }): VNode[]
  }
>
