import axios, { AxiosResponse } from 'axios'
// import store from '../store'
// import { router } from '@/router'
// import { getLocalToken } from '@/utils/auth.js'
import { message } from 'ant-design-vue';
const service = axios.create({
  timeout: 10000,
  baseURL: (import.meta.env.VITE_BASE_API || '/api') as string,
});
service.interceptors.request.use(
  config => {
    // store.state.loading = true
    // let token = getLocalToken() || ''

    // if (token) {
      // config.headers.common['token'] = token
    // }
    return config
  },
  error => {
    // do something with request error
    // store.state.loading = false //loading加载动画关闭
    // for debug
    return Promise.reject(error)
  }
)

const showTip = (tip:string) => {
  message.warning(tip || '请求出错啦')
}

const handleResponse = (response: AxiosResponse<any, any>) => {
  const code = parseInt(response.data && response.data.code)
  // 没有对请求文件流做错误处理
  if (code !== 0 && response.config.responseType !== 'blob') {
    // msg为服务端返回的错误信息，字段名自定义，此处以msg为例
    let message = (response.data || {}).data || (response.data || {}).msg

    switch (code) {
      case 400:
        break
      case 401:
        showTip(message)
        //store.commit('clear_token') //清token
        // 为了重新实例化vue-router对象 避免bug
        if (location.pathname.indexOf('/login') === -1) {
          // router.push({
          //   path: '/login'
          // })
        }
        break
      case 4001:
        // if (process.server) return
        message = message || '登录设备数量超出限制'
        // store.commit('savehttpResult', { res: response.data })
        break
      case 403:
        message = message || '未登录'
        break
      case 404:
        message = message || '请求地址错误'
        break
      case 412:
        message = message || '未找到有效session'
        break
      default:
        // message = message || err.response.data.msg
        break
    }
    console.log(response.config)
    // if (!response.config.noTip) showTip(message)
    // return {
    //   code,
    //   message
    // }
  }
  const status = response.status
  // 如果http响应状态码response.status正常，则直接返回数据
  if ((status >= 200 && status <= 300) || status === 304) {
    // 保证文件流输出完全
    if (response.config.responseType === 'blob') {
      return response
    } else {
      return response.data
    }
  }
}

const handleError = (err: { message?: any; response: any; }) => {
  const { response } = err

  if (!response.status) {
    err.message = '有response但没有response.status的情况'
  }
  switch (response.status) {
    case 200:
      err.message = '错误响应也会有状态码为200的情况'
      break
    case 400:
      err.message = '请求错误(400)'
      break
    case 401:
      err.message = '您没有此功能权限，如需开通，请联系管理员。'
      break
    case 403:
      err.message = '登陆过期，请重新登录(403)';
      var fullPath = location.pathname + location.search
      // router.push({
      //   path: `/login?redirect=${window.__POWERED_BY_QIANKUN__ ? fullPath : fullPath.replace('/bciscmAssets', '')}`,
      // });
      break
    case 404:
      err.message = '请求错误,未找到该资源(404)'
      break
    case 408:
      err.message = '请求超时(408)'
      break
    case 500:
      err.message = '服务器错误(500)'
      break
    case 501:
      err.message = '服务未实现(501)'
      break
    case 502:
      err.message = '网络错误(502)'
      break
    case 503:
      err.message = '服务不可用(503)'
      break
    case 504:
      err.message = '网络超时(504)'
      break
    case 505:
      err.message = 'HTTP版本不受支持(505)'
      break
    default:
      err.message = `连接出错，状态码：(${err.response.status})!`
  }
  return err
}

service.interceptors.response.use(
  response => {
    // store.state.loading = false
    return Promise.resolve(handleResponse(response))
  },
  err => {
    // store.state.loading = false

    if (!err) return Promise.reject(err)

    if (err.response) {
      err = handleError(err)
    }
    // 没有response(没有状态码)的情况
    // eg: 超时；断网；请求重复被取消；主动取消请求；
    else {
      // 错误信息err传入isCancel方法，可以判断请求是否被取消
      if (axios.isCancel(err)) {
        throw new axios.Cancel(err.message)
      } else if (err.stack && err.stack.includes('timeout')) {
        err.message = '请求超时!'
      } else {
        err.message = '连接服务器失败!'
      }
    }
    showTip(err.message)
    return Promise.reject(err)
  }
)

export default service
