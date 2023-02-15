import { defineComponent, ref, useSlots, VNode } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import ImportResultModal from './ImportResultModal'
import { getPrefix } from '../../_utils/common'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import Modal from '../../plugins/modal'
import { importFile, downloadFile } from '../../packages//utils'
import pick from 'lodash/pick'
import mapKeys from 'lodash/mapKeys'
import {
  getLatestResult,
  getResult,
  importExcelFile,
  downloadTemplateFile
} from './api'

type ImportSlotsType = Readonly<{
  [key: `result-${string}`]: (record?: any) => VNode[]
  icon?(): VNode[]
  addonAfter?(): VNode[]
  addonBefore?(): VNode[]
  downloadTemplate?(): VNode[]
}>

const [prefixName, prefixCls] = getPrefix('import')

const importProps = () => ({
  label: {
    type: String,
    default: '导入'
  },
  showIcon: {
    type: Boolean,
    default: false
  },
  modelProps: {
    type: Object,
    default: () => {}
  },
  btnProps: {
    type: Object,
    default: () => {}
  },
  accept: {
    type: String,
    default: '.xls, .xlsx'
  },
  sizeLimit: {
    type: String,
    default: '20MB'
  },
  templateUrl: {
    type: String,
    default: ''
  },
  getBatchNumber: {
    type: Function,
    default: importExcelFile,
    require: true
  },
  getImportResult: {
    type: Function,
    default: getResult,
    require: true
  },
  importLatestResult: {
    type: Function,
    default: getLatestResult
  },
  templateCode: {
    type: String,
    default: ''
  },
  extraData: {
    type: Object
  },
  lastResult: {
    type: Boolean,
    default: true
  },
  resultProps: {
    type: Object,
    default: () => ({})
  },
  // 获取结果轮询次数
  wrapCount: {
    type: Number,
    default: 20
  }
})

const Import = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...importProps()
  },
  setup(props, { attrs, expose }) {
    const slots = useSlots() as ImportSlotsType
    let visible = ref(false)
    let fileList: any = ref([])

    const imports = async () => {
      fileList.value.forEach((item: any) => {
        item.status = 'done'
      })
    }

    function showImport() {
      fileList.value = []
      visible.value = true
    }

    function getResultSlots() {
      const resultPrefix = 'result-'
      return mapKeys(
        pick(
          slots,
          Object.keys(slots).filter(row => row.startsWith(resultPrefix))
        ),
        (_, key) => key.split(resultPrefix)[1]
      )
    }
    function onOk() {
      if (fileList.value.length === 0) {
        message.warning('请添加需要导入的文件')
        return
      }
      importFile({
        file: fileList.value[0].originFileObj,
        title: props.label,
        getBatchNumber: props.getBatchNumber,
        getImportResult: props.getImportResult,
        wrapCount: props.wrapCount,
        templateCode: props.templateCode,
        extraData: props.extraData,
        resultProps: props.resultProps,
        resultSlots: getResultSlots()
      })
      visible.value = false
    }

    function onShowResult() {
      Modal.create(
        ImportResultModal,
        {
          latest: true,
          importLatestResult: props.importLatestResult,
          templateCode: props.templateCode,
          ...props.resultProps
        },
        getResultSlots()
      )
    }

    async function onDownloadTemplate() {
      const url = await downloadTemplateFile({
        templateCode: props.templateCode
      })
      if (url) {
        downloadFile(url)
      }
    }

    expose({
      showImport
    })

    return () => {
      return (
        <>
          <y-space class={[prefixCls, attrs.class]}>
            <y-btn onClick={showImport} {...props.btnProps}>
              {slots.icon ? slots.icon() : props.showIcon && <UploadOutlined />}
              {props.label}
            </y-btn>
            {props.lastResult && (
              <y-btn label="最近导入记录" link onClick={onShowResult} />
            )}
          </y-space>
          <y-modal
            v-model={visible.value}
            title={props.label}
            {...props.modelProps}
            onOk={onOk}
          >
            {slots.addonBefore && <div class="mb-2">{slots.addonBefore()}</div>}
            <y-upload
              v-model={fileList.value}
              accept={props.accept}
              listType="card"
              sizeLimit={props.sizeLimit}
              limit={1}
              customRequest={imports}
              v-slots={{
                downloadTemplate: () => {
                  if (slots.downloadTemplate) {
                    return slots.downloadTemplate()
                  }
                  if (props.templateUrl) {
                    return (
                      <y-link label="下载导入模版" href={props.templateUrl} />
                    )
                  }
                  if (props.templateCode) {
                    return (
                      <y-link
                        label="下载导入模版"
                        onClick={onDownloadTemplate}
                      />
                    )
                  }
                }
              }}
            />
            {slots.addonAfter && <div class="mt-2">{slots.addonAfter()}</div>}
          </y-modal>
        </>
      )
    }
  }
})

export type ImportProps = PropsType<typeof Import>
export type ImportExpose = {}
export type ImportSlots = {}

export default Import as GlobalComponentConstructor<ImportProps, ImportSlots>
