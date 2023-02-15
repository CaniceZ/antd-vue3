import { defineComponent, useSlots } from 'vue'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import {
  Descriptions as ADescriptions,
  DescriptionsProps as ADescriptionsProps
} from 'ant-design-vue'
import { ADescriptionsSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('descriptions')

const descriptionsProps = () => ({
  /** 标签垂直 */
  labelVertical: {
    type: Boolean,
    default: false
  },
  /** 表格布局垂直 */
  vertical: {
    type: Boolean,
    default: false
  }
})

const Descriptions = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...descriptionsProps()
  },
  setup(props) {
    const attrs = $(useAttrs<ADescriptionsProps>())
    const slots = useSlots() as ADescriptionsSlots
    const layout = $computed(() => {
      if ('layout' in attrs) {
        return attrs['layout']
      } else if (props.labelVertical) {
        return 'vertical'
      } else {
        return 'horizontal'
      }
    })
    return () => (
      <ADescriptions
        class={prefixCls}
        {...attrs}
        layout={layout}
        v-slots={slots}
      />
    )
  }
})

export type DescriptionsProps = PropsType<typeof Descriptions> &
  PropsType<ADescriptionsProps> &
  PropsType<typeof descriptionsProps>
export type DescriptionsExpose = {}
export type DescriptionsSlots = ADescriptionsSlots

export default Descriptions as GlobalComponentConstructor<
  DescriptionsProps,
  DescriptionsSlots
>
