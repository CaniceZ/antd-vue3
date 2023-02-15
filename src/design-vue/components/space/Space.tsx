import { Space as ASpace, SpaceProps as ASpaceProps } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ASpaceSlots } from './type'

const [prefixName, prefixCls] = getPrefix('space')

const Space = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    middle: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const attrs = $(useAttrs<ASpaceProps>())
    const slots = useSlots() as ASpaceSlots
    return () => (
      <ASpace
        class={prefixCls}
        size={props.middle ? 'middle' : props.large ? 'large' : 'small'}
        direction={props.vertical ? 'vertical' : 'horizontal'}
        {...attrs}
        v-slots={slots}
      />
    )
  }
})

export type SpaceProps = PropsType<typeof Space> & PropsType<ASpaceProps>
export type SpaceExpose = {}
export type SpaceSlots = ASpaceSlots

export default Space as GlobalComponentConstructor<SpaceProps, SpaceSlots>
