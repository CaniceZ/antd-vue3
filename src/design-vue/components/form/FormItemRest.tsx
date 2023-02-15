import { defineComponent, useSlots } from 'vue'
import { FormItemRest as AFormItemRest } from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { AFormItemRestProps, AFormItemRestSlots } from './types'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('form-item-rest')

const FormItemRest = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AFormItemRestProps>())
    const slots = useSlots() as AFormItemRestSlots
    return () => (
      <AFormItemRest class={prefixCls} {...(attrs as any)} v-slots={slots} />
    )
  }
})

export type FormItemRestProps = PropsType<typeof FormItemRest> &
  PropsType<AFormItemRestProps>
export type FormItemRestExpose = {}
export type FormItemRestSlots = AFormItemRestSlots

export default FormItemRest as GlobalComponentConstructor<
  FormItemRestProps,
  FormItemRestSlots
>
