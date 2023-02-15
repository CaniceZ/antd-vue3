import { defineComponent, ref, onMounted, VNode, useSlots } from 'vue'
import { TableColumn } from '../table/types'
import { getPrefix } from '../../_utils/common'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { flattenChildren } from '../../_utils/props-utils'

type ImportResultModalSlotsType = Readonly<{
  'custom-templateName'?(record: any): VNode[]
  'custom-status'?(record: any): VNode[]
  'custom-opt'?(record: any): VNode[]
}>

const [prefixName] = getPrefix('import-result-modal')

const importResultModalProps = () => ({
  isPms: {
    type: Boolean,
    default: false
  },
  /* 很多场景下不需要显示成功链接，所以这里新增一个属性用来控制成功链接显示 */
  showSuccessLink: {
    type: Boolean,
    default: false
  },
  latest: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '最近导入记录'
  },
  typeMap: {
    type: Object,
    default: () => {}
  },
  templateCode: String,
  batchNumber: String,
  importBizSet: {
    type: Array,
    default: () => []
  },
  list: {
    type: Array,
    default: () => []
  },
  importLatestResult: {
    type: Function,
    default: () => {}
  }
})

const ImportResultModal = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...importResultModalProps()
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { attrs, expose }) {
    const slots = useSlots() as ImportResultModalSlotsType
    const modalRef = ref()
    const tableRef = ref()
    let tableList: any = ref([])

    const columns: TableColumn[] = [
      {
        title: '导入类型',
        width: 140,
        dataIndex: 'templateName'
      },
      {
        title: '导入时间',
        width: 160,
        dataIndex: 'createTime'
      },
      {
        title: '导入成功数量',
        width: 100,
        dataIndex: 'succeed'
      },
      {
        title: '导入失败数量',
        width: 100,
        dataIndex: 'fail'
      },
      {
        title: '导入状态',
        width: 100,
        dataIndex: 'status'
      },
      {
        title: '操作/备注',
        width: 140,
        dataIndex: 'opt'
      }
    ]

    function onClose() {
      modalRef.value?.hide()
    }

    async function getLatestResult() {
      const api = props.importLatestResult
      if (!api) return
      if (props.importBizSet?.length > 0) {
        const params = {
          importBizSet: props.importBizSet
        }
        const data = await api(params)
        tableList.value = data
      } else {
        const params = {
          type: 1, // 导入
          templateCode: props.templateCode,
          batchNumber: props.batchNumber
        }
        const data = await api(params)
        tableList.value = [data]
      }
    }

    onMounted(() => {
      if (props.latest) {
        getLatestResult()
      } else {
        tableList.value = props.list
      }
    })

    expose({
      table: tableRef
    })

    return () => {
      return (
        <y-modal
          ref={modalRef}
          title={props.title}
          width={900}
          {...attrs}
          v-slots={{
            footer: () => <y-btn label="关闭" primary onClick={onClose} />
          }}
        >
          <y-table
            ref={tableRef}
            columns={columns}
            data={tableList.value}
            pagination={{ hideOnSinglePage: true }}
            v-slots={{
              'body-cell-templateName': ({ record }) => {
                const children = flattenChildren(
                  slots['custom-templateName']?.(record)
                )
                if (children.length > 0) {
                  return children
                }
                return props.isPms
                  ? props.typeMap[record.importBiz] || record.importBiz
                  : record.templateName
              },
              'body-cell-status': ({ record }) => {
                const children = flattenChildren(
                  slots['custom-status']?.(record)
                )
                if (children.length > 0) {
                  return children
                }
                const statusMap = {
                  1: '全部成功',
                  2: '部分成功',
                  3: '导入失败',
                  4: '处理中'
                }
                const colorMap = {
                  1: 'success',
                  2: 'success',
                  3: 'error',
                  4: 'processing'
                }
                let label = statusMap[record.status]
                let color = colorMap[record.status]
                if (!label) {
                  ;[label, color] =
                    record.amount > 0 && record.amount === record.succeed
                      ? ['导入成功', 'success']
                      : ['导入失败', 'error']
                }

                return <y-tag size="small" label={label} color={color} />
              },
              'body-cell-opt': ({ record }) => {
                const children = flattenChildren(slots['custom-opt']?.(record))
                if (children.length > 0) {
                  return children
                }
                if (
                  record.succeed > 0 &&
                  record.sourceExcelUrl &&
                  !props.isPms &&
                  props.showSuccessLink
                ) {
                  return (
                    <y-btn
                      link
                      label="下载成功记录"
                      href={record.sourceExcelUrl}
                    />
                  )
                }
                if (record.fail > 0 && record.failExcelUrl) {
                  return (
                    <y-btn
                      link
                      label="下载失败记录"
                      href={record.failExcelUrl}
                    />
                  )
                }
                if (record.remark) {
                  return record.remark
                }
                if (record.msg) {
                  return record.msg
                }
                return '-'
              }
            }}
          />
        </y-modal>
      )
    }
  }
})

export type ImportResultModalProps = PropsType<typeof ImportResultModal> &
  PropsType<typeof importResultModalProps>
export type ImportResultModalExpose = {}
export type ImportResultModalSlots = ImportResultModalSlotsType

export default ImportResultModal as GlobalComponentConstructor<
  ImportResultModalProps,
  ImportResultModalSlots
>
