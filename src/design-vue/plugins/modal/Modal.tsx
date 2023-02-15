import type { ModalFuncProps, ModalProps } from 'ant-design-vue'
import { App, Component, Slots } from 'vue'
import { Modal } from 'ant-design-vue'
import { YgpdProps } from '../../types'
import DefaultCreateModal from './DefaultCreateModal'
import { globalDialog, GlobalDialogReturn } from '../../_utils/global-dialog'

type NewModalProps = Partial<ModalProps> & { [key: string]: any }

export default {
  install(app: App, _: Partial<YgpdProps>) {
    this.create = globalDialog<NewModalProps>(app, DefaultCreateModal)
  },
  create(
    _component: string | Component,
    _props?: NewModalProps,
    _slots?: Slots
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
  },
  info(prop: string | ModalFuncProps) {
    if (typeof prop === 'string') {
      return Modal.info({
        title: '系统提示',
        content: prop
      })
    }
    return Modal.info(prop)
  },
  success(prop: string | ModalFuncProps) {
    if (typeof prop === 'string') {
      return Modal.success({
        title: '系统提示',
        content: prop
      })
    }
    return Modal.success(prop)
  },
  error(prop: string | ModalFuncProps) {
    if (typeof prop === 'string') {
      return Modal.error({
        title: '系统提示',
        content: prop
      })
    }
    return Modal.error(prop)
  },
  warning(prop: string | ModalFuncProps) {
    if (typeof prop === 'string') {
      return Modal.warning({
        title: '系统提示',
        content: prop
      })
    }
    return Modal.warning(prop)
  },
  confirm: Modal.confirm,
  destroyAll: Modal.destroyAll
}
