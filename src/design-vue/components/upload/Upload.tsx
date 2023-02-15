import { ref, reactive, computed, defineComponent } from 'vue'
import { UploadProps as AUploadProps } from 'ant-design-vue'
import { useGlobalConfig } from '../../plugins/global-config/GlobalConfig'
import upload from './request'
import {
  isImageUrl,
  extname,
  imageDimensions,
  isUrl,
  getFileType
} from './utils'
import { buildUUID, getPrefix } from '../../_utils/common'
import {
  UploadOutlined,
  WarningFilled,
  FileFilled,
  PlusOutlined,
  CloseCircleFilled
} from '@ant-design/icons-vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import Message from '../../plugins/message'
import { AUploadExpose, AUploadSlots } from './type'

const [prefixName, prefixCls] = getPrefix('upload')

const Upload = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: 'select'
    },
    accept: {
      type: String
    },
    limit: {
      type: Number
    },
    sizeLimit: {
      type: [String, Number],
      validator: (value: any) => {
        if (typeof value === 'number') return true
        const valid = /(^\d*$)|(.*^\d+[k|m|g][b]$)/i.test(value)
        if (!valid) {
          console.error(
            'please make sure that the sizeLimit prop is valid format. eg: 10kb or 10mb or 10gb or 100'
          )
          return false
        }
        return true
      }
    },
    params: {
      type: Object,
      default: {}
    },
    getTokens: {
      type: Function
    },
    getUrls: {
      type: Function
    },
    categoryCode: {
      type: String
    },
    isPrivate: {
      type: Boolean,
      default: false
    },
    listType: {
      type: String,
      default: 'text'
    },
    // 图片预览方式
    imagePreview: {
      type: String,
      default: 'modal'
    },
    imageSize: {
      type: String,
      default: ''
    },
    customRequest: {
      type: Function
    },
    customFileName: {
      type: Function
    },
    async: {
      type: Boolean,
      default: false
    },
    fieldMap: {
      type: Object
    },
    width: {
      type: String,
      default: '100%'
    },
    showSeq: {
      type: Boolean,
      default: false
    },
    photoPreview: {
      type: [Object, Boolean],
      default: () => {}
    },
    previewMask: {
      type: [Object, Boolean, Function],
      default: () => {}
    }
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { attrs, emit, expose, slots }) {
    const { appConfig: { uploadOptions = {} } = {} } = useGlobalConfig()
    const isInit = ref(true)
    const flag = ref(true)
    const visible = ref(false)
    const image = reactive({
      url: '',
      name: ''
    })

    const pendingFileList = ref<any[]>([])

    const mergeProps = computed(() => ({
      getTokens: props.getTokens || uploadOptions.getTokens,
      getUrls: props.getUrls || uploadOptions.getUrls,
      categoryCode: props.categoryCode || uploadOptions.categoryCode,
      fieldMap: props.fieldMap || uploadOptions.fieldMap
    }))

    const mergeFieldMap = computed(() => ({
      uid: 'id',
      name: 'fileName',
      size: 'fileSize',
      path: 'filePath',
      type: 'fileType',
      width: 'width',
      height: 'height',
      ...mergeProps.value.fieldMap
    }))

    const disabled = computed(
      () => !showUploadList() && props.modelValue.length === props.limit
    )

    const localFileList = computed(() => {
      const { uid, name, path } = mergeFieldMap.value
      const { listType, isPrivate } = props
      const urls: string[] = []
      const _fileList = (props.modelValue || []).map((item: any) => {
        let file = {
          ...item,
          url: item.url || item[path],
          name: item.name || item[name],
          uid: item.uid || item[uid]
        }
        if (isImageStyleList(listType)) {
          if (!file.thumbUrl) {
            if (isPrivate && !isUrl(item[path])) {
              urls.push(item[path])
            } else {
              file.thumbUrl = item[path]
            }
          }
        }
        return file
      })
      // 初始化获取预览图，只会执行一次
      if (urls.length) {
        isInit.value && getThumbUrls(urls)
      }
      return _fileList
    })

    // 加密图片情况，初始化获取预览图，只会执行一次
    const getThumbUrls = async urls => {
      if (!isInit.value) return
      isInit.value = false
      // 砍断链关系
      const newFileList = JSON.parse(JSON.stringify(props.modelValue))
      let res = await getFileUrls(urls.join(','))
      res.forEach((item, index) => {
        newFileList[index].thumbUrl = item
      })
      emit('update:modelValue', newFileList)
    }

    const limitSizeUnit = computed(() => {
      const sizeLimit = props.sizeLimit as string | number
      const units = ['KB', 'MB', 'GB']
      if (typeof sizeLimit === 'number') {
        return null
      }
      const unit = sizeLimit.slice(-2).toLocaleUpperCase()
      return units.includes(unit) ? unit : null
    })

    const unitText = computed(() => {
      return !limitSizeUnit.value ? '字节' : ''
    })

    const limitCond = computed(() => {
      const { limit, modelValue } = props
      const length = modelValue.length
      return !limit || (limit && length < limit)
    })

    const isValidSize = size => {
      const sizeLimit = props.sizeLimit as string | number
      // 如果是数字类型
      if (typeof sizeLimit === 'number') {
        return size <= sizeLimit
      }
      const limit = parseFloat(sizeLimit.slice(0, -2))
      try {
        switch (limitSizeUnit.value) {
          case 'KB':
            return size / 1024 <= limit
          case 'MB':
            return size / 1024 / 1024 <= limit
          case 'GB':
            return size / 1024 / 1024 / 1024 <= limit
          default:
            return size <= parseFloat(sizeLimit)
        }
      } catch (e) {
        console.error(e)
      }
    }

    // 适配form-item传入的type
    const type = computed(() => {
      const { type } = props
      return type === 'select' || type === 'drag' ? type : 'select'
    })

    const onPreview = async file => {
      const { imagePreview, isPrivate } = props
      const { path } = mergeFieldMap.value
      if (!file.url) {
        return
      }
      // 图片弹窗打开，否则下载
      if (isImageUrl(file)) {
        let fileUrl = ''
        if (isPrivate && !isUrl(file[path])) {
          const res = await getFileUrls(file[path])
          fileUrl = res[0]
        } else {
          fileUrl = file.thumbUrl || file[path]
        }
        if (imagePreview === 'modal') {
          image.url = fileUrl
          image.name = file.fileName || file.name
          visible.value = true
        } else {
          window.open(fileUrl)
        }
      } else {
        // todo 下载文件名一致
        if (isPrivate && !isUrl(file[path])) {
          const res = await getFileUrls(file[path])
          window.open(res[0])
        } else {
          window.open(file[path])
        }
      }
    }

    const getFileUrls = async (urls: string): Promise<string[]> => {
      const { categoryCode, getUrls } = mergeProps.value
      if (!getUrls) {
        throw console.error('[props error] The getUrls prop is required!')
      }
      const res = await getUrls({ categoryCode, urls })
      const fileUrls = res.urls
      return Promise.resolve(fileUrls)
    }

    const compListType = () => {
      const { listType } = props
      // 如果是antd内置的样式，则直接返回，否则返回text
      if (listType === 'picture' || listType === 'picture-card') {
        return listType
      }
      return 'text'
    }

    const showUploadList = () => {
      const { readonly } = attrs
      const { listType } = props
      if (listType === 'card' || listType === 'photo') {
        return false
      } else {
        return {
          showRemoveIcon: !readonly
        }
      }
    }

    const isImageStyleList = type => {
      return type === 'picture' || type === 'picture-card' || type === 'photo'
    }

    const getIcon = file => {
      if (file.status === 'error') {
        return <WarningFilled style={{ color: 'red' }} />
      }
      return <FileFilled style={{ color: '#ff6720' }} />
    }
    const handleDel = index => {
      // 同步删除待上传列表
      const item: any = props.modelValue[index]
      const pIndex = pendingFileList.value.findIndex(
        f => f.options.file.uid === item.uid
      )
      if (pIndex) {
        pendingFileList.value.splice(pIndex, 1)
      }
      props.modelValue.splice(index, 1)
    }
    const photoListRenderer = () => {
      const { readonly } = attrs
      return (
        <div class={`${prefixCls}-photo-wrapper`}>
          <a-image-preview-group preview={props.photoPreview}>
            {localFileList.value.map((item, index) => {
              const fileType: string = getFileType(item) || ''
              return (
                <div class={`${prefixCls}-photo-item`}>
                  {item.thumbUrl && (
                    <>
                      {fileType !== 'image' ? (
                        <a
                          href={item.thumbUrl}
                          title={item.name}
                          class="file_link"
                          target={
                            ['word', 'excel'].includes(fileType) ? '' : '_blank'
                          }
                        >
                          <div class={`attachment_item ${fileType}_item`}></div>
                        </a>
                      ) : (
                        <a-image
                          src={item.thumbUrl}
                          alt={item.name}
                          previewMask={props.previewMask}
                          // v-slots={{
                          //   previewMask: () => slots.previewMask?.(),
                          // }}
                        />
                      )}
                    </>
                  )}
                  {!readonly && (
                    <span
                      class={`${prefixCls}-photo-item-del`}
                      onClick={e => {
                        e.stopPropagation()
                        handleDel(index)
                      }}
                    >
                      <CloseCircleFilled />
                    </span>
                  )}
                  {props.showSeq && (
                    <span class={`${prefixCls}-photo-item-index`}>
                      {index + 1}
                    </span>
                  )}
                  {item.status === 'uploading' && (
                    <div class="progress-mask">
                      <a-progress
                        size="small"
                        percent={item.percent}
                        strokeWidth={5}
                        showInfo={false}
                        strokeColor="#ff6720"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </a-image-preview-group>
        </div>
      )
    }

    const photoSelectorRenderer = () => {
      const { readonly } = attrs
      return (
        !readonly &&
        limitCond.value && (
          <div class="ygp-upload-photo-selecter">
            <span class="ygp-upload-photo-selecter-icon">
              <PlusOutlined />
            </span>
          </div>
        )
      )
    }

    const fileListRenderer = () => {
      const length = localFileList.value.length
      return (
        <div
          class="ygp-upload-file-list"
          style={{ borderBottom: length ? '1px solid #ebebeb' : '' }}
        >
          {localFileList.value.map((item, index) => (
            <div class="ygp-upload-file-item">
              <div
                class="ygp-upload-file-item-info"
                onClick={onPreview.bind(this, item)}
              >
                <div class="ygp-upload-file-item-name" title={item.name}>
                  <span class="ygp-upload-file-item-icon">{getIcon(item)}</span>{' '}
                  {item.name}
                </div>
                <div class="ygp-upload-file-item-actions">
                  <a
                    class="ygp-upload-file-item-del"
                    onClick={e => {
                      e.stopPropagation()
                      handleDel(index)
                    }}
                  >
                    删除
                  </a>
                </div>
              </div>
              {item.status === 'uploading' && (
                <div class="progress-mask">
                  <a-progress
                    percent={item.percent}
                    strokeWidth={3}
                    showInfo={false}
                    strokeColor="#ff6720"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )
    }
    const cardRenderer = () => {
      const { limit, sizeLimit, width, accept } = props
      return (
        <div class="ygp-upload-card-inner" style={{ width }}>
          <div class="ygp-upload-card-inner-top">
            <UploadOutlined />
            &nbsp;&nbsp;
            <span class="ygp-upload-card-inner-top-text">添加文件</span>{' '}
            {limit && (
              <span class="ygp-upload-card-inner-top-num">
                {localFileList.value.length} / {limit}
              </span>
            )}
          </div>

          <p class="ygp-upload-card-inner-hint">
            {slots.hint ? (
              slots.hint()
            ) : (
              <>
                {sizeLimit && `单个文件不超过${sizeLimit}${unitText.value}`}{' '}
                &nbsp;
                {accept && `支持文件格式：${accept}`} &nbsp;
                <a
                  class="card-download-template"
                  onClick={e => e.stopPropagation()}
                >
                  {slots.downloadTemplate?.()}
                </a>
              </>
            )}
          </p>
        </div>
      )
    }

    const linkRenderer = () => <y-btn link>点击上传</y-btn>

    const hintRenderer = () => {
      const { limit, sizeLimit, imageSize, accept, listType } = props
      return (
        <p class="ygp-upload-hint">
          {slots.hint ? (
            slots.hint()
          ) : (
            <>
              {(listType === 'picture' ||
                listType === 'picture-card' ||
                listType === 'photo') && (
                <>
                  {imageSize && `建议尺寸${imageSize}`}&nbsp;
                  {limit && `最多上传${limit}个`}&nbsp;
                  {sizeLimit &&
                    `单个图片不超过${sizeLimit}
              ${unitText.value}`}
                </>
              )}
              {(listType === 'text' || listType === 'link') && (
                <>
                  {accept && `支持文件格式：${accept}`}&nbsp;&nbsp;
                  {sizeLimit && `单个文件不能超过${sizeLimit}${unitText.value}`}
                  &nbsp;&nbsp;
                  {limit && `最多上传${limit}个`}
                </>
              )}
            </>
          )}
        </p>
      )
    }

    const beforeUpload = file => {
      const { listType, limit, sizeLimit, accept, modelValue } = props
      if (limit && modelValue.length === limit) {
        Message.error(`最多上传${limit}个!`)
        return Promise.reject()
      }
      const suffix = file.name.split('.').pop()
      if (accept && !accept.includes(suffix)) {
        Message.error(`仅支持${accept}格式!`)
        file.status = 'error'
        return Promise.reject()
      }

      if (sizeLimit && !isValidSize(file.size)) {
        Message.error(`上传不能超过${sizeLimit}${unitText.value}!`)
        file.status = 'error'
        return Promise.reject()
      }

      // 如果是图片墙则生成临时缩略图
      // TODO 图片压缩
      if (isImageStyleList(listType)) {
        file.thumbUrl = isImageUrl(file) && window.URL.createObjectURL(file)
      }
      // 生成唯一filename， 解决异步上传文件名相同问题
      file.uFilename = `${buildUUID()}${extname(file.name)}`
    }

    const customRequest = options => {
      const { async, limit, modelValue } = props
      // 没有数量限制 或者 有数量限制并且文件列表数量小于限制数量
      if (!limit || (limit && modelValue.length < limit)) {
        // 推入待上传列表
        pendingFileList.value.push({
          filename: options.file.uFilename,
          options
        })
      }

      // 确保当次文件改变只执行一次且是同步执行
      if (flag.value && !async) {
        flag.value = false
        setTimeout(() => {
          // 传入待上传文件列表，生成独立上下文，用于解决上传边界问题
          deployUpload(pendingFileList.value)
          // 清空待上传列表
          pendingFileList.value = []
          flag.value = true
        }, 0)
      }
    }

    const uploader = (options): Promise<any[]> => {
      return new Promise(resolve => {
        const { name, type, size, path, width, height } = mergeFieldMap.value
        const { modelValue, isPrivate, async } = props
        const file: any = modelValue.find(
          (f: any) => f.uid === options.file.uid
        )
        if (file) {
          if (async) file.status = 'uploading'
          upload(options)
          options.onSuccess = async () => {
            const { fullname, openDomain } = file.originFileObj.response
            const fullPath = `${openDomain}/${fullname}` // 拼接完整路径
            file[name] = file.name
            file[type] = file.type
            file[size] = file.size
            file[path] = file.url = isPrivate ? fullname : fullPath
            file.status = 'done'
            // 如果是图片类型， 获取宽高
            if (isImageUrl(file)) {
              const dimension: any = await imageDimensions(file.originFileObj)
              file[width] = dimension?.width
              file[height] = dimension?.height
            }
            onChange({ file, fileList: modelValue })
            resolve(file)
          }
          options.onProgress = e => {
            file.percent = e.percent
          }
          options.onError = (e, body) => {
            // todo 错误处理
            file.status = 'error'
            console.log('onError.value', e, body)
            onChange({ file, fileList: modelValue })
            resolve(file)
          }
        }
      })
    }

    const deployUpload = async pendingFileList => {
      const { categoryCode, getTokens = () => {} } = mergeProps.value
      const { modelValue } = props
      if (!pendingFileList.length) return
      const filterPendingFileList = pendingFileList.filter(f =>
        modelValue.find((item: any) => item.uid === f.options.file.uid)
      )
      const list = filterPendingFileList.map(e => ({
        categoryCode,
        filename: e.filename
      }))
      const data = await getTokens({
        list
      })

      const quene: any = []
      filterPendingFileList.forEach(item => {
        const { filename, options } = item
        const { uploadToken, fullname } = data[filename]
        const postData = {
          key: fullname,
          token: uploadToken
        }
        options.file.response = data[filename]
        quene.push({ ...options, data: postData })
        // quene.push(Promise.resolve().then(() => uploader({ ...options, data: postData })))
      })
      let res = await asyncPool(6, quene, uploader)
      return Promise.resolve(res)
    }

    const asyncPool = async (poolLimit, array, iteratorFn) => {
      const ret: any = [] // 存储所有的异步任务
      const executing: any = [] // 存储正在执行的异步任务
      for (const item of array) {
        // 调用iteratorFn函数创建异步任务
        const p = Promise.resolve().then(() => iteratorFn(item, array))
        ret.push(p) // 保存新的异步任务
        // 当poolLimit值小于或等于总任务个数时，进行并发控制
        if (poolLimit <= array.length) {
          // 当任务完成后，从正在执行的任务数组中移除已完成的任务
          const e = p.then(() => executing.splice(executing.indexOf(e), 1))
          executing.push(e) // 保存正在执行的异步任务
          if (executing.length >= poolLimit) {
            await Promise.race(executing) // 等待较快的任务执行完成
          }
        }
      }
      return Promise.all(ret)
    }

    const executeUpload = async () => {
      let res = await deployUpload(pendingFileList.value)
      pendingFileList.value = []
      return Promise.resolve(res)
    }

    expose({
      executeUpload
    })

    const onChange = ({ file, fileList }) => {
      const { limit, async, customFileName } = props
      const ext = extname(file.name)
      // 自定义文件名
      if (customFileName) {
        file.name = `${customFileName()}${ext}`
      }
      if (async) file.status = 'waiting'
      // 过滤超过限制和错误的文件
      let newFileList = fileList.filter(
        (item, index) =>
          (limit ? index < limit : true) && item.status !== 'error'
      )
      emit('update:modelValue', newFileList)
      emit('change', { file, newFileList })
    }

    return () => {
      const { accept, width, listType } = props
      const { class: className, readonly, ...restAttrs } = attrs
      const compCustomRequest = props.customRequest || customRequest
      const compPreview = attrs.onPreview || onPreview
      const compChange = attrs.onChange || onChange

      return (
        <div
          class={[prefixCls, `${prefixCls}-${listType}`, className]}
          style={{ width }}
        >
          {listType === 'card' && fileListRenderer()}
          {listType === 'photo' && photoListRenderer()}
          <a-upload
            action="https://upload-z2.qiniup.com"
            name="file"
            type={type.value}
            fileList={localFileList.value}
            accept={accept}
            listType={compListType()}
            disabled={disabled.value}
            showUploadList={showUploadList()}
            onPreview={compPreview}
            beforeUpload={beforeUpload}
            onChange={compChange}
            customRequest={compCustomRequest}
            {...restAttrs}
            v-slots={{
              ...slots,
              default: () => {
                // 卡片样式上传
                if (listType === 'card') {
                  return !readonly && cardRenderer()
                }
                // 图片样式
                if (listType === 'photo') {
                  return !readonly && photoSelectorRenderer()
                }
                // 链接样式
                if (listType === 'link') {
                  return !readonly && linkRenderer()
                }
                return slots.default?.()
              }
            }}
          ></a-upload>
          {!readonly && hintRenderer()}
          {slots.footer?.()}
          <a-modal
            v-model:visible={visible.value}
            title={image.name}
            footer={false}
          >
            <img src={image.url} style="width: 100%" alt={image.name} />
          </a-modal>
        </div>
      )
    }
  }
})

export type UploadProps = PropsType<Omit<AUploadProps, 'listType'>> &
  PropsType<typeof Upload>
export type UploadExpose = AUploadExpose
export type UploadSlots = AUploadSlots

export default Upload as GlobalComponentConstructor<UploadProps, UploadSlots>
