// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动

import type { AxiosResponse } from 'axios'
import type { RequestOptions, Result } from './type'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { VAxios } from './VAxios'
import { checkStatus } from './checkStatus'
import { useGlobalConfig, Message, Modal } from '../../'
import { RequestEnum, ResultEnum } from './httpEnum'
import { isString, setObjToUrlParams, deepMerge } from './utils'
import { joinTimestamp, formatRequestDate, dealExportBlob } from './helper'

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => {
    const globalConfig = useGlobalConfig()
    const httpConfig = globalConfig.httpConfig || {}
    const { isTransformResponse, isReturnNativeResponse, exportBlob } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }

    // 导出blob文件的统一处理
    if (exportBlob) {
      return dealExportBlob(res, exportBlob)
    }

    if (!isTransformResponse) {
      return res.data
    }
    // 错误的时候返回
    const { data } = res
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error('请求出错，请稍候重试')
    }
    //  这里 code，data，msg 为后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data: result, msg } = data
    if (code === 0) {
      return result
    }

    let timeoutMsg = ''
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = '登录超时,请重新登录!'
        // 登录超时后的处理，清除token，返回登录页
        httpConfig.timeoutHandle()
        break
      default:
        if (msg) {
          timeoutMsg = msg
        }
    }

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMessageMode === 'modal') {
      Modal.error({ title: '错误提示', content: timeoutMsg })
    } else if (options.errorMessageMode === 'message') {
      Message.error(timeoutMsg)
    }

    throw new Error(timeoutMsg || '请求出错，请稍候重试')
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const globalConfig = useGlobalConfig()
    const httpConfig = globalConfig.httpConfig || {}
    const {
      apiUrl = httpConfig.apiUrl,
      joinPrefix,
      joinParamsToUrl,
      formatDate,
      joinTime = true,
      urlPrefix = httpConfig.urlPrefix || ''
    } = options

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false)
        )
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          Object.keys(config.data).length > 0
        ) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: config => {
    const globalConfig = useGlobalConfig()
    const httpConfig = globalConfig.httpConfig || {}
    // 请求之前处理config
    const requestOptions = (config as Recordable)?.requestOptions
    // token 改从global Config里获取
    let token = httpConfig.token
    if (typeof token === 'function') {
      token = token()
    }
    if (token && requestOptions?.withToken !== false) {
      ;(config as Recordable).headers.token = token
    }
    if (requestOptions?.cancelToken) {
      config.cancelToken = requestOptions.cancelToken
    }
    // console.log('config', config, options);
    return config
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message, config } = error || {}
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
    const msg: string = response?.data?.msg ?? ''
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = '接口请求超时,请刷新页面重试!'
      }
      if (err?.includes('Network Error')) {
        errMessage = '网络异常，请检查您的网络连接是否正常!'
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          Modal.error({ title: '错误提示', content: errMessage })
        } else if (errorMessageMode === 'message') {
          Message.error(errMessage)
        }
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as unknown as string)
    }

    checkStatus(response?.status, msg, errorMessageMode)
    return Promise.reject(error)
  }
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,

        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
          // 'X-Requested-With': 'XMLHttpRequest',
        },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // 导出文件流
          exportBlob: false,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: void 0,
          // 接口拼接地址
          urlPrefix: void 0,
          // 是否加入时间戳
          joinTime: false,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 取消单个请求
          cancelToken: null,
          // 是否携带token
          withToken: true
        }
      },
      opt || {}
    )
  )
}
export const http = createAxios()
