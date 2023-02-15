import { defineComponent, useSlots } from 'vue'
import {
  Popconfirm as APopconfirm,
  PopconfirmProps as APopconfirmProps
} from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { APopconfirmExpose, APopconfirmSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('popconfirm')

const Popconfirm = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<APopconfirmProps>())
    const slots = useSlots() as APopconfirmSlots
    return () => <APopconfirm class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type PopconfirmProps = PropsType<typeof Popconfirm> &
  PropsType<APopconfirmProps>
export type PopconfirmExpose = APopconfirmExpose
export type PopconfirmSlots = APopconfirmSlots

export default Popconfirm as GlobalComponentConstructor<
  PopconfirmProps,
  PopconfirmSlots
>
