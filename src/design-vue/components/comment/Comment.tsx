import {
  Comment as AComment,
  CommentProps as ACommentProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ACommentSlots } from './type'

const [prefixName, prefixCls] = getPrefix('comment')

const Comment = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<ACommentProps>())
    const slots = useSlots() as ACommentSlots
    return () => <AComment class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type CommentProps = PropsType<typeof Comment> & PropsType<ACommentProps>
export type CommentExpose = {}
export type CommentSlots = ACommentSlots

export default Comment as GlobalComponentConstructor<CommentProps, CommentSlots>
