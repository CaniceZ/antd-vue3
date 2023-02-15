import { defineComponent } from 'vue'
import { useGlobalConfig } from '../../plugins/global-config'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { DefaultSlots } from '../../types/vue'
import { getPrefix } from '../../_utils/common'

const [prefixName, prefixCls] = getPrefix('page')

const Page = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const globalConfig = useGlobalConfig()
    return () => {
      const Comp = globalConfig.page || 'div'
      return <Comp class={prefixCls} {...attrs} v-slots={slots} />
    }
  }
})

export type PageProps = PropsType<typeof Page>
export type PageExpose = {}
export type PageSlots = Readonly<DefaultSlots>

export default Page as GlobalComponentConstructor<PageProps, PageSlots>
