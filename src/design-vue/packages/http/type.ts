export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

declare global {
  type Recordable<T = any> = Record<string, T>
}

export interface ExportBlob {
  filename?: string
  type?: string
  msg?: string
}

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean
  // Format request parameter time
  formatDate?: boolean
  // Whether to process the request result
  isTransformResponse?: boolean
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean
  // 导出流文件
  exportBlob?: boolean | ExportBlob
  // Whether to join url
  joinPrefix?: boolean
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode
  // Whether to add a timestamp
  joinTime?: boolean
  ignoreCancelToken?: boolean
  // 取消单个请求
  cancelToken?: any
  // Whether to send token in header
  withToken?: boolean
}

export interface Result<T = any> {
  code: number
  errCode?: number
  msg: string
  data: T
  succeed?: boolean
  failed?: boolean
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable
  // File parameter interface field name
  name?: string
  // file name
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}
