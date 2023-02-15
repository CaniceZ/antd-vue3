import { Badge as ABadge, BadgeProps as ABadgeProps } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ABadgeSlots } from './type'

const [prefixName, prefixCls] = getPrefix('badge')

const Badge = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ABadgeProps>())
    const slots = useSlots() as ABadgeSlots
    return () => <ABadge class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type BadgeProps = PropsType<typeof Badge> & PropsType<ABadgeProps>
export type BadgeExpose = {}
export type BadgeSlots = ABadgeSlots

export default Badge as GlobalComponentConstructor<BadgeProps, BadgeSlots>
