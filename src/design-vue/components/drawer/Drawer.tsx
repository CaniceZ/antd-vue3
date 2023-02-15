import {
  defineComponent,
  getCurrentInstance,
  PropType,
  useSlots,
  watch
} from 'vue'
import { Drawer as ADrawer, DrawerProps as ADrawerProps } from 'ant-design-vue'
import ConfigProvider from '../config-provider'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { ADrawerSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { omit } from '../../packages//utils'

const [prefixName, prefixCls] = getPrefix('drawer')

const drawerProps = () => ({
  /** 显示/隐藏 */
  modelValue: {
    type: Boolean as PropType<ADrawerProps['visible']>,
    default: false
  },
  /** 是否通过 Drawer.create 创建的全局 Drawer 标识 */
  isGlobal: {
    type: Boolean,
    default: false
  }
})

const Drawer = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...drawerProps()
  },
  emits: {
    'update:modelValue': (_visible: ADrawerProps['visible']) => true,
    hide: () => true,
    hide_: () => true,
    close: (_e?: MouseEvent | KeyboardEvent) => true,
    cancel: () => true,
    cancel_: () => true,
    show: () => true,
    afterVisibleChange: (_visible: ADrawerProps['visible']) => true
  },
  setup(props, { emit, expose }) {
    const { proxy } = getCurrentInstance()!
    const attrs = $(useAttrs<ADrawerProps>())
    const slots = useSlots() as ADrawerSlots
    let visible = $ref<ADrawerProps['visible']>(props.modelValue)
    watch($$(visible), val => {
      emit('update:modelValue', val)
    })
    watch(
      () => props.modelValue,
      val => {
        visible = val
      }
    )
    watch(
      () => proxy?.['$route'],
      () => {
        visible = false
      }
    )
    function onClose(e?: MouseEvent | KeyboardEvent) {
      emit('close', e)
      emit('cancel')
      emit('cancel_')
    }
    expose({
      show() {
        visible = true
      },
      hide() {
        visible = false
      },
      cancel() {
        visible = false
        onClose()
      }
    })
    function onAfterVisibleChange(visible) {
      if (visible) {
        emit('show')
      } else {
        emit('hide')
        emit('hide_')
      }
      emit('afterVisibleChange', visible)
    }
    return () => {
      const content = (
        <ADrawer
          class={prefixCls}
          destroyOnClose={true}
          maskClosable={false}
          {...omit(attrs, ['visible', 'onUpdate:visible'])}
          v-model:visible={visible}
          onAfterVisibleChange={onAfterVisibleChange}
          onClose={onClose}
          v-slots={slots}
        />
      )
      return props.isGlobal ? (
        <ConfigProvider>{content}</ConfigProvider>
      ) : (
        content
      )
    }
  }
})

export type DrawerProps = PropsType<typeof Drawer> &
  PropsType<Omit<ADrawerProps, 'visible' | 'onUpdate:visible'>> &
  PropsType<typeof drawerProps>
export type DrawerExpose = {
  /** 显示 */
  show(): void
  /** 隐藏 */
  hide(): void
  /** 取消 */
  cancel(): void
}
export type DrawerSlots = ADrawerSlots

export default Drawer as GlobalComponentConstructor<DrawerProps, DrawerSlots>
