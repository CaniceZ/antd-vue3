import { App } from 'vue'
import * as components from './components'
import Modal from './plugins/modal'
import GlobalConfig, {
  useGlobalConfig
} from './plugins/global-config/GlobalConfig'
import Message from './plugins/message'
import Notification from './plugins/notification'
import Drawer from './plugins/drawer'
import type { FormItem } from './components/form/types'
import type { TableColumn } from './components/table/types'
import { YgpdProps } from './types'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const plugins = [Modal, GlobalConfig, Message, Drawer, Notification]

const Ygpd = {
  install: (app: App<Element>, props: YgpdProps = {}) => {
    if (dayjs) {
      dayjs.locale('zh-cn')
    }

    Object.keys(components).forEach(key => {
      app.component(key, components[key])
    })

    plugins.forEach(plugin => {
      plugin.install(app, props)
    })
  }
}

export default Ygpd

export {
  Modal,
  GlobalConfig,
  Message,
  Drawer,
  Notification,
  useGlobalConfig,
  FormItem,
  TableColumn
}

export * from './components'
