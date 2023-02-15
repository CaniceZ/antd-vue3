import { Step as AStep, StepProps as AStepProps } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AStepSlots } from './type'

const [prefixName, prefixCls] = getPrefix('step')

const Step = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AStepProps>())
    const slots = useSlots() as AStepSlots

    return () => <AStep class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type StepProps = PropsType<typeof Step> & PropsType<AStepProps>
export type StepExpose = {}
export type StepSlots = AStepSlots

export default Step as GlobalComponentConstructor<StepProps, StepSlots>
