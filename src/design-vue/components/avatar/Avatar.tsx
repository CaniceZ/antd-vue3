import { defineComponent, useSlots } from 'vue'
import { getPrefix } from '../../_utils/common'
import { Avatar as AAvatar, AvatarProps as AAvatarProps } from 'ant-design-vue'
import useAttrs from '../../_hooks/useAttrs'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { AAvatarSlots } from './type'

const [prefixName, prefixCls] = getPrefix('avatar')

const Avatar = defineComponent({
  name: prefixName,
  setup() {
    const attrs = $(useAttrs<AAvatarProps>())
    const slots = useSlots() as AvatarSlots
    return () => <AAvatar class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type AvatarProps = PropsType<typeof Avatar>
export type AvatarExpose = {}
export type AvatarSlots = AAvatarSlots

export default Avatar as GlobalComponentConstructor<AvatarProps, AvatarSlots>
