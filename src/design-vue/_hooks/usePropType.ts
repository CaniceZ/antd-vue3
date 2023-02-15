import { computed, ComputedRef } from 'vue'
import type { AlertProps } from 'ant-design-vue'
import { PropsType } from '../types/ts-helpers'

export const defineTypeProps = () => ({
  /** 等于 `type="success"` */
  success: {
    type: Boolean,
    default: false
  },
  /** 等于 `type="info"` */
  info: {
    type: Boolean,
    default: false
  },
  /** 等于 `type="warning"` */
  warning: {
    type: Boolean,
    default: false
  },
  /** 等于 `type="error"` */
  error: {
    type: Boolean,
    default: false
  }
})

export function usePropType(
  props: PropsType<typeof defineTypeProps>
): ComputedRef<AlertProps['type']> {
  return computed(() => {
    if (props.success) {
      return 'success'
    } else if (props.info) {
      return 'info'
    } else if (props.warning) {
      return 'warning'
    } else if (props.error) {
      return 'error'
    }
    return void 0
  })
}
