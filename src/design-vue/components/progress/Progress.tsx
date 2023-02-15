import {
  Progress as AProgress,
  ProgressProps as AProgressProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AProgressSlots } from './type'

const [prefixName, prefixCls] = getPrefix('progress')

const Progress = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AProgressProps>())
    const slots = useSlots() as AProgressSlots
    return () => <AProgress class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type ProgressProps = PropsType<typeof Progress> &
  PropsType<AProgressProps>
export type ProgressExpose = {}
export type ProgressSlots = AProgressSlots

export default Progress as GlobalComponentConstructor<
  ProgressProps,
  ProgressSlots
>
