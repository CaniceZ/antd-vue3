import { Component, VNode } from 'vue'
import {
  FormItemProps as AFormItemProps,
  FormItemRest as AFormItemRest
} from 'ant-design-vue'
import { TooltipProps } from '../tooltip/Tooltip'
import { DefaultSlots } from '../../types/vue'
import { PropsType } from '../../types/ts-helpers'

export type NewTooltipProps = TooltipProps & { icon?: string | VNode }

export type FormItemType =
  | 'input'
  | 'search'
  | 'textarea'
  | 'password'
  | 'number'
  | 'autocomplete'
  | 'date'
  | 'daterange'
  | 'datetime'
  | 'datetimerange'
  | 'datetimerange2'
  | 'week'
  | 'weekrange'
  | 'month'
  | 'monthrange'
  | 'year'
  | 'yearrange'
  | 'quarter'
  | 'quarterrange'
  | 'time'
  | 'timerange'
  | 'cascader'
  | 'select'
  | 'multipleselect'
  | 'checkbox'
  | 'radio'
  | 'optioninput'
  | 'switch'
  | 'upload'

export interface FormItem {
  name: string
  names?: string[]
  class?: any
  style?: any
  type?: FormItemType | ((...args: any) => FormItemType)
  label?: string
  labelWidth?: string
  labelAlign?: AFormItemProps['labelAlign']
  extra?: string
  required?: boolean
  disabled?: boolean | ((...args: any) => boolean)
  readonly?: boolean
  span?: number
  offset?: number
  row?: boolean
  newline?: boolean
  placeholder?: string | string[]
  autofocus?: boolean
  component?: Component
  rules?: AFormItemProps['rules']
  hide?: boolean
  loading?: boolean
  dicName?: string
  options?:
    | {
        name?: string
        type?: string | number
        [key: string]: any
      }[]
    | any[]
    | ((...args: any) => any[])
  maxlength?: number
  componentProps?: { [key: string]: any }
  defaultValue?: any | any[]
  onChange?: (...args: any[]) => void
  propMap?:
    | {
        label?: string
        value?: string
        children?: string
      }
    | {
        [key: string]: string
      }
  allowClear?: boolean
  labelTip?: string | NewTooltipProps
  tip?: string | NewTooltipProps
  detail?: boolean
  listType?: string
  // 解密接口服务前缀
  decryptApiPrefix?: string
  customRender?: (params: { text: any; model: any; item: any }) => void
  noLabel?: boolean
  requiredMsg?: string
}

// 补充 a-form-item-rest 的 slots 类型
export type AFormItemRestSlots = Readonly<DefaultSlots>

// 补充 a-form-item-rest 的 props 类型
export type AFormItemRestProps = PropsType<typeof AFormItemRest>
