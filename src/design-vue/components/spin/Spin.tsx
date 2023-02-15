import { Spin as ASpin, SpinProps as ASpinProps } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ASpinSlots } from './type'
import { LoadingOutlined } from '@ant-design/icons-vue'

const [prefixName, prefixCls] = getPrefix('spin')

const Spin = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    fontSize: {
      type: String,
      default: '20px'
    }
  },
  setup(props) {
    const attrs = $(useAttrs<ASpinProps>())
    const slots = useSlots() as ASpinSlots
    return () => (
      <ASpin
        class={prefixCls}
        indicator={
          <LoadingOutlined style={{ fontSize: props.fontSize }} spin />
        }
        {...attrs}
        v-slots={slots}
      />
    )
  }
})

export type SpinProps = PropsType<typeof Spin> & PropsType<ASpinProps>
export type SpinExpose = {}
export type SpinSlots = ASpinSlots

export default Spin as GlobalComponentConstructor<SpinProps, SpinSlots>
