import { defineComponent, getCurrentInstance, PropType, ref, watch } from 'vue'
import { Modal as AModal, ModalProps as AModalProps } from 'ant-design-vue'
import YConfigProvider from '../config-provider'
import { getPrefix } from '../../_utils/common'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { AModalSlots } from './type'
import Btn from '../btn/Btn'

const [prefixName, prefixCls] = getPrefix('modal')

const modalProps = () => ({
  modelValue: {
    type: Boolean,
    default: false
  },
  noFooter: Boolean,
  onlyClose: Boolean,
  closeButtonProps: Object,
  footerAlign: String as PropType<'left' | 'center'>
})

const Modal = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...modalProps()
  },
  emits: ['update:modelValue', 'hide', 'hide_', 'cancel', 'cancel_'],
  setup(props, { attrs, slots, emit, expose }) {
    const { proxy } = getCurrentInstance()!
    const visible = ref(props.modelValue)
    watch(
      () => props.modelValue,
      val => {
        visible.value = val
      }
    )
    watch(visible, val => {
      emit('update:modelValue', val)
    })
    watch(
      () => proxy?.['$route'],
      () => {
        visible.value = false
      }
    )
    function show() {
      visible.value = true
    }
    function hide() {
      visible.value = false
    }
    expose({
      show,
      hide
    })
    function afterClose() {
      const fn = attrs['afterClose']
      if (fn && typeof fn === 'function') {
        fn()
      }
      emit('hide')
      // 用于创建globalModal的时候，预留组件库内部使用的事件，预防用户未透传 hide 事件
      emit('hide_')
    }
    function onCancel(...args) {
      emit('cancel', ...args)
      emit('cancel_', ...args)
    }

    return () => {
      const content = (
        <AModal
          class={[
            prefixCls,
            {
              [`${prefixCls}-footer-align-${props.footerAlign}`]:
                props.footerAlign
            }
          ]}
          destroyOnClose={true}
          maskClosable={false}
          footer={props.noFooter ? null : void 0}
          width="600px"
          {...attrs}
          v-model:visible={visible.value}
          afterClose={afterClose}
          confirmLoading={attrs['loading'] as boolean}
          onCancel={onCancel}
          v-slots={{
            ...slots,
            footer:
              slots.footer ||
              (props.onlyClose ? (
                <Btn
                  primary
                  label="关闭"
                  onClick={() => hide()}
                  {...(props.closeButtonProps || {})}
                />
              ) : (
                void 0
              ))
          }}
        />
      )
      return attrs['isGlobal'] ? (
        <YConfigProvider>{content}</YConfigProvider>
      ) : (
        content
      )
    }
  }
})

export type ModalProps = PropsType<typeof Modal> & PropsType<AModalProps>
export type ModalExpose = {
  show(): void
  hide(): void
}
export type ModalSlots = AModalSlots

export default Modal as GlobalComponentConstructor<ModalProps, ModalSlots>
