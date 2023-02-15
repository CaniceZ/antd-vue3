import { defineComponent } from 'vue'
import {
  Affix as _AAffix,
  type AffixProps as AAffixProps
} from 'ant-design-vue'
import useAttrs from '../../_hooks/useAttrs'
import useRefExpose from '../../_hooks/useRefExpose'
import type { AffixExpose as AAffixExpose } from 'ant-design-vue/lib/affix'
import type {
  GlobalComponentConstructor,
  PropsType
} from '../../types/ts-helpers'
import type { AAffixSlots } from './types'
import { getPrefix } from '../../_utils/common'

// 由于 _AAffix 的 target 属性类型和 AAffixProps 的 target 属性类型不完全匹配，为了下面不报错，这里使用 AAffixProps 重新生成一个 ComponentConstructor
const AAffix = _AAffix as GlobalComponentConstructor<
  AAffixProps,
  Partial<AAffixSlots>
>

const [prefixName, prefixCls] = getPrefix('affix')

const Affix = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup(_, { slots, expose }) {
    const attrs = $(useAttrs<AAffixProps>())

    // 透传 a-affix 的方法
    const [affixRef, affixExpose] = useRefExpose<AAffixExpose>([
      'updatePosition',
      'lazyUpdatePosition'
    ])
    expose(affixExpose)

    return () => (
      <AAffix
        ref={affixRef}
        class={prefixCls}
        // 透传 a-affix 的属性
        {...attrs}
        // 透传 a-affix 的插槽
        v-slots={slots}
      />
    )
  }
})

export type AffixProps = PropsType<AAffixProps> & PropsType<typeof Affix>
export type AffixExpose = AAffixExpose
export type AffixSlots = AAffixSlots

export default Affix as GlobalComponentConstructor<AffixProps, AffixSlots>
