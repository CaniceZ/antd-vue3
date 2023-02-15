import { defineComponent } from 'vue'
import type {
  GlobalComponentConstructor,
  PropsType
} from '../../types/ts-helpers'
import { EyeOutlined } from '@ant-design/icons-vue'
import { useGlobalConfig } from '../../plugins/global-config'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { flattenChildren } from '../../_utils/props-utils'
import { getPrefix } from '../../_utils/common'
import { getCiphertext, isCiphertext } from '../../packages//utils'
import get from 'lodash-es/get'
import useAttrs from '../../_hooks/useAttrs'

const [prefixName, prefixCls] = getPrefix('ciphertext')

const ciphertextProps = () => ({
  text: String,
  cipherText: String,
  // 解密接口服务前缀
  decryptApiPrefix: String,
  model: Object,
  name: String
})

const Ciphertext = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...ciphertextProps()
  },
  emits: {
    'update:modelValue': (_value: string) => true,
    decrypt: (_value: string) => true
  },
  setup(props, { emit, slots }) {
    const globalConfig = useGlobalConfig()
    const attrs = $(useAttrs())
    let loading = $ref(false)
    let decryptText = $ref('')

    async function onClick() {
      if (!globalConfig.appConfig?.keywordDecryptApi) {
        console.error(
          '请先在全局属性中注册[appConfig.keywordDecryptApi]方法，用于调用关键字解密的异步函数'
        )
        return
      }
      try {
        loading = true
        const [, apiPrefix] =
          props.decryptApiPrefix?.match(/^\/?(.*?)\/?$/) || []
        const data = await globalConfig.appConfig?.keywordDecryptApi(
          {
            cipherText: props.cipherText || '',
            text: props.text || '',
            ...(props.model && props.name
              ? getCiphertext(props.model, props.name)
              : {})
          },
          apiPrefix ? `/${apiPrefix}` : void 0
        )
        let res: any
        if (data && typeof data === 'object' && data['data']) {
          res = data['data'] as string
        } else {
          res = data
        }
        emit('update:modelValue', res)
        emit('decrypt', res)
        decryptText = res
      } finally {
        loading = false
      }
    }

    function onFocus() {
      onClick()
    }

    return () => {
      if (slots.default) {
        if (
          props.model &&
          props.name &&
          !isCiphertext(props.model, props.name)
        ) {
          return slots.default?.()
        }
        const children = flattenChildren(slots.default?.())
        const inputVNode = children.length ? children[0] : void 0
        if (
          inputVNode &&
          inputVNode.type &&
          inputVNode.type['name'] === 'YInput'
        ) {
          const eyeSlots = inputVNode.props?.['disabled']
            ? {
                suffix: () => (
                  <y-link onClick={onClick}>
                    <EyeOutlined />
                  </y-link>
                )
              }
            : {}
          return (
            <y-spin wrapperClassName={attrs.class} spinning={loading}>
              <inputVNode
                allowClear={false}
                onFocus={onFocus}
                v-slots={eyeSlots}
              />
            </y-spin>
          )
        }
      }
      const getContent = (text?) => (
        <span class={[prefixCls, attrs.class]} style={attrs.style}>
          {text || props.text}
          {loading ? (
            <LoadingOutlined style="margin-left: 5px" />
          ) : (
            <y-link style="padding-left: 8px" onClick={onClick}>
              <EyeOutlined />
            </y-link>
          )}
        </span>
      )
      if (props.model && props.name) {
        const text = get(props.model, props.name)
        if (!decryptText && isCiphertext(props.model, props.name)) {
          return getContent(text)
        } else {
          return decryptText || text
        }
      }
      return getContent()
    }
  }
})

export type CiphertextProps = PropsType<typeof Ciphertext>
export type CiphertextExpose = {}
export type CiphertextSlots = Partial<{}>

export default Ciphertext as GlobalComponentConstructor<
  CiphertextProps,
  CiphertextSlots
>
