import { computed, defineComponent, PropType } from 'vue'
import {
  TimeRangePicker as ATimeRangePicker,
  TimePicker as ATimePicker,
  TimePickerProps as ATimePickerProps,
  TimeRangePickerProps as ATimeRangePickerProps
} from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import { ATimeExpose, ATimeSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useRefExpose from '../../_hooks/useRefExpose'
import { DefaultInputExpose } from '../../types/antdv'

const [prefixName, prefixCls] = getPrefix('time')

const Time = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    modelValue: {
      // type: [String, Object, Array] as PropType<string | Dayjs | string[] | Dayjs[]>,
      type: [String, Object, Array] as any
    },
    range: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<'time' | 'timerange'>,
      default: 'time'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit, expose }) {
    const [timeRef, timeExpose] = useRefExpose<DefaultInputExpose>([
      'focus',
      'blur'
    ])
    expose(timeExpose)

    const isRange = computed(() => {
      return props.range || props.type === 'timerange'
    })
    return () => {
      const [Comp, cls] = isRange.value
        ? [ATimeRangePicker, `${prefixCls}-range`]
        : [ATimePicker, prefixCls]

      return (
        <Comp
          ref={timeRef}
          valueFormat={(attrs['format'] as string) || 'HH:mm:ss'}
          {...attrs}
          value={props.modelValue}
          {...{
            'onUpdate:value': val => emit('update:modelValue', val)
          }}
          class={[cls, attrs.class]}
          v-slots={slots}
        />
      )
    }
  }
})

export type TimeProps = PropsType<typeof Time> &
  (PropsType<ATimePickerProps> | PropsType<ATimeRangePickerProps>)
export type TimeExpose = ATimeExpose
export type TimeSlots = ATimeSlots

export default Time as GlobalComponentConstructor<TimeProps, TimeSlots>
