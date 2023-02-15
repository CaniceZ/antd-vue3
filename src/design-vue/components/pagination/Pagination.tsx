import { defineComponent, useSlots } from 'vue'
import {
  Pagination as APagination,
  PaginationProps as APaginationProps
} from 'ant-design-vue'
import { getPrefix } from '../../_utils/common'
import useAttrs from '../../_hooks/useAttrs'
import { APaginationSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('pagination')

const paginationProps = () => ({
  /** 边框 */
  border: {
    type: Boolean,
    default: true
  }
})

const Pagination = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...paginationProps()
  },
  setup(props) {
    const attrs = $(useAttrs<APaginationProps>())
    const slots = useSlots() as APaginationSlots

    return () => (
      <APagination
        class={[prefixCls, { no_border: !props.border }]}
        pageSize={20}
        {...attrs}
        v-slots={slots}
      />
    )
  }
})

export type PaginationProps = PropsType<typeof Pagination> &
  PropsType<APaginationProps> &
  PropsType<typeof paginationProps>
export type PaginationExpose = {}
export type PaginationSlots = APaginationSlots

export default Pagination as GlobalComponentConstructor<
  PaginationProps,
  PaginationSlots
>
