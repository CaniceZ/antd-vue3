import {
  ModalFuncProps,
  MenuItem as AMenuItem,
  MenuItemProps as AMenuItemProps
} from 'ant-design-vue'
import {
  createVNode,
  defineComponent,
  getCurrentInstance,
  PropType,
  useSlots
} from 'vue'
import Modal from '../../plugins/modal'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { getPrefix } from '../../_utils/common'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { AMenuItemSlots } from './type'

const [prefixName, prefixCls] = getPrefix('menu-item')

const MenuItem = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    label: {
      type: String
    },
    confirm: {
      type: [Boolean, Object] as PropType<boolean | ModalFuncProps>,
      default: false
    },
    link: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const attrs = $(useAttrs<AMenuItemProps>(['danger']))
    const slots = useSlots() as AMenuItemSlots
    const instance = getCurrentInstance()
    const key = $computed(
      () => instance?.vnode?.key as PropsType<typeof AMenuItem>['key']
    )

    function onConfirmClick(e: MouseEvent) {
      const defaultConfirm: ModalFuncProps = {
        title: `${props.label}确认`,
        content: `是否确定${props.label}？`,
        icon: createVNode(QuestionCircleOutlined),
        okButtonProps: {
          danger: attrs.danger
        },
        okText: '确定',
        cancelText: '取消',
        onOk() {
          if (typeof attrs.onClick === 'function') {
            attrs.onClick(e)
          }
        }
      }
      if (typeof props.confirm === 'object') {
        Object.assign(defaultConfirm, props.confirm)
      }
      Modal.confirm(defaultConfirm)
    }

    return () => {
      const { onClick, ...restAttrs } = attrs
      return (
        <AMenuItem
          class={[
            prefixCls,
            {
              [`${prefixCls}-link`]: props.link
            }
          ]}
          {...restAttrs}
          key={key}
          onClick={props.confirm ? onConfirmClick : onClick}
          v-slots={{
            ...slots,
            default: () => slots.default?.() || props.label
          }}
        />
      )
    }
  }
})

export type MenuItemProps = PropsType<typeof MenuItem> &
  PropsType<AMenuItemProps>
export type MenuItemExpose = {}
export type MenuItemSlots = AMenuItemSlots

export default MenuItem as GlobalComponentConstructor<
  MenuItemProps,
  MenuItemSlots
>
