import {
  Skeleton as ASkeleton,
  SkeletonProps as ASkeletonProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ASkeletonSlots } from './type'

const [prefixName, prefixCls] = getPrefix('skeleton')

const Skeleton = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ASkeletonProps>())
    const slots = useSlots() as ASkeletonSlots
    return () => <ASkeleton class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type SkeletonProps = PropsType<typeof Skeleton> &
  PropsType<ASkeletonProps>
export type SkeletonExpose = {}
export type SkeletonSlots = ASkeletonSlots

export default Skeleton as GlobalComponentConstructor<
  SkeletonProps,
  SkeletonSlots
>
