import { omit } from '../../packages//utils'
import {
  Tooltip as ATooltip,
  TooltipProps as ATooltipProps
} from 'ant-design-vue'
import { defineComponent, onMounted, PropType, useSlots, watch } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
// import useActualProps from '../../_hooks/useActualProps'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ATooltipSlots } from './type'

const [prefixName, prefixCls] = getPrefix('tooltip')

const tooltipProps = () => ({
  modelValue: {
    type: Boolean as PropType<ATooltipProps['visible']>,
    default: false
  },
  textColor: {
    type: String
  }
})

const Tooltip = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...tooltipProps()
  },
  emits: {
    'update:modelValue': (_visible: ATooltipProps['visible']) => true
  },
  setup(props, { emit, expose }) {
    const attrs = $(useAttrs<ATooltipProps>(['defaultVisible']))
    const slots = useSlots() as ATooltipSlots
    // const actualProps = useActualProps<PropsType<typeof Tooltip>>()

    let visible = $ref<ATooltipProps['visible']>(props.modelValue)
    watch($$(visible), val => {
      emit('update:modelValue', val)
    })
    watch(
      () => props.modelValue,
      val => {
        visible = val
      }
    )

    onMounted(() => {
      if (attrs.defaultVisible) {
        visible = attrs.defaultVisible
      }
    })

    function hide() {
      visible = false
    }
    function show() {
      visible = true
    }

    expose({ hide, show })

    return () => (
      <ATooltip
        destroyTooltipOnHide={true}
        {...omit(attrs, ['visible', 'onUpdate:visible'])}
        overlayClassName={`${prefixCls} ${attrs.overlayClassName || ''}`}
        overlayStyle={{
          color: props.textColor,
          ...(attrs.overlayStyle || {})
        }}
        visible={visible}
        onUpdate:visible={val => {
          if (props?.modelValue) {
            visible = props.modelValue
          } else {
            visible = val
          }
        }}
        v-slots={slots}
      />
    )
  }
})

export type TooltipProps = PropsType<
  Omit<ATooltipProps, 'visible' | 'onUpdate:visible'>
> &
  PropsType<typeof Tooltip> &
  PropsType<typeof tooltipProps>
export type TooltipExpose = {
  show?: () => void
  hide?: () => void
}
export type TooltipSlots = ATooltipSlots

export default Tooltip as GlobalComponentConstructor<TooltipProps, TooltipSlots>
