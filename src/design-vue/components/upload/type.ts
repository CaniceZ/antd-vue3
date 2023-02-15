import { FileType } from 'ant-design-vue/lib/upload/interface'
import { VNode } from 'vue'
import { DefaultSlots } from '../../types/vue'

// 补充 a-upload 的 slots 类型
export type AUploadSlots = Readonly<
  DefaultSlots & {
    iconRender?(): VNode[]
    actionIconRender?(): VNode[]
    itemRender?(): VNode[]
    previewIcon?(): VNode[]
    removeIcon?(): VNode[]
    downloadIcon?(): VNode[]
  }
>

// 补充 a-upload 的 expose 类型
export type AUploadExpose = {
  onBatchStart(batchFileInfoList: any[]): any
  onSuccess(response: any, file: FileType, xhr: any): any
  onProgress(e: { percent: number }, file: FileType): any
  onError(error: Error, response: any, file: FileType): any
  fileList: any[]
  upload(...args: any): any
}
