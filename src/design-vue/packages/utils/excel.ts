import { Message, Modal, YImportResultModal } from '../../'

/**
 * 导入文件
 * @param params
 * @param callback
 * @returns Promise
 */
export const importFile = async (params: {
  file: File | any
  title: string
  getBatchNumber: Function
  getImportResult: Function
  wrapCount?: number
  extraData?: Object
  templateCode?: string
  resultProps?: any
  resultSlots?: any
}) => {
  const {
    file,
    getBatchNumber,
    getImportResult,
    title,
    extraData,
    templateCode,
    resultProps,
    resultSlots,
    wrapCount
  } = params

  const formData = new FormData()
  formData.append('file', file)
  templateCode && formData.append('templateCode', templateCode) // 模板编码

  if (extraData) {
    Object.keys(extraData).forEach(key => {
      formData.append(key, extraData![key])
    })
  }

  const res: any = await getBatchNumber(formData)
  return new Promise((resolve, reject) => {
    const batchNumber = res?.batchNumber || res
    if (batchNumber) {
      Message.success('上传成功，稍后通知您导入结果!')
      importResultPolling({
        resultProps,
        resultSlots,
        getImportResult,
        batchNumber,
        title,
        wrapCount,
        doneCallback: () => {
          resolve(params)
        },
        timeoutCallback: () => {
          reject()
        }
      })
    } else {
      Message.error('上传失败，请稍后重试')
      reject()
    }
  })
}

/**
 * 导入结果轮询
 * @param params 轮询的请求参数
 * @param callback 成功回调
 */
export const importResultPolling = (params: {
  title: String
  batchNumber: string
  getImportResult: Function
  resultProps?: any
  resultSlots?: any
  wrapCount?: number
  doneCallback?: (...args: any) => void
  timeoutCallback?: (...args: any) => void
}) => {
  const {
    wrapCount,
    batchNumber,
    title,
    doneCallback,
    timeoutCallback,
    resultProps,
    resultSlots,
    getImportResult
  } = params
  if (!batchNumber) return
  function run(count = 1) {
    setTimeout(() => {
      let params = { batchNumber }
      if (resultProps?.extraData) {
        params = { ...params, ...resultProps.extraData }
      }
      const typeMap = resultProps?.typeMap
      getImportResult(params).then(
        res => {
          if (resultProps?.isPms) {
            // pms特殊导入结果处理
            if (res && res.id) {
              if (!resultProps?.hideModal) {
                Modal.create(YImportResultModal, {
                  list: [res],
                  typeMap,
                  importBizSet: [resultProps.importBiz],
                  title,
                  ...(resultProps || {})
                })
              }
              doneCallback?.({ res, typeMap, title })
            } else {
              if (count < (wrapCount || 20)) {
                run(++count)
              } else {
                Message.error('稍后请在最近导入结果中查看')
                timeoutCallback?.()
              }
            }
          } else {
            // excel通用
            const { status, msg } = res
            if (status === 4) {
              if (count < (wrapCount || 20)) {
                run(++count)
              } else {
                Message.error(msg || '稍后请在最近导入结果中查看')
                timeoutCallback?.()
              }
            } else {
              if (resultProps?.callback) {
                resultProps.callback(res)
              } else {
                if (!resultProps?.hideModal) {
                  Modal.create(
                    YImportResultModal,
                    {
                      title,
                      list: [res],
                      ...(resultProps || {})
                    },
                    resultSlots || {}
                  )
                }
                doneCallback?.({ res, typeMap, title })
              }
            }
          }
        },
        err => {
          Message.error(err?.msg || '上传失败，请稍后重试')
        }
      )
    }, 3000)
  }
  run()
}

// pms导出结果轮询
export const pmsExportPolling = (option: {
  batchNumber: string
  exportBiz: String
  userCode: String
  getPmsExportDetail: Function
  timeout?: (...args: any) => void
  done?: (...args: any) => void
  error?: (...args: any) => void
}) => {
  const {
    batchNumber,
    exportBiz,
    userCode,
    getPmsExportDetail,
    timeout,
    done,
    error
  } = option
  if (!batchNumber) return
  const params = {
    batchNumber: batchNumber,
    exportBiz,
    userCode
  }
  function run(count = 1) {
    setTimeout(() => {
      getPmsExportDetail(params).then(
        res => {
          const { code, data, msg } = res
          if (code === 0) {
            if (data && data.list.length > 0) {
              done?.(data)
              data.list &&
                data.list.forEach(item => {
                  if (item.excelUrl) {
                    window.location.href = item.excelUrl
                  } else {
                    Message.error(item.msg)
                  }
                })
            } else {
              if (count < 40) {
                run(++count)
              } else {
                Message.error('导出超时，请重新导出')
                timeout?.()
              }
            }
          } else {
            Message.error(msg)
            error?.()
          }
        },
        () => {
          error?.()
        }
      )
    }, 3000)
  }
  run()
}
