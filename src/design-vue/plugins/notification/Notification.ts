import { YgpdProps } from '../../types'
import { App } from 'vue'
import { notification } from 'ant-design-vue'

export default {
  install(_app: App, _: YgpdProps) {
    // nothing
  },
  ...notification
}
