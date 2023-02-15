import { defineComponent, computed, useSlots } from 'vue'
import { Card as ACard, CardProps as ACardProps } from 'ant-design-vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { ACardSlots } from './type'
import { getPrefix } from '../../_utils/common'

const [prefixName, prefixCls] = getPrefix('card')

const cardProps = () => ({
  /** ygp 常用的 title 样式 */
  ygpTitle: {
    type: Boolean,
    default: false
  }
})

const Card = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...cardProps()
  },
  setup(props) {
    const attrs = $(useAttrs<ACardProps>())
    const slots = useSlots() as CardSlots
    const showTitle = computed(() => {
      return attrs.title ? attrs.title : slots.title?.()
    })

    return () => {
      const { title, ...restAttrs } = attrs
      return (
        <ACard
          {...restAttrs}
          class={[prefixCls, { 'spe-title-card': props.ygpTitle }, attrs.class]}
          v-slots={{
            ...slots,
            title: showTitle.value
              ? () =>
                  props.ygpTitle ? (
                    <>
                      <y-divider type="vertical" />
                      {showTitle.value}
                    </>
                  ) : (
                    showTitle.value
                  )
              : null
          }}
        />
      )
    }
  }
})

export type CardProps = PropsType<ACardProps> &
  PropsType<typeof Card> &
  PropsType<typeof cardProps>
export type CardExpose = {}
export type CardSlots = ACardSlots

export default Card as GlobalComponentConstructor<CardProps, CardSlots>
