import request from '../utils/http'

//
export const creditmanagementPage = (data: any) => {
  return request({
    url: '/uc/login/adminLogin',
    method: 'POST',
    data
  })
}
