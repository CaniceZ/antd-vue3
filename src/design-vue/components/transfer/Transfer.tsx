import {
  Transfer as ATransfer,
  TransferProps as ATransferProps
} from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import useRefExpose from '../../_hooks/useRefExpose'
import { getPrefix } from '../../_utils/common'
import { ATransferSlots, ATransferExpose } from './type'

const [prefixName, prefixCls] = getPrefix('transfer')

const Transfer = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup(_, { expose }) {
    const attrs = $(useAttrs<ATransferProps>())
    const slots = useSlots() as ATransferSlots
    const [transferRef, transferExpose] = useRefExpose<ATransferExpose>([
      'handleSelectChange'
    ])
    expose(transferExpose)

    return () => (
      <ATransfer
        ref={transferRef}
        class={prefixCls}
        {...attrs}
        v-slots={slots}
      />
    )
  }
})

export type TransferProps = PropsType<typeof Transfer> &
  PropsType<ATransferProps>
export type TransferExpose = {}
export type TransferSlots = ATransferSlots

export default Transfer as GlobalComponentConstructor<
  TransferProps,
  TransferSlots
>
