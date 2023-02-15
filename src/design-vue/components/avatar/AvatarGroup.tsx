import { defineComponent } from 'vue'
import { AvatarGroup as AAvatarGroup } from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { AvatarGroupProps as AAvatarGroupProps } from 'ant-design-vue/lib/avatar'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('avatar-group')

const AvatarGroup = defineComponent({
  name: prefixName,
  setup(_, { slots }) {
    const attrs = $(useAttrs<AAvatarGroupProps>())
    return () => <AAvatarGroup class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type AvatarGroupProps = PropsType<typeof AvatarGroup>
export type AvatarGroupExpose = {}
export type AvatarGroupSlots = {}

export default AvatarGroup as GlobalComponentConstructor<
  AvatarGroupProps,
  AvatarGroupSlots
>
