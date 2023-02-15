import {
  TypographyText as ATypographyText,
  TypographyTitle as ATypographyTitle
} from 'ant-design-vue'
import { TitleProps as ATypographyTitleProps } from 'ant-design-vue/lib/typography/Title'
import { TextProps as ATypographyTextProps } from 'ant-design-vue/lib/typography/Text'
import { defineComponent, useSlots } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import { ATypographyTextSlots } from './type'

const [prefixName, prefixCls] = getPrefix('text')

const textProps = () => ({
  h1: Boolean,
  h2: Boolean,
  h3: Boolean,
  h4: Boolean,
  h5: Boolean
})

const Text = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: textProps(),
  setup(props) {
    const attrs = $(useAttrs<ATypographyTextProps & ATypographyTitleProps>())
    const slots = useSlots() as ATypographyTextSlots

    const level = $computed<ATypographyTitleProps['level']>(() => {
      if (props.h1) return 1
      else if (props.h2) return 2
      else if (props.h3) return 3
      else if (props.h4) return 4
      else if (props.h5) return 5
      else return void 0
    })

    return () => {
      const Comp = level ? ATypographyTitle : ATypographyText
      return <Comp class={prefixCls} {...attrs} level={level} v-slots={slots} />
    }
  }
})

export type TextProps = PropsType<typeof Text> &
  PropsType<ATypographyTextProps & ATypographyTitleProps>
export type TextExpose = {}
export type TextSlots = ATypographyTextSlots

export default Text as GlobalComponentConstructor<TextProps, TextSlots>
