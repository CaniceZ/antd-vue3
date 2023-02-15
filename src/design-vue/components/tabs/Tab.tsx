import { defineComponent } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { DefaultSlots } from '../../types/vue'
import { getPrefix } from '../../_utils/common'

const [prefixName, prefixCls] = getPrefix('tab')

const Tab = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    tab: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(_, { attrs }) {
    return () => <div class={prefixCls} {...attrs} />
  }
})

export type TabProps = PropsType<typeof Tab>
export type TabExpose = {}
export type TabSlots = Readonly<DefaultSlots>

export default Tab as GlobalComponentConstructor<TabProps, TabSlots>
