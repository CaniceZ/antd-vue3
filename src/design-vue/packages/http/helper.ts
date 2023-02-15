import { isObject, isString, downloadByData } from './utils'
import { Message } from '../../'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'

export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T
): T extends true ? string : object

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {}
  }
  const now = new Date().getTime()
  if (restful) {
    return `?_t=${now}`
  }
  return { _t: now }
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return
  }

  for (const key in params) {
    if (params[key] && params[key]._isAMomentObject) {
      params[key] = params[key].format(DATE_TIME_FORMAT)
    }
    if (isString(key)) {
      const value = params[key]
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value
        } catch (error) {
          throw new Error(error)
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key])
    }
  }
}

/**
 * @description: blob文件导出结果处理
 */
export function dealExportBlob(res, exportBlob) {
  const params = exportBlob || {}
  if (res.status == 200) {
    if (res.headers && res.headers['content-disposition']) {
      Message.success(params.msg || '导出成功！')
      downloadByData(
        res.data,
        params.filename || '导出文件',
        params.type || 'application/vnd.ms-excel;charset=UTF-8'
      )
    } else {
      const reader = new FileReader()
      reader.readAsText(res.data, 'utf-8')
      reader.onload = () => {
        if (reader.result) {
          // @ts-ignore
          res.data = JSON.parse(reader.result)
          Message.error(res.data.msg || '导出失败！')
        }
      }
    }
  } else {
    Message.error('导出失败！')
  }
  return res
}
