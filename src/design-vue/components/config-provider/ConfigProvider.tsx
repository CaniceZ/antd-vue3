import { defineComponent, useSlots } from 'vue'
import { useGlobalConfig } from '../../plugins/global-config'
import {
  ConfigProvider as AConfigProvider,
  ConfigProviderProps as AConfigProviderProps
} from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { AConfigProviderSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName] = getPrefix('config-provider')

const ConfigProvider = defineComponent({
  name: prefixName,
  setup() {
    const globalConfig = useGlobalConfig()
    const attrs = $(useAttrs<AConfigProviderProps>())
    const slots = useSlots() as AConfigProviderSlots

    return () => (
      <AConfigProvider
        {...attrs}
        {...(globalConfig.antConfig || {})}
        v-slots={slots}
      />
    )
  }
})

export type ConfigProviderProps = PropsType<typeof ConfigProvider> &
  PropsType<AConfigProviderProps>
export type ConfigProviderExpose = {}
export type ConfigProviderSlots = AConfigProviderSlots

export default ConfigProvider as GlobalComponentConstructor<
  ConfigProviderProps,
  ConfigProviderSlots
>
