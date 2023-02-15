import { computed, defineComponent, PropType } from 'vue'
import {
  DatePicker as ADatePicker,
  RangePicker as ARangePicker,
  DatePickerProps as ADatePickerProps
} from 'ant-design-vue'
import dayjs from 'dayjs'
import { getPrefix } from '../../_utils/common'
import { rangePickerProps } from 'ant-design-vue/lib/date-picker/generatePicker/props'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { ADateExpose, ADateSlots } from './type'
import useRefExpose from '../../_hooks/useRefExpose'
import { DefaultInputExpose } from '../../types/antdv'

const [prefixName, prefixCls] = getPrefix('date')

const Date = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    modelValue: {
      // type: [String, Object, Array] as PropType<string | Dayjs | string[] | Dayjs[]>,
      type: [String, Object, Array] as any
    },
    type: {
      type: String as PropType<
        | 'date'
        | 'datetime'
        | 'week'
        | 'month'
        | 'year'
        | 'quarter'
        | 'daterange'
        | 'datetimerange'
        | 'weekrange'
        | 'monthrange'
        | 'yearrange'
        | 'quarterrange'
        | 'datetimerange2'
      >,
      default: 'date'
    },
    daterange: {
      type: Boolean,
      default: false
    },
    datetime: {
      type: Boolean,
      default: false
    },
    datetimerange: {
      type: Boolean,
      default: false
    },
    datetimerange2: {
      type: Boolean,
      default: false
    },
    month: {
      type: Boolean,
      default: false
    },
    monthrange: {
      type: Boolean,
      default: false
    },
    week: {
      type: Boolean,
      default: false
    },
    weekrange: {
      type: Boolean,
      default: false
    },
    year: {
      type: Boolean,
      default: false
    },
    yearrange: {
      type: Boolean,
      default: false
    },
    quarter: {
      type: Boolean,
      default: false
    },
    quarterrange: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit, expose }) {
    const [dateRef, dateExpose] = useRefExpose<DefaultInputExpose>([
      'focus',
      'blur'
    ])
    expose(dateExpose)

    const isRange = computed(() => {
      return (
        props.daterange ||
        props.datetimerange ||
        props.datetimerange2 ||
        props.weekrange ||
        props.monthrange ||
        props.yearrange ||
        props.quarterrange ||
        /^(.*?)range(.*?)$/.test(props.type)
      )
    })
    const showTime = computed(() => {
      if (props.datetimerange || props.type === 'datetimerange') {
        return {
          defaultValue: [
            dayjs('00:00:00', 'HH:mm:ss'),
            dayjs('23:59:59', 'HH:mm:ss')
          ]
        }
      }
      return props.datetime || props.type === 'datetime'
    })

    return () => {
      const [Comp, cls] = isRange.value
        ? [ARangePicker, `${prefixCls}-range`]
        : [ADatePicker, prefixCls]
      return (
        <Comp
          ref={dateRef}
          picker={
            props.week || props.weekrange || props.type.startsWith('week')
              ? 'week'
              : props.month ||
                props.monthrange ||
                props.type.startsWith('month')
              ? 'month'
              : props.year || props.yearrange || props.type.startsWith('year')
              ? 'year'
              : props.quarter ||
                props.quarterrange ||
                props.type.startsWith('quarter')
              ? 'quarter'
              : 'date'
          }
          showTime={showTime.value}
          format={
            props.type === 'datetimerange2' && props.modelValue
              ? 'YYYY-MM-DD HH:mm:ss'
              : void 0
          }
          {...attrs}
          valueFormat={
            (attrs['format'] as string) ||
            (props.week || props.weekrange || props.type.startsWith('week')
              ? 'YYYY-wo'
              : props.month ||
                props.monthrange ||
                props.type.startsWith('month')
              ? 'YYYY-MM'
              : props.year || props.yearrange || props.type.startsWith('year')
              ? 'YYYY'
              : props.quarter ||
                props.quarterrange ||
                props.type.startsWith('quarter')
              ? 'YYYY-Q'
              : props.datetime ||
                props.datetimerange ||
                props.datetimerange2 ||
                props.type.startsWith('datetime')
              ? 'YYYY-MM-DD HH:mm:ss'
              : 'YYYY-MM-DD')
          }
          value={props.modelValue}
          onUpdate:value={val => {
            if (val) {
              if (props.type === 'datetimerange2') {
                const [val1, val2] = val
                emit('update:modelValue', [
                  `${val1.split(' ')[0]} 00:00:00`,
                  `${val2.split(' ')[0]} 23:59:59`
                ])
                return
              }
            }
            emit('update:modelValue', val)
          }}
          class={[cls, attrs.class]}
          v-slots={slots}
        />
      )
    }
  }
})

export type DateProps = PropsType<typeof Date> &
  (PropsType<ADatePickerProps> | PropsType<typeof rangePickerProps>)
export type DateExpose = ADateExpose
export type DateSlots = ADateSlots

export default Date as GlobalComponentConstructor<DateProps, DateSlots>
