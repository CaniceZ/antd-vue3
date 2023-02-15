import { defineComponent } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { DefaultSlots } from '../../types/vue'
import { getPrefix } from '../../_utils/common'

const [prefixName, prefixCls] = getPrefix('link')

const linkProps = () => ({
  /** 标签 */
  label: {
    type: String,
    default: ''
  },
  /** 是否在浏览器新 Tab 中打开 */
  blank: {
    type: Boolean,
    default: false
  },
  color: String,
  primary: Boolean,
  underline: Boolean,
  hoverUnderline: Boolean
})

const Link = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...linkProps()
  },
  setup(props, { attrs, slots }) {
    return () => (
      <a
        class={[
          prefixCls,
          {
            [`${prefixCls}-primary`]: props.primary,
            [`${prefixCls}-underline`]: props.underline,
            [`${prefixCls}-hover-underline`]: props.hoverUnderline
          }
        ]}
        style={{ color: props.color }}
        target={props.blank ? '_blank' : void 0}
        {...attrs}
      >
        {slots.default?.() || props.label}
      </a>
    )
  }
})

export type LinkProps = PropsType<typeof Link> & PropsType<typeof linkProps>
export type LinkExpose = {}
export type LinkSlots = Readonly<DefaultSlots>

export default Link as GlobalComponentConstructor<LinkProps, LinkSlots>
