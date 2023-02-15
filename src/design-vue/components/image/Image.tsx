import { Image as AImage, ImageProps as AImageProps } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AImageSlots } from './type'

const [prefixName, prefixCls] = getPrefix('image')

const Image = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AImageProps>())
    const slots = useSlots() as AImageSlots

    return () => (
      <AImage
        class={prefixCls}
        {...attrs}
        src={attrs.src || attrs.fallback}
        v-slots={slots}
      />
    )
  }
})

export type ImageProps = PropsType<typeof Image> & PropsType<AImageProps>
export type ImageExpose = {}
export type ImageSlots = AImageSlots

export default Image as GlobalComponentConstructor<ImageProps, ImageSlots>
