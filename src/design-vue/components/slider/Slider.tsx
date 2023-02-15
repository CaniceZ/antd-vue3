import { Slider as ASlider, SliderProps as ASliderProps } from 'ant-design-vue'
import { defineComponent, PropType, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ASliderExpose, ASliderSlots } from './type'

const [prefixName, prefixCls] = getPrefix('slider')

const Slider = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Number, Array] as PropType<ASliderProps['value']>
    }
  },
  emits: {
    'update:modelValue': (_val: ASliderProps['value']) => true
  },
  setup(props, { emit }) {
    const attrs = $(useAttrs<ASliderProps>())
    const slots = useSlots() as ASliderSlots
    return () => (
      <ASlider
        class={prefixCls}
        {...attrs}
        value={props.modelValue}
        onUpdate:value={val => emit('update:modelValue', val)}
        v-slots={slots}
      />
    )
  }
})

export type SliderProps = PropsType<typeof Slider> & PropsType<ASliderProps>
export type SliderExpose = ASliderExpose
export type SliderSlots = ASliderSlots

export default Slider as GlobalComponentConstructor<SliderProps, SliderSlots>
