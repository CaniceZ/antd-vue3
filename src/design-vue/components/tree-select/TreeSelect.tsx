import {
  TreeSelect as ATreeSelect,
  TreeSelectProps as ATreeSelectProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ATreeSelectSlots } from './type'

const [prefixName, prefixCls] = getPrefix('tree-select')

const TreeSelect = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ATreeSelectProps>())
    const slots = useSlots() as ATreeSelectSlots
    return () => <ATreeSelect class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type TreeSelectProps = PropsType<typeof TreeSelect> &
  PropsType<ATreeSelectProps>
export type TreeSelectExpose = {}
export type TreeSelectSlots = ATreeSelectSlots

export default TreeSelect as GlobalComponentConstructor<
  TreeSelectProps,
  TreeSelectSlots
>
