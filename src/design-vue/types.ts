// import type { Axios } from 'axios'

import { VNode } from 'vue'

type UploadOptions = {
  getTokens?: Function
  getUrls?: Function
  categoryCode?: string
  fieldMap?: object
}

// 关键词解密方法
// 解密接口服务前缀
type keywordDecryptApi = (
  data: { cipherText: string; text: string },
  apiPrefix?: string
) => Promise<string>

export type YgpdProps = {
  // http?: Axios
  antConfig?: {
    locale?: any
    [key: string]: any
  }
  page?: any
  appConfig?: {
    appName?: string
    userCode?: string
    tableSticky?:
      | boolean
      | {
          offsetHeader?: number
          offsetScroll?: number
        }
    searchTableSticky?:
      | boolean
      | {
          offsetHeader?: number
          offsetScroll?: number
        }
    uploadOptions?: UploadOptions
    keywordDecryptApi?: keywordDecryptApi
    selectProps?: {
      suffixIcon?: VNode | VNode[]
    }
    tableProps?: {
      emptyCell?: VNode | VNode[] | string
      userCode?: string
    }
  }
  [key: string]: any
}
