import { omit } from '../../packages//utils'
import {
  TimelineItem as ATimelineItem,
  TimelineItemProps as ATimelineItemProps
} from 'ant-design-vue'
import { defineComponent, useSlots, VNode } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import Col from '../col'
import Row from '../row'
import { ATimelineItemSlots } from './type'

const [prefixName, prefixCls] = getPrefix('timeline-item')

const TimelineItem = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ATimelineItemProps>())
    const slots = useSlots() as TimelineItemSlots
    const isCouple = $computed(() => slots.left || slots.right)

    return () => (
      <ATimelineItem
        class={prefixCls}
        {...attrs}
        v-slots={{
          default: isCouple
            ? () => {
                return (
                  <Row>
                    <Col class={`${prefixCls}-left`}>{slots.left?.()}</Col>
                    <Col class={`${prefixCls}-right`}>{slots.right?.()}</Col>
                  </Row>
                )
              }
            : slots.default?.(),
          ...omit(slots, ['default', 'left', 'right'])
        }}
      />
    )
  }
})

export type TimelineItemProps = PropsType<typeof TimelineItem> &
  PropsType<ATimelineItemProps>
export type TimelineItemExpose = {}
export type TimelineItemSlots = ATimelineItemSlots &
  Readonly<{
    left?(): VNode[]
    right?(): VNode[]
  }>

export default TimelineItem as GlobalComponentConstructor<
  TimelineItemProps,
  TimelineItemSlots
>
