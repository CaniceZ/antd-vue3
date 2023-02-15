import { defineComponent, useSlots } from 'vue'
import {
  Divider as ADivider,
  DividerProps as ADividerProps
} from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { ADividerSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('divider')

const dividerProps = () => ({
  /** 标签 */
  label: {
    type: String,
    default: ''
  },
  /** 垂直分割线 */
  vertical: {
    type: Boolean,
    default: false
  },
  /** 标签居左 */
  left: {
    type: Boolean,
    defualt: false
  },
  /** 标签居右 */
  right: {
    type: Boolean,
    default: false
  }
})

const Divider = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...dividerProps()
  },
  setup(props) {
    const attrs = $(useAttrs<ADividerProps>())
    const slots = useSlots() as ADividerSlots

    return () => (
      <ADivider
        class={prefixCls}
        orientation={props.left ? 'left' : props.right ? 'right' : 'center'}
        type={props.vertical ? 'vertical' : 'horizontal'}
        {...attrs}
        v-slots={{
          default: slots.default || (() => props.label),
          ...slots
        }}
      />
    )
  }
})

export type DividerProps = PropsType<typeof Divider> &
  PropsType<ADividerProps> &
  PropsType<typeof dividerProps>
export type DividerExpose = {}
export type DividerSlots = ADividerSlots

export default Divider as GlobalComponentConstructor<DividerProps, DividerSlots>
