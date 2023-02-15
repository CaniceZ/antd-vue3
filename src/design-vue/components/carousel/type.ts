import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-carousel 的 slots 类型
export type ACarouselSlots = Readonly<
  DefaultSlots & {
    customPaging?(): VNode[]
    appendDots?(): VNode[]
    prevArrow?(): VNode[]
    nextArrow?(): VNode[]
  }
>

export type ACarouselExpose = {
  goTo: (slide: number, dontAnimate: boolean) => void
  autoplay: (playType: any) => void
  prev: () => void
  next: () => void
  innerSlider: any
}
