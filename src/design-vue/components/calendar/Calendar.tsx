import {
  Calendar as ACalendar,
  CalendarProps as ACalendarProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ACalendarSlots } from './type'

const [prefixName, prefixCls] = getPrefix('calendar')

const Calendar = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ACalendarProps<any>>())
    const slots = useSlots() as ACalendarSlots
    return () => <ACalendar class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type CalendarProps = PropsType<typeof Calendar> &
  PropsType<ACalendarProps<any>>
export type CalendarExpose = {}
export type CalendarSlots = ACalendarSlots

export default Calendar as GlobalComponentConstructor<
  CalendarProps,
  CalendarSlots
>
