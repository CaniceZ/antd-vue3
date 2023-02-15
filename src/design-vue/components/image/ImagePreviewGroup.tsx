import { ImagePreviewGroup as AImagePreviewGroup } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AImagePreviewGroupSlots, AImagePreviewGroupProps } from './type'

const [prefixName, prefixCls] = getPrefix('image-preview-group')

const ImagePreviewGroup = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AImagePreviewGroupProps>())
    const slots = useSlots() as AImagePreviewGroupSlots
    return () => (
      <AImagePreviewGroup
        class={prefixCls}
        {...(attrs as any)}
        v-slots={slots}
      />
    )
  }
})

export type ImagePreviewGroupProps = PropsType<typeof ImagePreviewGroup> &
  PropsType<AImagePreviewGroupProps>
export type ImagePreviewGroupExpose = {}
export type ImagePreviewGroupSlots = AImagePreviewGroupSlots

export default ImagePreviewGroup as GlobalComponentConstructor<
  ImagePreviewGroupProps,
  ImagePreviewGroupSlots
>
