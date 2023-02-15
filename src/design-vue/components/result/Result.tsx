import { Result as AResult, ResultProps as AResultProps } from 'ant-design-vue'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { AResultSlots } from './type'

const [prefixName, prefixCls] = getPrefix('result')

const Result = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup() {
    const attrs = $(useAttrs<AResultProps>())
    const slots = useSlots() as AResultSlots
    return () => <AResult class={prefixCls} {...attrs} v-slots={slots} />
  }
})

export type ResultProps = PropsType<typeof Result> & PropsType<AResultProps>
export type ResultExpose = {}
export type ResultSlots = AResultSlots

export default Result as GlobalComponentConstructor<ResultProps, ResultSlots>
