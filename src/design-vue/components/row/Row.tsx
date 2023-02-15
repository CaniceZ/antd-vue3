import { Row as ARow, RowProps as ARowProps } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ARowSlots } from './type'

const [prefixName, prefixCls] = getPrefix('row')

const Row = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ARowProps>())
    const slots = useSlots() as ARowSlots

    return () => <ARow class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type RowProps = PropsType<typeof Row> & PropsType<ARowProps>
export type RowExpose = {}
export type RowSlots = ARowSlots

export default Row as GlobalComponentConstructor<RowProps, RowSlots>
