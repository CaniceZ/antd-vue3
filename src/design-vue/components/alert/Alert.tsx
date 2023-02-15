import { defineComponent } from 'vue'
import { Alert as AAlert, type AlertProps as AAlertProps } from 'ant-design-vue'
import { usePropType, defineTypeProps } from '../../_hooks/usePropType'
import useAttrs from '../../_hooks/useAttrs'
import useRefExpose from '../../_hooks/useRefExpose'
import type { AAlertExpose, AAlertSlots } from './types'
import type {
  GlobalComponentConstructor,
  PropsType
} from '../../types/ts-helpers'
import { getPrefix } from '../../_utils/common'

const [prefixName, prefixCls] = getPrefix('alert')

const Alert = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...defineTypeProps()
  },
  setup(props, { slots, expose }) {
    const attrs = $(useAttrs<AAlertProps>())
    const type = $(usePropType(props))

    // 透传 a-alert 的方法
    const [alertRef, alertExpose] = useRefExpose<AAlertExpose>(['animationEnd'])
    expose(alertExpose)

    return () => (
      <AAlert
        ref={alertRef}
        class={prefixCls}
        type={type}
        // 透传 a-alert 的属性
        {...attrs}
        // 透传 a-alert 的插槽
        v-slots={slots}
      />
    )
  }
})

export type AlertProps = PropsType<AAlertProps> &
  Omit<PropsType<typeof Alert>, keyof PropsType<typeof defineTypeProps>> &
  PropsType<typeof defineTypeProps>
export type AlertExpose = AAlertExpose
export type AlertSlots = Partial<AAlertSlots>

export default Alert as GlobalComponentConstructor<AlertProps, AlertSlots>
