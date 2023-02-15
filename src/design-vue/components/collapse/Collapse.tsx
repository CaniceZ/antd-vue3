import {
  Collapse as ACollapse,
  CollapseProps as ACollapseProps
} from 'ant-design-vue'
import { omit } from 'lodash-es'
import { defineComponent, PropType, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ACollapseSlots } from './type'

const [prefixName, prefixCls] = getPrefix('collapse')

const collapseProps = () => ({
  modelValue: [Array, String, Number] as PropType<ACollapseProps['activeKey']>
})

const Collapse = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...collapseProps()
  },
  emits: {
    'update:modelValue': (_val: ACollapseProps['activeKey']) => true
  },
  setup(props, { emit }) {
    const attrs = $(useAttrs<ACollapseProps>())
    const slots = useSlots() as ACollapseSlots
    return () => (
      <ACollapse
        class={prefixCls}
        {...omit(attrs, ['activeKey', 'onUpdate:activeKey'])}
        activeKey={props.modelValue}
        onUpdate:activeKey={val => emit('update:modelValue', val)}
        v-slots={slots}
      />
    )
  }
})

export type CollapseProps = PropsType<typeof Collapse> &
  PropsType<Omit<ACollapseProps, 'activeKey' | 'onUpdate:activeKey'>> &
  PropsType<typeof collapseProps>
export type CollapseExpose = {}
export type CollapseSlots = ACollapseSlots

export default Collapse as GlobalComponentConstructor<
  CollapseProps,
  CollapseSlots
>
