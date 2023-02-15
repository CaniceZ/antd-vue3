import type { ErrorMessageMode } from './type'
import { useGlobalConfig, Message, Modal } from '../../'
// import { useUserStoreWithOut } from '/@/store/modules/user'

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message'
): void {
  const globalConfig = useGlobalConfig()
  const httpConfig = globalConfig.httpConfig || {}
  // const userStore = useUserStoreWithOut()
  let errMessage = ''

  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    // 401: 无接口权限
    case 401:
      errMessage = msg || '没有权限访问'
      break
    // 403 一般为token过期出现
    // 如果未登录，则跳转到登录页面，并携带当前页面的路径
    // 登录成功后，将返回到当前页面
    case 403:
      errMessage = msg || '登录凭证过期，请重新登录'
      // 403，清除token，返回登录页
      httpConfig.timeoutHandle()
      break
    // 404请求不存在
    case 404:
      errMessage = '网络请求错误,未找到该资源!'
      break
    case 405:
      errMessage = '网络请求错误,请求方法未允许!'
      break
    case 408:
      errMessage = '网络请求超时!'
      break
    case 500:
      errMessage = '服务器错误,请联系管理员!'
      break
    case 501:
      errMessage = '网络未实现!'
      break
    case 502:
      errMessage = '网络错误!'
      break
    case 503:
      errMessage = '服务不可用，服务器暂时过载或维护!'
      break
    case 504:
      errMessage = '网络超时!'
      break
    case 505:
      errMessage = 'http版本不支持该请求!'
      break
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      Modal.error({ title: '错误提示', content: errMessage })
    } else if (errorMessageMode === 'message') {
      Message.error(errMessage)
    }
  }
}
