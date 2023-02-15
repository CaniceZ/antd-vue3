import { BadgeRibbon as ABadgeRibbon } from 'ant-design-vue'
import { RibbonProps as ABadgeRibbonProps } from 'ant-design-vue/lib/badge/Ribbon'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ABadgeRibbonSlots } from './type'

const [prefixName, prefixCls] = getPrefix('badge-ribbon')

const BadgeRibbon = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ABadgeRibbonProps>())
    const slots = useSlots() as ABadgeRibbonSlots
    return () => <ABadgeRibbon class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type BadgeRibbonProps = PropsType<typeof BadgeRibbon> &
  PropsType<ABadgeRibbonProps>
export type BadgeRibbonExpose = {}
export type BadgeRibbonSlots = ABadgeRibbonSlots

export default BadgeRibbon as GlobalComponentConstructor<
  BadgeRibbonProps,
  BadgeRibbonSlots
>
