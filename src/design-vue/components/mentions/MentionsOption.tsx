import { MentionsOption as AMentionsOption } from 'ant-design-vue'
import { MentionsOptionProps as AMentionsOptionProps } from 'ant-design-vue/lib/mentions'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AMentionsOptionSlots } from './type'

const [prefixName, prefixCls] = getPrefix('mentions-option')

const MentionsOption = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AMentionsOptionProps>())
    const slots = useSlots() as AMentionsOptionSlots

    return () => (
      <AMentionsOption class={prefixCls} {...attrs} v-slots={slots} />
    )
  }
})

export type MentionsOptionProps = PropsType<typeof MentionsOption> &
  PropsType<typeof AMentionsOption>
export type MentionsOptionExpose = {}
export type MentionsOptionSlots = AMentionsOptionSlots

export default MentionsOption as GlobalComponentConstructor<
  MentionsOptionProps,
  MentionsOptionSlots
>
