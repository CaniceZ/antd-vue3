import { FormItemProps as AFormItemProps } from 'ant-design-vue'
import {
  computed,
  defineComponent,
  h,
  inject,
  onMounted,
  ref,
  resolveComponent,
  watch,
  VNode
} from 'vue'
import { FormItemType, FormItem as IFormItem, NewTooltipProps } from './types'
import { RuleObject } from 'ant-design-vue/lib/form'
import { FormKey } from './common'
import {
  filterSlots,
  getComponent,
  getPrefix,
  isEmpty,
  parseAttr
} from '../../_utils/common'
import OptionInput from '../option-input'
import {
  getCiphertext,
  getCiphertextField,
  isCiphertext,
  omit
} from '../../packages//utils'
import CipherText from '../ciphertext'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { DefaultSlots } from '../../types/vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

type Noop<T = any> = (...args: any) => T

const [prefixName, prefixCls] = getPrefix('form-item')

const FormItem = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  setup(_, { attrs, slots, expose }) {
    let itemRef = $ref<any>()
    expose({
      item: $$(itemRef)
    })
    const {
      detail,
      model,
      getValue,
      setValue,
      inputDefaultPlaceholder,
      decryptApiPrefix
    } = inject(FormKey) as any

    const errorMsg = ref('')

    const isDetail = computed(() =>
      'detail' in attrs ? parseAttr(attrs['detail']) : detail.value
    )

    const isOptionInput = computed(() => attrs['type'] === 'optioninput')
    const optionInput = ref()
    const optionInputOpt = computed(() => {
      if (isOptionInput.value) {
        const options = (attrs['options'] as any[]) || []
        const opt = options.find(opt => opt.name === optionInput.value)
        if (opt) {
          return omit(opt, ['type', 'label'])
        } else {
          return void 0
        }
      } else {
        return void 0
      }
    })

    watch(optionInputOpt, (newOpt, oldOpt) => {
      if (compProps.value['keep'] === true && newOpt && oldOpt) {
        const val = getValue(oldOpt['names'] || oldOpt['name'])
        setValue(oldOpt['names'] || oldOpt['name'], void 0)
        setValue(newOpt['names'] || newOpt['name'], val)
      }
    })

    const itemProps = computed(() => {
      return {
        name: attrs['name'] as string,
        names: attrs['names'] as string[],
        defaultValue: attrs['defaultValue'] || attrs['default-value'],
        required: parseAttr(attrs['required']) as boolean,
        trigger: (attrs['trigger'] as 'change' | 'blur') || 'change',
        label: (attrs['label'] as string)?.trim(),
        rules: (attrs['rules'] as any[]) || [],
        colon: attrs['colon'] as string,
        extra: attrs['extra'] as string,
        help: attrs['help'] as string,
        noLabel: parseAttr(attrs['noLabel'] || attrs['no-label']) as boolean,
        labelTip: (attrs['labelTip'] || attrs['label-tip']) as
          | string
          | NewTooltipProps,
        tip: attrs['tip'] as string | NewTooltipProps,
        labelWidth: (attrs['labelWidth'] || attrs['label-width']) as string,
        labelAlign: (attrs['labelAlign'] || attrs['label-align']) as string,
        autoLink: (attrs['autoLink'] || attrs['auto-link']) as boolean,
        validateTrigger: (attrs['validateTrigger'] ||
          attrs['validate-trigger']) as string | string[],
        decryptApiPrefix:
          attrs['decryptApiPrefix'] || (attrs['decrypt-api-prefix'] as string),
        class: attrs['class'],
        style: attrs['style'],
        requiredMsg: (attrs['requiredMsg'] || attrs['required-msg']) as string,
        ...(optionInputOpt.value || {}),
        customRender: (attrs['customRender'] ||
          attrs['custom-render']) as IFormItem['customRender']
      }
    })

    const compProps = computed(() => {
      return {
        type: attrs['type'] as FormItemType | Noop<FormItemType>,
        allowClear:
          'allowClear' in attrs
            ? parseAttr(attrs['allowClear'], true)
            : parseAttr(attrs['allow-clear'], true),
        placeholder: attrs['placeholder'] as string | [string, string],
        autofocus: parseAttr(attrs['autofocus']) as boolean,
        disabled: parseAttr(attrs['disabled']) as boolean | Noop<boolean>,
        readonly: parseAttr(attrs['readonly']) as boolean,
        maxlength: parseAttr(attrs['maxlength']) as number,
        options: parseAttr(attrs['options']) as any[] | Noop<any[]>,
        loading: parseAttr(attrs['loading']) as boolean,
        propMap: parseAttr(attrs['propMap'] || attrs['prop-map']) as object,
        listType: parseAttr(attrs['listType'] || attrs['list-type']) as string,
        onChange: attrs['onChange'] as (...args: any) => void,
        ...((attrs['componentProps'] as object) ||
          (attrs['component-props'] as object) ||
          {})
      }
    })

    const value = computed(() => {
      const { name, names } = itemProps.value
      return getValue(names || name)
    })

    function wrapperValidator(fn: (...args: any) => Promise<any>) {
      return async function (rule: RuleObject, _value: any, ...args: any) {
        try {
          errorMsg.value = ''
          let val = value.value
          if (Array.isArray(val) && val.every(val => val === void 0)) {
            val = void 0
          }
          const res = await fn(rule, val, ...args)
          return Promise.resolve(res)
        } catch (err) {
          errorMsg.value = err
          return Promise.reject(err)
        }
      }
    }

    const rules = computed(() => {
      const { required, rules, names, label, trigger, requiredMsg } =
        itemProps.value
      const { type: compType } = compProps.value
      let type
      if (typeof compType === 'function') {
        type = compType({
          model: model.value,
          item: {
            ...itemProps.value,
            ...compProps.value
          }
        })
      } else {
        type = compType
      }
      const newRules = [
        ...rules.map(row => ({
          ...row,
          validator:
            typeof row.validator === 'function'
              ? wrapperValidator(row.validator)
              : void 0
        }))
      ]
      if (required && newRules.every(rule => !rule.required)) {
        let msgPrefix = '请输入'
        if (
          [
            'checkbox',
            'radio',
            'select',
            'multipleselect',
            'date',
            'daterange',
            'datetime',
            'datetimerange',
            'time',
            'timerange',
            'month',
            'monthrange',
            'week',
            'weekrange',
            'year',
            'yearrange',
            'quarter',
            'quarterrange',
            'datetimerange2',
            'cascader'
          ].includes(type)
        ) {
          msgPrefix = '请选择'
        } else if (type === 'upload') {
          msgPrefix = '请上传'
        }
        newRules.unshift({
          required: true,
          trigger,
          validator: wrapperValidator(
            async (_rule: RuleObject, _value: string | number | Date | any) => {
              if (
                (names && value.value.some(isEmpty)) ||
                isEmpty(value.value)
              ) {
                return Promise.reject(requiredMsg || `${msgPrefix}${label}`)
              }
              return Promise.resolve()
            }
          )
        })
      }
      return newRules
    })

    onMounted(() => {
      const { name, names, defaultValue } = itemProps.value
      if (defaultValue) {
        setValue(names || name, defaultValue)
      }
    })

    return () => {
      const { label: labelSlot, default: slotDefault, ...restSlots } = slots
      const {
        names,
        name,
        label,
        colon,
        noLabel,
        labelTip,
        tip,
        labelWidth,
        customRender,
        ...restItemProps
      } = itemProps.value
      const { type: compType, listType, ...restCompProps } = compProps.value
      return (
        <a-form-item
          class={[prefixCls, restItemProps.class]}
          labelCol={
            label === void 0 || noLabel
              ? { style: { width: '0px' } }
              : labelWidth
              ? { style: { width: labelWidth } }
              : void 0
          }
          {...omit(restItemProps, ['class'])}
          name={name}
          colon={noLabel || !label ? false : colon}
          rules={rules.value}
          v-slots={{
            label: () => {
              let children
              if (noLabel) {
                children = void 0
              } else if (labelSlot) {
                children = labelSlot?.({
                  label,
                  item: {
                    ...itemProps.value,
                    ...compProps.value
                  }
                })
              } else if (label === '') {
                children = ' '
              } else {
                children = label
              }
              return (
                <span>
                  {children}
                  {labelTip && (
                    <y-tooltip
                      {...(typeof labelTip === 'string'
                        ? { title: labelTip }
                        : labelTip)}
                    >
                      <span style="margin-left: 3px;">
                        {typeof labelTip === 'object' && labelTip.icon ? (
                          h(
                            typeof labelTip.icon === 'string'
                              ? resolveComponent(labelTip.icon)
                              : labelTip.icon
                          )
                        ) : (
                          <QuestionCircleOutlined />
                        )}
                      </span>
                    </y-tooltip>
                  )}
                </span>
              )
            },
            default: () => {
              let children
              const setVal = val => setValue(names || name, val)
              let disabled
              if (typeof restCompProps.disabled === 'function') {
                disabled = restCompProps.disabled({
                  model: model.value,
                  item: {
                    ...itemProps.value,
                    ...compProps.value
                  }
                })
              } else {
                disabled = restCompProps.disabled
              }
              let options
              if (typeof restCompProps.options === 'function') {
                options = restCompProps.options({
                  model: model.value,
                  item: {
                    ...itemProps.value,
                    ...compProps.value
                  }
                })
              } else {
                options = restCompProps.options || []
              }
              let type: FormItemType
              if (typeof compType === 'function') {
                type =
                  compType({
                    model: model.value,
                    item: {
                      ...itemProps.value,
                      ...compProps.value
                    }
                  }) || 'input'
              } else {
                type = compType || 'input'
              }
              const componentProps = {
                ...restCompProps,
                disabled,
                options,
                type,
                listType: listType || 'link', // 默认link样式
                readonly: isDetail.value || restCompProps.readonly,
                modelValue: value.value,
                placeholder:
                  restCompProps.placeholder ||
                  (inputDefaultPlaceholder.value === true &&
                  [
                    'input',
                    'number',
                    'search',
                    'textarea',
                    'autocomplete',
                    'password'
                  ].includes(type)
                    ? '请输入'
                    : void 0),
                'onUpdate:modelValue': setVal
              }
              // 生成表单子项内容
              if (slotDefault) {
                children = slotDefault?.({
                  item: {
                    ...itemProps.value
                  },
                  props: componentProps,
                  detail: isDetail.value
                })
              } else if (isDetail.value && customRender) {
                children = customRender({
                  text: value.value,
                  item: { ...itemProps.value },
                  model: model.value
                })
              } else if (
                isDetail.value &&
                !['radio', 'checkbox', 'upload'].includes(type)
              ) {
                const propMap = {
                  label: 'name',
                  value: 'type',
                  children: 'children',
                  ...(restCompProps.propMap || {})
                }
                // 详情，显示静态内容
                // TODO 还需要补充 cascader 相关类型的静态显示
                if (type === 'multipleselect' && Array.isArray(value.value)) {
                  children = value.value
                    .map(val => {
                      const opt = options.find(
                        row => row[propMap.value] === val
                      )
                      if (opt) {
                        return <y-tag label={opt[propMap.label]} />
                      }
                      return void 0
                    })
                    .filter(Boolean)
                } else if (type === 'select') {
                  children =
                    options.find(row => row[propMap.value] === value.value)?.[
                      propMap.label
                    ] || '-'
                } else if (
                  (type.endsWith('range') || type.endsWith('range2')) &&
                  Array.isArray(value.value)
                ) {
                  children =
                    value.value[0] || value.value[1]
                      ? `${value.value[0]} ~ ${value.value[1]}`
                      : '-'
                  // } else if (isCiphertext(model.value, name)) {
                  //   children = (
                  //     <CipherText
                  //       {...getCiphertext(model.value, name)}
                  //       onDecrypt={(val) => {
                  //         setVal(val)
                  //         setValue(getCiphertextField(name), val)
                  //       }}
                  //     />
                  //   )
                } else {
                  children =
                    value.value || value.value === 0 ? value.value : '-'
                }
              } else if (isOptionInput.value) {
                children = (
                  <a-form-item-rest>
                    <OptionInput
                      onUpdate:selected={val => (optionInput.value = val)}
                      {...componentProps}
                    />
                  </a-form-item-rest>
                )
              } else {
                const Component = resolveComponent(
                  getComponent(type, Boolean(restCompProps.options))
                ) as string
                children = h(
                  Component,
                  {
                    ref: el => {
                      if (el) {
                        itemRef = el
                      }
                    },
                    ...componentProps
                  },
                  filterSlots('item-', restSlots)
                )
              }
              // 判断是否脱敏字段
              if (
                !slotDefault &&
                getComponent(type, Boolean(restCompProps.options)) ===
                  'y-input' &&
                isCiphertext(model.value, name)
              ) {
                const temp = children
                children = (
                  <CipherText
                    {...getCiphertext(model.value, name)}
                    decryptApiPrefix={
                      itemProps.value.decryptApiPrefix || decryptApiPrefix.value
                    }
                    onDecrypt={val => {
                      setVal(val)
                      setValue(getCiphertextField(name), void 0)
                    }}
                    v-slots={{
                      default: isDetail.value ? void 0 : () => temp
                    }}
                  />
                )
              }
              if (tip) {
                return (
                  <y-tooltip
                    {...(typeof tip === 'string' ? { title: tip } : tip)}
                  >
                    {disabled ? <div>{children}</div> : children}
                  </y-tooltip>
                )
              } else {
                return children
              }
              // if (errorMsg.value) {
              //   return <y-tooltip title={errorMsg.value}>{children}</y-tooltip>
              // } else {
              //   return children
              // }
            }
          }}
        />
      )
    }
  }
})

export type FormItemProps = PropsType<typeof FormItem> &
  PropsType<AFormItemProps>
export type FormItemExpose = {}
export type FormItemSlots = Readonly<
  DefaultSlots & {
    label?(): VNode[]
    [key: `item-${string}`]: () => VNode[]
  }
>

export default FormItem as GlobalComponentConstructor<
  FormItemProps,
  FormItemSlots
>
