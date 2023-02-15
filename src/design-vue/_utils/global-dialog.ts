import { App, Component, createApp, h, ref, Slots } from 'vue'

const globalNodes: HTMLDivElement[] = []

export function createGlobalNode(id?: string) {
  const el = document.createElement('div')

  if (id !== void 0) {
    el.id = id
  }

  document.body.appendChild(el)
  globalNodes.push(el)

  return el
}

export function removeGlobalNode(el: HTMLDivElement) {
  globalNodes.splice(globalNodes.indexOf(el), 1)
  el.remove()
}

function createChildApp(appCfg, parentApp: App) {
  const app = createApp(appCfg)

  app.config.globalProperties = parentApp.config.globalProperties

  const { reload, ...appContext } = parentApp._context as any
  Object.assign(app._context, appContext)

  return app
}

type Noop = (...args: any) => any

export interface GlobalDialogReturn {
  onOk(fn: Noop): GlobalDialogReturn
  onCancel(fn: Noop): GlobalDialogReturn
  onHide(fn: Noop): GlobalDialogReturn
  hide(): GlobalDialogReturn
  destroy(): GlobalDialogReturn
}

export function globalDialog<T>(parentApp: App, defaultComponent?: Component) {
  return (
    component: string | Component,
    props?: T,
    slots?: Slots
  ): GlobalDialogReturn => {
    const isDefaultComponent = defaultComponent && typeof component === 'string'
    const Comp = isDefaultComponent ? defaultComponent : component
    const el = createGlobalNode()

    const visible = ref(true)
    const dialogRef = ref<any>()

    let app: any

    const okFns: Noop[] = []
    const cancelFns: Noop[] = []
    const hideFns: Noop[] = []

    const onHide_ = () => {
      app?.unmount()
      removeGlobalNode(el)
      app = null
      hideFns.forEach(fn => fn())
    }

    const onOk = (...args) => {
      okFns.forEach(fn => fn(...args))
    }

    const onHide = () => {
      visible.value = false
    }

    const onCancel_ = (...args) => {
      cancelFns.forEach(fn => fn(...args))
    }

    const API: GlobalDialogReturn = {
      onOk(fn) {
        okFns.push(fn)
        return API
      },
      onCancel(fn) {
        cancelFns.push(fn)
        return API
      },
      onHide(fn) {
        hideFns.push(fn)
        return API
      },
      hide() {
        onHide()
        return API
      },
      destroy() {
        onHide()
        return API
      }
    }

    app = createChildApp(
      {
        name: 'YGlobalModal',
        setup() {
          return () =>
            h(
              Comp as any,
              {
                ...(props || {}),
                ref: dialogRef,
                modelValue: visible.value,
                'onUpdate:modelValue': val => (visible.value = val),
                onHide_,
                onOk,
                onHide,
                onCancel_,
                isGlobal: true // 用于标识创建的全局弹窗，暂时没有用上该属性
              },
              isDefaultComponent ? () => component : slots || void 0
            )
        }
      },
      parentApp
    )

    app.mount(el)

    return API
  }
}
