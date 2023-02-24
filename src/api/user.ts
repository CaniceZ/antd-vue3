import request from '../utils/http'

// 登录
export const doLogin = data => {
  return request({
    // baseURL: getBaseURL().url,
    url: '/uc/login/adminLogin',
    method: 'POST',
    data: data
  })
}

// 登出
export const doLogout = () => {
  return request({
    // baseURL: getBaseURL().url,
    url: '/uc/login/logout',
    method: 'GET'
  })
}

// 获取路由权限
export const routerInfo = data => {
  return request({
    // baseURL: getBaseURL().url,
    url: '/uc/ucuser/getCurrentMenuList/9',
    method: 'GET',
    params: data
  })
}
