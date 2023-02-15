import { http } from '../../packages//http'

// 下载ucs配置的模板
export const downloadTemplateFile = params => {
  return http.request({
    url: '/excel/admin/template/downloadTemplate',
    method: 'GET',
    params
  })
}

// 接入excel 服务-导入
export const importExcelFile = params => {
  return http.post({
    url: '/excel/admin/importExcelV2',
    params
  })
}

// 获取导入/导出结果
export const getResult = params => {
  return http.request({
    url: '/excel/admin/getResult',
    method: 'GET',
    params
  })
}

// 获取最后一次导入记录
export const getLatestResult = params => {
  return http.request({
    url: '/excel/admin/getLatestResult',
    method: 'GET',
    params
  })
}
