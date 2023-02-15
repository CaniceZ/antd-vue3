// @ts-ignore
import { http } from '@ygp/ygp-design-vue/http'

// 银行分页
export function bankPage(params: any) {
  return http.get({
    url: '/pay/king/pay/bankcode/page',
    params
  })
}

// 用户列表
export function userList(data: any) {
  return http.post({
    url: '/uc/ucqyuser/list',
    data
  })
}
