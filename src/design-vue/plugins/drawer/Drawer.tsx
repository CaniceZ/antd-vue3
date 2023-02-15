import { App, Component } from 'vue'
import { YgpdProps } from '../../types'
import { globalDialog, GlobalDialogReturn } from '../../_utils/global-dialog'
import type { DrawerProps } from 'ant-design-vue/lib/drawer'

type NewDrawerProps = Partial<DrawerProps> & { [key: string]: any }

export default {
  install(app: App, _: YgpdProps) {
    this.create = globalDialog<NewDrawerProps>(app)
  },
  create(
    _component: string | Component,
    _props?: NewDrawerProps
  ): GlobalDialogReturn {
    const API: GlobalDialogReturn = {
      onOk() {
        return API
      },
      onCancel() {
        return API
      },
      onHide() {
        return API
      },
      destroy() {
        return API
      },
      hide() {
        return API
      }
    }
    return API
  }
}
