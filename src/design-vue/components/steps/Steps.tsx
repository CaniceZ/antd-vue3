import { Steps as ASteps, StepsProps as AStepsProps } from 'ant-design-vue'
import { defineComponent, onBeforeMount, PropType, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AStepsSlots } from './type'

const [prefixName, prefixCls] = getPrefix('steps')

const Steps = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<AStepsProps['type']>,
      default: 'default'
    },
    labelPlacement: {
      type: String as PropType<AStepsProps['labelPlacement']>,
      default: 'vertical'
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const attrs = $(useAttrs<AStepsProps>())
    const slots = useSlots() as AStepsSlots
    let stepsType = $ref<AStepsProps['type']>()
    let labelPosition = $ref<AStepsProps['labelPlacement']>()

    onBeforeMount(() => {
      stepsType = props.type
      if (props.block) {
        stepsType = 'navigation'
      }

      labelPosition = props.labelPlacement || 'vertical'
      if (stepsType === 'navigation') {
        labelPosition = 'horizontal'
      }
    })

    return () => (
      <ASteps
        class={[prefixCls, { steps_block: props.block }]}
        {...attrs}
        labelPlacement={labelPosition}
        type={stepsType}
        v-slots={slots}
      />
    )
  }
})

export type StepsProps = PropsType<typeof Steps> & PropsType<AStepsProps>
export type StepsExpose = {}
export type StepsSlots = AStepsSlots

export default Steps as GlobalComponentConstructor<StepsProps, StepsSlots>
