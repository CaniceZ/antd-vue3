import {
  Timeline as ATimeline,
  TimelineProps as ATimelineProps
} from 'ant-design-vue'
import { defineComponent, PropType, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ATimelineSlots } from './type'

const [prefixName, prefixCls] = getPrefix('timeline')

const timelineProps = () => ({
  couple: Boolean,
  mode: String as PropType<ATimelineProps['mode'] | 'couple'>,
  leftWidth: {
    type: String,
    default: '50%'
  }
})

const Timeline = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...timelineProps()
  },
  setup(props) {
    const attrs = $(useAttrs<ATimelineProps>())
    const slots = useSlots() as ATimelineSlots

    const isCouple = $computed(() => props.couple || props.mode === 'couple')
    const mode = $computed(() => {
      if (props.couple || props.mode === 'couple') {
        return 'alternate'
      } else {
        return props.mode
      }
    })

    const leftFlex = $computed(() => (props.leftWidth ? 'unset' : 1))

    return () => (
      <ATimeline
        mode={mode}
        class={[prefixCls, { [`${prefixCls}-couple`]: isCouple }, attrs.class]}
        {...attrs}
        style={`--timeline-leftWidth:${props.leftWidth}; --timeline-leftFlex: ${leftFlex};`}
        v-slots={slots}
      />
    )
  }
})

export type TimelineProps = PropsType<typeof Timeline> &
  PropsType<ATimelineProps> &
  PropsType<typeof timelineProps>
export type TimelineExpose = {}
export type TimelineSlots = ATimelineSlots

export default Timeline as GlobalComponentConstructor<
  TimelineProps,
  TimelineSlots
>
