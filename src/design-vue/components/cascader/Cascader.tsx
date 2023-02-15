import { defineComponent, PropType, useSlots } from 'vue'
import {
  Cascader as ACascader,
  CascaderProps as ACascaderProps
} from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { ACascaderExpose, ACascaderSlots } from './type'
import { omit } from '../../packages//utils'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useRefExpose from '../../_hooks/useRefExpose'

const [prefixName, prefixCls] = getPrefix('cascader')

const cascaderProps = () => ({
  /** 双向绑定值，指定选中项 */
  modelValue: {
    type: Array as PropType<ACascaderProps['value']>
  }
})

const Cascader = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...cascaderProps()
  },
  emits: {
    'update:modelValue': (_val: ACascaderProps['value']) => true
  },
  setup(props, { emit, expose }) {
    const attrs = $(useAttrs<ACascaderProps>())
    const slots = useSlots() as ACascaderSlots
    const [cascaderRef, cascaderExpose] = useRefExpose<ACascaderExpose>([
      'blur',
      'focus'
    ])
    expose(cascaderExpose)
    return () => (
      <ACascader
        ref={cascaderRef}
        class={prefixCls}
        {...omit(attrs, ['value', 'onUpdate:value'])}
        value={props.modelValue}
        onUpdate:value={$event => emit('update:modelValue', $event)}
        v-slots={slots}
      />
    )
  }
})

export type CascaderProps = PropsType<typeof Cascader> &
  PropsType<Omit<ACascaderProps, 'value' | 'onUpdate:value'>> &
  PropsType<typeof cascaderProps>
export type CascaderExpose = ACascaderSlots
export type CascaderSlots = ACascaderSlots

export default Cascader as GlobalComponentConstructor<
  CascaderProps,
  CascaderSlots
>
