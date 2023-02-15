import { defineComponent, useSlots } from 'vue'
import {
  Tag as ATag,
  CheckableTag as ACheckableTag,
  TagProps as ATagProps
} from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { ATagSlots } from './type'
import { CheckableTagProps as ACheckableTagProps } from 'ant-design-vue/lib/tag/CheckableTag'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('tag')

const tagProps = () => ({
  /** 标签 */
  label: {
    type: String,
    default: ''
  },
  primary: Boolean
})

const Tag = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...tagProps()
  },
  setup(props) {
    const attrs = $(useAttrs<ATagProps & ACheckableTagProps>(['checked']))
    const slots = useSlots() as ATagSlots

    return () => {
      const Comp = 'checked' in attrs ? ACheckableTag : ATag
      return (
        <Comp
          class={[prefixCls, { [`${prefixCls}-primary`]: props.primary }]}
          {...attrs}
          checked={
            attrs.checked && !('onUpdate:checked' in attrs)
              ? true
              : attrs['checked']
          }
        >
          {slots.default?.() || props.label}
        </Comp>
      )
    }
  }
})

export type TagProps = PropsType<ATagProps & ACheckableTagProps> &
  PropsType<typeof Tag> &
  PropsType<typeof tagProps>
export type TagExpose = {}
export type TagSlots = ATagSlots

export default Tag as GlobalComponentConstructor<TagProps, TagSlots>
