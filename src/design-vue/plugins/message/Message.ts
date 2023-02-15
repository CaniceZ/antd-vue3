import { YgpdProps } from '../../types'
import { App } from 'vue'
import { message } from 'ant-design-vue'

export default {
  install(_app: App, _: YgpdProps) {
    // nothing
  },
  ...message
}
