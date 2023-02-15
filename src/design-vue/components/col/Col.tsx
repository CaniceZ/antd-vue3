import { Col as ACol, ColProps as AColProps } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AColSlots } from './type'

const [prefixName, prefixCls] = getPrefix('col')

const Col = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AColProps>())
    const slots = useSlots() as AColSlots
    return () => <ACol class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type ColProps = PropsType<typeof Col> & PropsType<AColProps>
export type ColExpose = {}
export type ColSlots = AColSlots

export default Col as GlobalComponentConstructor<ColProps, ColSlots>
