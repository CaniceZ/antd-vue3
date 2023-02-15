import { createVNode, defineComponent, type PropType } from 'vue'
import Modal from '../../plugins/modal'
import {
  Button as AButton,
  type ButtonProps as AButtonProps,
  type ModalFuncProps
} from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { AButtonSlots } from './types'
import { getPrefix } from '../../_utils/common'

const [prefixName, prefixCls] = getPrefix('btn')

const btnProps = () => ({
  /** 按钮显示文本 */
  label: {
    type: String
  },
  /** 等于 `shape="circle"` */
  circle: {
    type: Boolean,
    default: false
  },
  /** 等于 `shape="round"` */
  round: {
    type: Boolean,
    default: false
  },
  /** 等于 `type="primary"` */
  primary: {
    type: Boolean,
    default: false
  },
  /** 等于 `type="dashed"` */
  dashed: {
    type: Boolean,
    default: false
  },
  /** 等于 `type="link"` */
  link: {
    type: Boolean,
    default: false
  },
  /** 等于 `type="text"` */
  text: {
    type: Boolean,
    default: false
  },
  /** 等于 `size="small"` */
  small: {
    type: Boolean,
    default: false
  },
  /** 等于 `size="large"` */
  large: {
    type: Boolean,
    default: false
  },
  /** 启用form表单的提交按钮功能，等于 `<button type="submit" />` */
  submit: {
    type: Boolean,
    default: false
  },
  /** 启用弹出确认框，点击确认才会执行 onClick 事件，可设置弹出框配置 */
  confirm: {
    type: [Boolean, Object] as PropType<boolean | ModalFuncProps>,
    default: false
  }
  // TODO feat: 是否考虑再添加一个 popconfirm 的属性
})

const Btn = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: btnProps(),
  setup(props, { attrs, slots }) {
    function onConfirmClick(...args) {
      const defaultConfirm: ModalFuncProps = {
        title: `${props.label}确认`,
        content: `是否确定${props.label}？`,
        icon: createVNode(QuestionCircleOutlined),
        okButtonProps: {
          danger: attrs['danger'] === '' || attrs['danger'] === true
        },
        okText: '确定',
        cancelText: '取消',
        onOk() {
          const fn = attrs['onClick']
          if (typeof fn === 'function') {
            fn(...args)
          }
        }
      }
      if (typeof props.confirm === 'object') {
        Object.assign(defaultConfirm, props.confirm)
      }
      Modal.confirm(defaultConfirm)
    }

    return () => (
      <AButton
        class={prefixCls}
        type={
          props.primary
            ? 'primary'
            : props.dashed
            ? 'dashed'
            : props.link
            ? 'link'
            : props.text
            ? 'text'
            : 'default'
        }
        size={props.small ? 'small' : props.large ? 'large' : 'middle'}
        shape={props.circle ? 'circle' : props.round ? 'round' : void 0}
        html-type={props.submit ? 'submit' : void 0}
        {...(props.confirm ? { ...attrs, onClick: onConfirmClick } : attrs)}
        v-slots={slots}
      >
        {props.label}
      </AButton>
    )
  }
})

export type BtnProps = PropsType<AButtonProps> &
  Omit<PropsType<typeof Btn>, keyof PropsType<typeof btnProps>> &
  PropsType<typeof btnProps>
export type BtnExpose = {}
export type BtnSlots = Partial<AButtonSlots>

export default Btn as GlobalComponentConstructor<BtnProps, BtnSlots>
