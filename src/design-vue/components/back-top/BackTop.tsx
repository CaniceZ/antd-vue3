import {
  BackTop as ABackTop,
  BackTopProps as ABackTopProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ABackTopSlots } from './type'

const [prefixName, prefixCls] = getPrefix('back-top')

const BackTop = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ABackTopProps>())
    const slots = useSlots() as ABackTopSlots
    return () => <ABackTop class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type BackTopProps = PropsType<typeof BackTop> & PropsType<ABackTopProps>
export type BackTopExpose = {}
export type BackTopSlots = ABackTopSlots

export default BackTop as GlobalComponentConstructor<BackTopProps, BackTopSlots>
