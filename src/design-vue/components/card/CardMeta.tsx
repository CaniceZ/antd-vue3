import { CardMeta as ACardMeta } from 'ant-design-vue'
import { CardGridProps as ACardMetaProps } from 'ant-design-vue/lib/card/Meta'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ACardMetaSlots } from './type'

const [prefixName, prefixCls] = getPrefix('card-meta')

const CardMeta = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup(_) {
    const attrs = $(useAttrs<ACardMetaProps>())
    const slots = useSlots() as ACardMetaSlots
    return () => <ACardMeta class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type CardMetaProps = PropsType<typeof CardMeta> &
  PropsType<ACardMetaProps>
export type CardMetaExpose = {}
export type CardMetaSlots = ACardMetaSlots

export default CardMeta as GlobalComponentConstructor<
  CardMetaProps,
  CardMetaSlots
>
