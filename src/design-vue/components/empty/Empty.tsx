import { Empty as AEmpty, EmptyProps as AEmptyProps } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AEmptySlots } from './type'

const [prefixName, prefixCls] = getPrefix('empty')

const Empty = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AEmptyProps>())
    const slots = useSlots() as AEmptySlots
    return () => (
      <AEmpty
        class={prefixCls}
        image={AEmpty.PRESENTED_IMAGE_SIMPLE}
        {...attrs}
        v-slots={slots}
      />
    )
  }
})

export type EmptyProps = PropsType<typeof Empty> & PropsType<AEmptyProps>
export type EmptyExpose = {}
export type EmptySlots = AEmptySlots

export default Empty as GlobalComponentConstructor<EmptyProps, EmptySlots>
