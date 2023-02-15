import { FormProps as AFormProps } from 'ant-design-vue'
import {
  defineComponent,
  onBeforeUpdate,
  ref,
  PropType,
  reactive,
  computed,
  provide,
  readonly,
  VNode
} from 'vue'
import type { FormItem } from './types'
import { FormKey } from './common'
import set from 'lodash-es/set'
import get from 'lodash-es/get'
import unset from 'lodash-es/unset'
import { filterSlots, isEmpty, getPrefix } from '../../_utils/common'
import useRefExpose from '../../_hooks/useRefExpose'
import { FormExpose as AFormExpose } from 'ant-design-vue/lib/form/Form'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { DefaultSlots } from '../../types/vue'

const DEFAULT_SPAN = 12

const [prefixName, prefixCls] = getPrefix('form')

const Form = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    items: {
      type: Array as PropType<FormItem[]>,
      default: () => []
    },
    gutter: {
      type: [Number, Object, Array],
      default: 16
    },
    vertical: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    defaultSpan: {
      type: Number,
      default: DEFAULT_SPAN
    },
    labelVertical: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    noExplain: {
      type: Boolean,
      default: false
    },
    noLabel: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Boolean,
      default: false
    },
    inputDefaultPlaceholder: {
      type: Boolean,
      default: true
    },
    // 解密接口服务前缀
    decryptApiPrefix: {
      type: String
    },
    compact: Boolean,
    actionFormItemProps: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    focusToFirstError: Boolean
    // TODO feat 增加 autofocus: boolean 属性，默认对首个 input/text 类型设置 autofocus
    // TODO feat 增加 size 的便捷属性，如 small / large
  },
  setup(props, { slots, expose, attrs }) {
    const [formRef, formExpose] = useRefExpose<AFormExpose>([
      'resetFields',
      'clearValidate',
      'scrollToField',
      'validate',
      'validateFields',
      'getFieldsValue'
    ])
    async function validate(...args: any[]) {
      try {
        return await formExpose.validate?.(...args)
      } catch (error) {
        const [fields] = error?.errorFields || []
        if (
          fields &&
          fields.name &&
          fields.name[0] &&
          props.focusToFirstError
        ) {
          const itemRef = getItemRef(fields.name[0])
          itemRef?.item?.focus()
        }
        throw error
      }
    }
    async function validateFields(...args: any[]) {
      try {
        return await formExpose.validateFields?.(...args)
      } catch (error) {
        const [fields] = error?.errorFields || []
        if (
          fields &&
          fields.name &&
          fields.name[0] &&
          props.focusToFirstError
        ) {
          const itemRef = getItemRef(fields.name[0])
          itemRef?.item?.focus()
        }
        throw error
      }
    }
    const model = computed(() => (attrs['model'] as object) || {})
    provide(FormKey, {
      inputDefaultPlaceholder: computed(() => props.inputDefaultPlaceholder),
      labelWidth: computed(() => props.labelWidth),
      detail: computed(() => props.detail),
      model: readonly(model),
      decryptApiPrefix: computed(() => props.decryptApiPrefix),
      validate(name) {
        validateFields([name])
      },
      getValue(name: string | string[]) {
        if (typeof name === 'string') {
          return get(model.value, name)
        } else if (Array.isArray(name)) {
          return name.map(field => get(model.value, field))
        }
      },
      setValue(name: string | string[], value: any | any[]) {
        if (typeof name === 'string') {
          if (isEmpty(value)) {
            unset(model.value, name)
          } else {
            set(model.value, name, value)
          }
        } else if (Array.isArray(name)) {
          name.forEach((field, index) => {
            if (isEmpty(value)) {
              unset(model.value, field)
            } else {
              if (Array.isArray(value)) {
                set(model.value, field, value[index])
              } else {
                set(model.value, field, value)
              }
            }
          })
        }
      }
    })

    // TODO feat 根据宽度自适应 defaultSpan

    function calcSpan(span?: number) {
      if (span && span > 0) {
        return Math.min(span, 24)
      } else if (props.defaultSpan && props.defaultSpan > 0) {
        return Math.min(props.defaultSpan, 24)
      }
      return DEFAULT_SPAN
    }

    function getSpan(span?: number): number {
      return calcSpan(span)
    }

    const name = computed(() => {
      return (
        attrs['name'] || `${prefixCls}-${String(Math.random()).substring(2, 6)}`
      )
    })

    const layout = computed(() => {
      if (attrs['layout']) {
        return attrs['layout']
      } else if (props.inline) {
        return 'inline'
      } else if (props.labelVertical) {
        return 'vertical'
      } else {
        return 'horizontal'
      }
    })

    const itemOptions = reactive<{ [key: string]: FormItem }>({})
    const items = computed(() => {
      return (props.items || []).map(item =>
        Object.assign({}, itemOptions[item.name], item)
      )
    })
    const itemRefs = ref<any>({})
    onBeforeUpdate(() => {
      itemRefs.value = {}
    })

    function getItemRef(name: string) {
      return itemRefs.value[name]
    }

    function toggle(name: string | string[], visible: boolean) {
      const names = typeof name === 'string' ? [name] : name
      names.forEach(name => {
        const item = itemOptions[name] || {}
        item.hide = !visible
        itemOptions[name] = item
      })
    }

    function show(name: string | string[]) {
      toggle(name, true)
    }

    function hide(name: string | string[]) {
      toggle(name, false)
    }

    function showAll() {
      const hideItemNames = items.value
        .filter(item => item.hide)
        .map(item => item.name)
      show(hideItemNames)
    }

    function resetFields(...args) {
      formExpose.resetFields?.(...args)
      items.value.forEach(item => {
        if (item.names) {
          item.names.forEach(name => unset(model.value, name))
        }
        if (item.type === 'multipleselect') {
          unset(model.value, item.name)
        } else if (item.type === 'optioninput' && Array.isArray(item.options)) {
          const names =
            item.options?.reduce((arr: string[], row) => {
              return [...arr, ...(row.names ? row.names : [row.name])]
            }, []) || []
          names.forEach(name => unset(model.value, name))
        }
      })
    }

    expose({
      ...formExpose,
      validate,
      validateFields,
      resetFields,
      getItemRef,
      show,
      hide,
      showAll,
      reset: resetFields,
      getItemSpan: (span: number) => {
        if (props.vertical) {
          return 24
        }
        return calcSpan(span)
      }
    })

    return () => {
      const formProps = slots.default
        ? { ...attrs }
        : {
            layout: layout.value === 'vertical' ? layout.value : 'horizontal',
            model: model.value,
            ...attrs
          }
      return (
        <a-form
          ref={formRef}
          labelCol={
            layout.value !== 'vertical'
              ? {
                  style: {
                    width: props.labelWidth,
                    display: props.noLabel ? 'none' : void 0
                  }
                }
              : void 0
          }
          scrollToFirstError={true}
          {...formProps}
          class={[
            prefixCls,
            attrs.class,
            {
              [`${prefixCls}-no-explain`]: props.noExplain,
              [`${prefixCls}-detail`]: props.detail,
              [`${prefixCls}-compact`]: props.compact
            }
          ]}
          name={name.value}
          layout={layout.value}
          v-slots={{
            default: () =>
              slots.default?.() || (
                <>
                  <y-row gutter={props.gutter || 16}>
                    {items.value.map(item => {
                      const { hide, row, newline, span, ...restItem } = item
                      return (
                        hide || (
                          <>
                            {row && <a-col span={24} />}
                            <y-col span={getSpan(span)}>
                              <y-form-item
                                ref={el => {
                                  if (el) itemRefs.value[item.name] = el
                                }}
                                disabled={props.disabled}
                                readonly={props.readonly}
                                {...restItem}
                                v-slots={{
                                  label: slots[`label-${item.name}`],
                                  default: slots[`item-${item.name}`],
                                  ...filterSlots(
                                    `item-${item.name}-`,
                                    slots,
                                    (_, matchKey) => `item-${matchKey}`
                                  )
                                }}
                              />
                            </y-col>
                            {(row || newline || props.vertical) && (
                              <a-col span={24} />
                            )}
                          </>
                        )
                      )
                    })}
                  </y-row>
                  <y-row>
                    {slots.footer?.() ||
                      (slots.action && (
                        <div class="action_box">
                          <y-form-item
                            colon={false}
                            label={items.value.length > 0 && ' '}
                            {...props.actionFormItemProps}
                          >
                            <div>
                              <y-space
                                v-slots={{
                                  default: slots.action
                                }}
                              ></y-space>
                            </div>
                          </y-form-item>
                          {slots.extraAction?.()}
                        </div>
                      ))}
                  </y-row>
                </>
              )
          }}
        />
      )
    }
  }
})

export type FormProps = PropsType<typeof Form> & PropsType<AFormProps>
export type FormExpose = AFormExpose & {
  getItemRef: (name: string) => any
  show: (name: string | string[]) => void
  hide: (name: string | string[]) => void
  showAll: () => void
  reset: AFormExpose['resetFields']
  getItemSpan: (span: number) => number
}
export type FormSlots = Readonly<
  DefaultSlots & {
    footer?(): VNode[]
    action?(): VNode[]
    extraAction?(): VNode[]
    [key: `item-${string}` | `label-${string}`]: () => VNode[]
  }
>

export default Form as GlobalComponentConstructor<FormProps, FormSlots>
