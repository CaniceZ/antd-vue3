import {
  Mentions as AMentions,
  MentionsProps as AMentionsProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import useRefExpose from '../../_hooks/useRefExpose'
import { getPrefix } from '../../_utils/common'
import { AMentionsExpose, AMentionsSlots } from './type'

const [prefixName, prefixCls] = getPrefix('mentions')

const Mentions = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup(_, { expose }) {
    const attrs = $(useAttrs<AMentionsProps>())
    const slots = useSlots() as AMentionsSlots
    const [mentionsRef, mentionsExpose] = useRefExpose<AMentionsExpose>([
      'blur',
      'focus'
    ])
    expose(mentionsExpose)

    return () => (
      <AMentions
        ref={mentionsRef}
        class={prefixCls}
        {...attrs}
        v-slots={slots}
      />
    )
  }
})

export type MentionsProps = PropsType<typeof Mentions> &
  PropsType<AMentionsProps>
export type MentionsExpose = {}
export type MentionsSlots = AMentionsSlots

export default Mentions as GlobalComponentConstructor<
  MentionsProps,
  MentionsSlots
>
