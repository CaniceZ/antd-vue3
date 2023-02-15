import { useGlobalConfig } from '../../plugins/global-config'
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  useSlots,
  VNode,
  watch,
  Teleport
} from 'vue'
import {
  ATableProps,
  ATableSlots,
  BodyCellParams,
  HeaderCellParams,
  TableColumn,
  ATableExpose
} from './types'
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { getPrefix, isAttrTrue } from '../../_utils/common'
import YTheadConfig from './TheadConfig'
import {
  getCiphertext,
  getCiphertextField,
  isCiphertext,
  omit
} from '../../packages//utils'
import CipherText from '../ciphertext'
import set from 'lodash-es/set'
import { useStorage, StorageSerializers } from '@vueuse/core'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useRefExpose from '../../_hooks/useRefExpose'
import { FormExpose } from '../form'
import useDefaultExpandAllRows from './useDefaultExpandAllRows'
import useRowSelection from './useRowSelection'
import usePaginationExtraSlot from './usePaginationExtraSlot'

const [prefixName, prefixCls] = getPrefix('table')

const defaultPropMap = {
  operation: 'operation'
}

const sizeMap = {
  small: 'small',
  middle: 'middle',
  large: 'default'
}

function parseOperations(children: any[], column): any[] {
  const childrens = children.filter(child => typeof child.type !== 'symbol')
  const childs: any[] = []
  const mores: any[] = []
  childrens?.forEach(child => {
    if (child.type && child.props && child?.type?.['name'] === 'YBtn') {
      if (!child.props.type) {
        child.props['type'] = 'link'
      }
      if (!child.props.size) {
        child.props['size'] = 'small'
      }
      const showNum = column.showNum || 3
      if (
        isAttrTrue(child.props['more']) ||
        (childrens.length >= showNum && childs.length === showNum)
      ) {
        mores.push(child)
        return
      }
    }
    childs.push(child)
  })

  if (mores.length > 0) {
    childs.push(
      <y-btn-dropdown
        link
        small
        v-slots={{ icon: () => <EllipsisOutlined />, default: () => mores }}
      />
    )
  }

  return childs
}

const tableProps = () => ({
  data: {
    type: Array
  },
  middle: {
    type: Boolean,
    default: false
  },
  large: {
    type: Boolean,
    default: false
  },
  propMap: {
    type: Object,
    default: () => defaultPropMap
  },
  ellipsis: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: false
  },
  noPagination: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  addRow: {
    type: Function
  },
  configThead: {
    type: [Boolean, Object],
    default: false
  },
  seq: {
    type: Boolean,
    default: false
  },
  /** 解密接口服务前缀 */
  decryptApiPrefix: String,
  /** 空单元格显示内容 */
  emptyCell: [Object, Array, String] as PropType<VNode | VNode[] | string>,
  defaultExpandAllRows2: Boolean,
  noHover: Boolean,
  noResize: Boolean,
  fit: Boolean,
  wrapperClassName: String
})

const Table = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...tableProps()
  },
  emits: ['theadChange'],
  setup(props, { attrs, expose, emit }) {
    const globalConfig = useGlobalConfig()
    const slots = useSlots() as TableSlots
    const [tableRef, tableExpose] = useRefExpose<ATableExpose>([
      'selectedKeySet'
    ])
    const [formRef, formExpose] = useRefExpose<FormExpose>([
      'validate',
      'reset'
    ])
    const theadConfigRef = ref()
    const tableKey = (attrs.tableKey || attrs['table-key']) as string
    const theadColumns = ref<TableColumn>([])
    const customProps = ref<any>({})
    let tableLocal = ref<any>({})

    const rowSelection = $(useRowSelection(props, attrs, slots))

    const emptyCell = $computed(
      () => props.emptyCell || globalConfig?.appConfig?.tableProps?.emptyCell
    )

    const data = computed(() => props.data || [])
    const namePathMap = computed<any>(() => {
      const childrenField = (attrs.childrenColumnName ||
        attrs['children-column-name'] ||
        'children') as string
      const map: WeakMap<any, string> = new WeakMap()
      const run = (arr: any[] = [], prefix = '') => {
        if (!arr || arr.length === 0) return
        arr.forEach((row, i) => {
          const namePath = `${prefix ? `${prefix}.` : ''}${i}`
          map.set(row, namePath)
          run(row[childrenField], `${namePath}.${childrenField}`)
        })
      }
      run(data.value)
      return map
    })

    const propMap = computed(() => {
      return Object.assign({}, defaultPropMap, props.propMap)
    })

    const storeKey = computed(() => {
      const { userCode, appName } = globalConfig.appConfig || {}
      const key = `persistence_thead_${appName}_${userCode}`
      return userCode && appName ? key : ''
    })

    const initColumns = computed(() => {
      const columns = (attrs['columns'] as TableColumn[]) || []
      const newColumns: TableColumn[] = columns.map(
        ({
          style,
          class: colClass,
          headerStyle,
          headerClass,
          customRender,
          ...col
        }) => {
          return reactive({
            resizable: props.editable || props.noResize ? false : true,
            ...(props.noResize ? {} : { width: 120 }),
            ellipsis: tableKey ? customProps.value.ellipsis : props.ellipsis,
            editable: props.editable,
            ...col,
            customRender: customRender
              ? (opt: any) => {
                  const res = customRender(opt)
                  if (res && typeof res === 'string' && res.includes('\n')) {
                    const list: any[] = res.split('\n')
                    return (
                      <div>
                        {list.map(str => (
                          <div>{str}</div>
                        ))}
                      </div>
                    )
                  }
                  if (res === '' || res === void 0 || res === null) {
                    return emptyCell
                  }
                  return res
                }
              : void 0,
            customCell: (record: any, ...args: any[]) => {
              const cell = col.customCell?.(record, ...args) || {}
              Object.assign(cell, {
                style: {
                  ...(style || {}),
                  ...(cell.style || {})
                },
                class: `${colClass || ''} ${cell.class || ''}`
              })
              return cell
            },
            customHeaderCell: (column: any) => {
              const cell = col.customHeaderCell?.(column) || {}
              Object.assign(cell, {
                style: {
                  ...(headerStyle || {}),
                  ...(cell.style || {})
                },
                class: `${headerClass || ''} ${cell.class || ''}`
              })
              return cell
            },
            dataIndex:
              typeof col.dataIndex === 'function'
                ? col.dataIndex(props.editable)
                : col.dataIndex
          })
        }
      )
      if (props.seq) {
        const seq = reactive<TableColumn>({
          title: '序号',
          dataIndex: 'seq',
          fixed: 'left',
          align: 'center',
          width: 60
        })
        newColumns.unshift(seq)
      }

      if (
        slots[`body-cell-${propMap.value['operation']}`] ||
        slots[`header-cell-${propMap.value['operation']}`] ||
        props.editable
      ) {
        const index = columns.findIndex(
          col =>
            col.dataIndex === propMap.value['operation'] ||
            col.key === propMap.value['operation']
        )
        const newIndex = newColumns.findIndex(
          col =>
            col.dataIndex === propMap.value['operation'] ||
            col.key === propMap.value['operation']
        )
        const operationCol = reactive<TableColumn>({
          title: '操作',
          dataIndex: propMap.value['operation'],
          key: propMap.value['operation'],
          fixed: 'right',
          align: 'center',
          width: props.editable ? 60 : 120
        })
        if (index > -1) {
          newColumns[newIndex] = Object.assign(operationCol, columns[index])
        } else {
          newColumns.push(operationCol)
        }
      }
      return newColumns
    })

    const columns = computed(() => {
      if (theadColumns.value.length) {
        // 用于获取响应的column
        const dataKeys = theadColumns.value.map(item => item.dataIndex)
        const newColumns: TableColumn[] = initColumns.value
          .filter(col => {
            return dataKeys.includes(col.dataIndex)
          })
          .sort((start, next) => {
            return (
              dataKeys.indexOf(start.dataIndex) -
              dataKeys.indexOf(next.dataIndex)
            )
          })
        return newColumns
      } else {
        return initColumns.value
      }
    })

    function onResizeColumn(w, col) {
      if (attrs.onResizeColumn && typeof attrs.onResizeColumn === 'function') {
        attrs.onResizeColumn(w, col)
      } else {
        col.width = w
      }
    }

    // 自定义表头
    const onSetThead = () => {
      theadConfigRef.value.show()
    }
    const onGetThead = option => {
      const newColumns = option.columns
      console.log('storeKey', storeKey.value)
      if (storeKey.value && tableKey) {
        const storeTable = tableLocal.value || {}
        if (!storeTable[tableKey]) {
          storeTable[tableKey] = {}
        }
        storeTable[tableKey].column = newColumns
        tableLocal.value = storeTable
        console.log('storeTable', storeTable, tableLocal.value)
      }
      theadColumns.value = newColumns || []
      emit('theadChange', {
        columns: newColumns,
        initColumns: initColumns.value
      })
    }
    // 自定义表格属性
    function onCustomSetProps(option: {
      key: string
      value: [string | boolean]
    }) {
      const { key, value } = option
      customProps.value[key] = value

      if (storeKey.value && tableKey) {
        const storeTable = tableLocal.value || {}
        if (!storeTable[tableKey]) {
          storeTable[tableKey] = {}
        }
        storeTable[tableKey].tableProps = customProps.value
        tableLocal.value = storeTable
      }
    }

    const filteredSlots = computed(() => {
      return Object.keys(omit(slots, ['header-cell-selection-title'])).reduce(
        (obj, key) => {
          if (key.startsWith('body-cell-') || key.startsWith('header-cell-')) {
            return obj
          }
          return { ...obj, [key]: slots[key] }
        },
        {}
      )
    })

    const pagination = reactive({
      current: 1,
      pageSize: 10,
      showTotal: total => `共 ${total} 条记录`,
      showQuickJumper: true,
      showSizeChanger: true
    })

    watch(
      () => attrs.pagination,
      page => {
        Object.assign(pagination, page)
      },
      { immediate: true, deep: true }
    )

    function onChange(page, ...args: any[]) {
      const fn = attrs.onChange as any
      Object.assign(pagination, page)
      if (fn) {
        fn(page, ...args)
      }
    }

    const size = computed(() => {
      const propSize = tableKey ? customProps.value['size'] : attrs.size
      return propSize
        ? sizeMap[propSize as string]
        : props.middle
        ? 'default'
        : props.large
        ? 'middle'
        : 'small'
    })

    // 获取表格记忆数据
    function getTableLocal() {
      if (storeKey.value) {
        tableLocal = useStorage(storeKey.value, {}, localStorage, {
          serializer: StorageSerializers.object,
          mergeDefaults: true
        })

        if (tableLocal.value) {
          const { tableProps, column } = tableLocal.value[tableKey] || {}
          theadColumns.value = column || []

          if (tableProps) {
            customProps.value = { ...tableProps }
          } else {
            customProps.value = {
              ellipsis: props.ellipsis,
              bordered: props.bordered,
              size: attrs.size
            }
          }
        }
      }
    }

    watch(
      () => storeKey.value,
      (key, prevKey) => {
        if (key !== prevKey) {
          getTableLocal()
        }
      }
    )

    onMounted(() => {
      // 获取表格记忆数据
      getTableLocal()
    })

    useDefaultExpandAllRows(props, tableRef)
    const paginationExtraDom = usePaginationExtraSlot(slots, tableRef)

    expose({
      form: formRef,
      ...formExpose,
      ...tableExpose,
      setHeader: onSetThead,
      setTableProps: onCustomSetProps
    })

    return () => {
      const { loading, scroll, ...restAttrs } = attrs
      return (
        <y-spin
          wrapperClassName={`${props.wrapperClassName || ''} ${
            props.fit ? `${prefixCls}-fit` : ''
          }`}
          spinning={isAttrTrue(loading)}
        >
          <div class={`${prefixCls}-toolbar`}>
            {slots.toolbar && <div class="toolbar">{slots.toolbar?.()}</div>}
            {props.configThead && (
              <div class="btn-right">
                <y-btn link class="ygp-link" onClick={onSetThead}>
                  配置表头
                </y-btn>
              </div>
            )}
          </div>
          <y-form
            ref={formRef}
            model={data.value}
            decryptApiPrefix={props.decryptApiPrefix}
          >
            <a-table
              ref={tableRef}
              sticky={
                globalConfig.appConfig?.tableSticky || {
                  offsetHeader: 0,
                  offsetScroll: props.noPagination ? 0 : 40
                }
              }
              scroll={{ x: 100, ...((scroll as object) || {}) }}
              rowKey="id"
              class={[
                prefixCls,
                {
                  [`${prefixCls}-row-expand-button-hide`]: Boolean(
                    props.defaultExpandAllRows2
                  ),
                  [`${prefixCls}-no-hover`]: Boolean(props.noHover)
                }
              ]}
              {...omit(restAttrs, [
                'pagination',
                'onResizeColumn',
                'rowSelection',
                'onChange'
              ])}
              rowSelection={rowSelection}
              onResizeColumn={
                props.editable || props.noResize ? void 0 : onResizeColumn
              }
              bordered={
                !tableKey || customProps.value?.bordered === void 0
                  ? props.bordered
                  : customProps.value.bordered
              }
              size={size.value}
              dataSource={data.value}
              columns={columns.value}
              onChange={onChange}
              pagination={props.noPagination ? false : pagination}
              v-slots={{
                bodyCell: (prop: BodyCellParams) => {
                  const { column, index, text, record } = prop
                  const namePathPrefix = `${
                    namePathMap.value.has(record)
                      ? namePathMap.value.get(record)
                      : index
                  }`
                  const namePath = `${namePathPrefix}.${column.dataIndex}`
                  const tmpEmptyCell = column.emptyCell || emptyCell
                  let columnEditable: boolean
                  if (typeof column.editable === 'function') {
                    columnEditable = column.editable(prop)
                  } else {
                    columnEditable = Boolean(column.editable)
                  }
                  if (props.seq && column.dataIndex === 'seq') {
                    return index + 1
                  }
                  if (
                    [column.dataIndex, column.key].includes(
                      propMap.value['operation']
                    ) &&
                    slots[`body-cell-${propMap.value['operation']}`]
                  ) {
                    const childs = parseOperations(
                      slots[`body-cell-${propMap.value['operation']}`]?.(
                        prop
                      ) || [],
                      column
                    )
                    return childs
                  } else if (slots[`body-cell-${column.dataIndex}`]) {
                    return slots[`body-cell-${column.dataIndex}`]?.(prop)
                  } else if (slots[`body-cell-${column.key}`]) {
                    return slots[`body-cell-${column.key}`]?.(prop)
                  } else if (
                    props.editable &&
                    [column.dataIndex, column.key].includes(
                      propMap.value['operation']
                    )
                  ) {
                    return (
                      <y-btn
                        label="删除"
                        danger
                        link
                        small
                        onClick={() => data.value.splice(index, 1)}
                      />
                    )
                  } else if (columnEditable) {
                    let item
                    if (typeof column.item === 'function') {
                      item = column.item(prop)
                    } else {
                      item = column.item || {}
                    }
                    const name = item.name
                      ? `${namePathPrefix}.${item.name}`
                      : namePath
                    return (
                      <y-form-item
                        no-label
                        required={column.required}
                        key={name}
                        decryptApiPrefix={
                          column.decryptApiPrefix || props.decryptApiPrefix
                        }
                        {...item}
                        label={column.title}
                        name={name}
                      />
                    )
                  } else if (slots['body-cell']) {
                    return slots['body-cell']?.(prop)
                  } else if (isCiphertext(data.value, namePath)) {
                    return (
                      <CipherText
                        {...getCiphertext(data.value, namePath)}
                        decryptApiPrefix={
                          column.decryptApiPrefix || props.decryptApiPrefix
                        }
                        onDecrypt={val => {
                          set(data.value, namePath, val)
                          set(data.value, getCiphertextField(namePath), void 0)
                        }}
                      />
                    )
                  } else if (
                    (text === '' || text === void 0 || text === null) &&
                    tmpEmptyCell &&
                    !column.customRender
                  ) {
                    return tmpEmptyCell
                  }
                },
                headerCell: prop => {
                  const { column, title } = prop
                  let children
                  if (slots[`header-cell-${column.dataIndex}`]) {
                    children = slots[`header-cell-${column.dataIndex}`]?.(prop)
                  } else if (slots[`header-cell-${column.key}`]) {
                    children = slots[`header-cell-${column.key}`]?.(prop)
                  } else if (slots['header-cell']) {
                    children = slots['header-cell']?.(prop)
                  } else if (
                    props.editable &&
                    [column.dataIndex, column.key].includes(
                      propMap.value['operation']
                    )
                  ) {
                    children = (
                      <y-btn
                        label="添加一行"
                        onClick={() =>
                          props.addRow ? props.addRow() : data.value.push({})
                        }
                        small
                        block
                        link
                      />
                    )
                  }
                  return (
                    <div
                      class={[
                        'ygp-table-cell',
                        {
                          'ygp-table-cell-required': column.required === true
                        }
                      ]}
                    >
                      {children ||
                        (title && title.includes('\n')
                          ? title
                              .split('\n')
                              .filter(Boolean)
                              .map(str => <div>{str}</div>)
                          : title)}
                    </div>
                  )
                },
                ...filteredSlots.value
              }}
            />
            {slots.bottom?.() ||
              (props.editable && (
                <y-row>
                  <y-btn
                    block
                    dashed
                    label="添加一行"
                    onClick={() =>
                      props.addRow ? props.addRow() : data.value.push({})
                    }
                  />
                </y-row>
              ))}
          </y-form>
          <YTheadConfig
            ref={theadConfigRef}
            initColumns={initColumns.value}
            tableColumns={columns.value}
            onOk={onGetThead}
          />
          <Teleport
            to={paginationExtraDom}
            v-slots={{ default: slots['pagination-extra'] }}
          />
        </y-spin>
      )
    }
  }
})

export type TableProps = PropsType<Omit<ATableProps, 'columns'>> &
  PropsType<typeof Table> &
  PropsType<typeof tableProps> & { columns?: TableColumn[] }
export type TableExpose = Pick<FormExpose, 'validate' | 'reset'> & {
  form: FormExpose
  setHeader: () => void
  setTableProps: (option: { key: string; value: [string | boolean] }) => void
}
export type TableSlots = Readonly<
  ATableSlots & {
    toolbar?(): VNode[]
    bottom?(): VNode[]
    'pagination-extra'?(): VNode[]
    [key: `body-cell-${string}`]: (props: BodyCellParams) => VNode[]
    [key: `header-cell-${string}`]: (props: HeaderCellParams) => VNode[]
  }
>

export default Table as GlobalComponentConstructor<TableProps, TableSlots>
