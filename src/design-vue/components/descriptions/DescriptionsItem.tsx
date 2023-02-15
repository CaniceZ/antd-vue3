import { defineComponent, useSlots } from 'vue'
import { DescriptionsItem as ADescriptionsItem } from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { DescriptionsItemProp as ADescriptionsItemProps } from 'ant-design-vue/lib/descriptions'
import { ADescriptionsItemSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('descriptions-item')

const DescriptionsItem = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ADescriptionsItemProps>())
    const slots = useSlots() as ADescriptionsItemSlots

    return () => (
      <ADescriptionsItem class={prefixCls} {...attrs} v-slots={slots} />
    )
  }
})

export type DescriptionsItemProps = PropsType<typeof DescriptionsItem> &
  PropsType<ADescriptionsItemProps>
export type DescriptionsItemExpose = {}
export type DescriptionsItemSlots = ADescriptionsItemSlots

export default DescriptionsItem as GlobalComponentConstructor<
  DescriptionsItemProps,
  DescriptionsItemSlots
>
