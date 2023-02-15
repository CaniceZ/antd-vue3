import {
  Carousel as ACarousel,
  CarouselProps as ACarouselProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import useRefExpose from '../../_hooks/useRefExpose'
import { getPrefix } from '../../_utils/common'
import { ACarouselExpose, ACarouselSlots } from './type'

const [prefixName, prefixCls] = getPrefix('carousel')

const Carousel = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup(_, { expose }) {
    const attrs = $(useAttrs<ACarouselProps>())
    const slots = useSlots() as ACarouselSlots
    const [carouselRef, carouselExpose] = useRefExpose<ACarouselExpose>([
      'goTo',
      'autoplay',
      'prev',
      'next',
      'innerSlider'
    ])
    expose(carouselExpose)

    return () => (
      <ACarousel
        ref={carouselRef}
        class={prefixCls}
        {...attrs}
        v-slots={slots}
      />
    )
  }
})

export type CarouselProps = PropsType<typeof Carousel> &
  PropsType<ACarouselProps>
export type CarouselExpose = {}
export type CarouselSlots = ACarouselSlots

export default Carousel as GlobalComponentConstructor<
  CarouselProps,
  CarouselSlots
>
