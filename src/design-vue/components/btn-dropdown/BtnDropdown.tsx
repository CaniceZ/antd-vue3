import { defineComponent, ref, VNode, watch } from 'vue'
import {
  Dropdown as ADropdown,
  DropdownButton as ADropdownButton
} from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import { getPrefix, isAttrTrue } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { ADropdownButtonProps, ADropdownButtonSlots } from './type'

const [prefixName, prefixCls] = getPrefix('btn-dropdown')

const btnDropdownProps = () => ({
  /* 下拉按钮是否展开 */
  modelValue: {
    type: Boolean
  },
  /* 是否呈现为分割样式 */
  split: {
    type: Boolean,
    default: false
  },
  /* 关闭后是否销毁 Dropdown */
  destroyPopupOnHide: {
    type: Boolean,
    default: true
  }
})

const BtnDropdown = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...btnDropdownProps()
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const attrs = $(useAttrs<ADropdownButtonProps>())
    const visible = ref(props.modelValue)
    watch(visible, val => {
      emit('update:modelValue', val)
    })
    watch(
      () => props.modelValue,
      val => {
        visible.value = val
      }
    )
    function filterBtns(slots) {
      return (
        slots
          .default?.()
          .filter(row => row.type?.['name'] === 'YBtn')
          .map(row => {
            return row
          }) || []
      )
    }

    return () => {
      const Comp = props.split ? ADropdownButton : ADropdown
      const btns = filterBtns(slots)
      return (
        <Comp
          class={prefixCls}
          {...(props.split
            ? {
                type: isAttrTrue(attrs['primary'])
                  ? 'primary'
                  : isAttrTrue(attrs['ghost'])
                  ? 'ghost'
                  : isAttrTrue(attrs['dashed'])
                  ? 'dashed'
                  : isAttrTrue(attrs['link'])
                  ? 'link'
                  : isAttrTrue(attrs['text'])
                  ? 'text'
                  : 'default',
                size: isAttrTrue(attrs['small'])
                  ? 'small'
                  : isAttrTrue(attrs['large'])
                  ? 'large'
                  : void 0,
                ...(attrs as any)
              }
            : { trigger: attrs.trigger })}
          destroyPopupOnHide={props.destroyPopupOnHide}
          v-model:visible={visible.value}
          disabled={attrs.disabled}
          v-slots={{
            ...slots,
            overlay: () =>
              btns.length > 0 && (
                <y-menu>
                  {btns.map(row => {
                    return (
                      <y-menu-item
                        {...row.props}
                        {...(row.props.type ? { [row.props.type]: true } : {})}
                        v-slots={row.children}
                      />
                    )
                  })}
                </y-menu>
              ),
            default: () => {
              if (props.split) {
                return slots.label?.() || attrs['label']
              } else {
                return (
                  slots.label?.() || (
                    <y-btn {...attrs}>
                      {attrs['label']}
                      {slots.icon?.() || <DownOutlined />}
                    </y-btn>
                  )
                )
              }
            }
          }}
        />
      )
    }
  }
})

export type BtnDropdownProps = PropsType<typeof BtnDropdown> &
  PropsType<ADropdownButtonProps> &
  PropsType<typeof btnDropdownProps>
export type BtnDropdownExpose = {}
export type BtnDropdownSlots = Omit<ADropdownButtonSlots, 'overlay'> & {
  label?: VNode[]
}

export default BtnDropdown as GlobalComponentConstructor<
  BtnDropdownProps,
  BtnDropdownSlots
>
