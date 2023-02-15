import { App, reactive, shallowRef } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { YgpdProps } from '../../types'

const globalConfig = reactive<YgpdProps>({
  antConfig: {
    locale: zhCN
  },
  page: null,
  appConfig: {},
  httpConfig: {}
})

export function useGlobalConfig() {
  return globalConfig
}

export default {
  install(_: App, props: YgpdProps) {
    this.set(props)
  },
  set(props: YgpdProps) {
    Object.keys(props).forEach(k => {
      if (k === 'page' && props[k]) {
        globalConfig[k] = shallowRef(props[k])
      } else {
        if (!globalConfig[k]) {
          globalConfig[k] = {}
        }
        Object.assign(globalConfig[k], props[k])
      }
    })
  }
}
