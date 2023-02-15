import { defineComponent, useSlots, VNode, watch } from 'vue'
import { UpOutlined } from '@ant-design/icons-vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import useAttrs from '../../_hooks/useAttrs'
import { getPrefix } from '../../_utils/common'
import Table, { TableProps, TableExpose, TableSlots } from '../table/Table'
import { BodyCellParams } from '../table/types'
import useRefExpose from '../../_hooks/useRefExpose'

const [prefixName, prefixCls] = getPrefix('order-table')

const orderTableProps = () => ({
  defaultCollapseNum: {
    type: Number,
    default: 10
  },
  rowMargin: {
    type: String,
    default: '16px'
  }
})

const OrderTable = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...orderTableProps()
  },
  setup(props, { expose }) {
    const attrs = $(useAttrs<TableProps>())
    const slots = useSlots() as TableSlots
    const [orderTableRef, orderTableExpose] = useRefExpose<TableExpose>([
      'form',
      'reset',
      'validate',
      'setHeader',
      'setTableProps'
    ])
    expose(orderTableExpose)

    const rowKey = $computed<string>(() => (attrs.rowKey as string) || 'id')
    const childrenKey = $computed(() => attrs.childrenColumnName || 'children')

    let expandMap = $ref({})
    let parentMap = $ref({})
    let data = $ref<any[]>([])

    watch(
      [() => attrs.data, () => props.defaultCollapseNum],
      ([newData, defaultCollapseNum]) => {
        expandMap = {}
        parentMap = {}
        data =
          newData?.map((parent: any) => {
            let childrenList = [...(parent[childrenKey] || [])]
            const newParent = { ...parent }
            childrenList.forEach(child => {
              parentMap[child[rowKey]] = parent
            })
            const isExpand = expandMap[parent[rowKey]]
            const hasExpand =
              defaultCollapseNum > 0 && childrenList.length > defaultCollapseNum
            if (hasExpand && !isExpand) {
              expandMap[parent[rowKey]] = childrenList.slice(
                defaultCollapseNum,
                childrenList.length
              )
              childrenList = childrenList.slice(0, defaultCollapseNum)
              childrenList.push({
                id: `${parent[rowKey]}_expand`,
                parent: newParent,
                childrenLength: parent[childrenKey].length,
                isExpand: false,
                _isExpand: true
              })
            }
            childrenList.push({
              id: `${parent[rowKey]}_empty`,
              _isEmpty: true
            })
            newParent[childrenKey] = childrenList
            return newParent
          }) || []
      }
    )

    function onExpand(record) {
      const { isExpand, parent, childrenLength } = record
      if (isExpand) {
        expandMap[parent[rowKey]] = parent[childrenKey].splice(
          props.defaultCollapseNum,
          childrenLength - props.defaultCollapseNum
        )
      } else {
        parent[childrenKey].splice(
          props.defaultCollapseNum,
          0,
          ...expandMap[parent[rowKey]]
        )
        delete expandMap[parent[rowKey]]
      }
      record.isExpand = !isExpand
    }

    function isParentRecord(data, record) {
      return data.findIndex(row => row[rowKey] === record[rowKey]) > -1
    }

    function isOptRecord(record) {
      return record['_isEmpty'] || record['_isExpand']
    }

    const columns = $computed<TableProps['columns']>(() => {
      const length = attrs.columns?.length || 0
      if (length > 0) {
        const [firstCol, ...otherCol] = attrs.columns || []
        return [
          // 第一列
          {
            ...firstCol,
            customCell: (record, ...args) => {
              const cell = firstCol.customCell?.(record, ...args) || {}
              if (cell.colSpan === null || cell.colSpan === void 0) {
                cell.colSpan = 1
              }
              if (isParentRecord(data, record) || isOptRecord(record)) {
                Object.assign(cell, {
                  colSpan: length,
                  class: `${cell.class || ''}`,
                  style:
                    typeof cell.style === 'string'
                      ? `verticalAlign: top; ${cell.style}`
                      : {
                          verticalAlign: 'top',
                          ...(cell.style || {})
                        }
                })
                if (isOptRecord(record) && attrs.rowSelection) {
                  cell.colSpan! += 1
                }
                if (isParentRecord(data, record)) {
                  cell.class += ` ${prefixCls}-cell-parent`
                } else if (record['_isExpand']) {
                  cell.class += ` ${prefixCls}-cell-expand`
                } else if (record['_isEmpty']) {
                  cell.class += ` ${prefixCls}-cell-empty`
                }
              } else {
                if (attrs.rowSelection) {
                  cell.colSpan! += 1
                }
              }
              return cell
            }
          },
          // 其他列
          ...otherCol.map(({ rowSpan, customRender, ...col }, i) => {
            return {
              ...col,
              customRender: customRender
                ? opt =>
                    customRender({
                      ...opt,
                      parentRecord: parentMap[opt.record[rowKey]]
                    })
                : void 0,
              rowSpan: typeof rowSpan === 'boolean' ? void 0 : rowSpan,
              customCell: (record, ...args) => {
                const parentRecord = parentMap[record[rowKey]]
                const cell = col.customCell?.(record, ...args) || {}
                if (cell.colSpan === null || cell.colSpan === void 0) {
                  cell.colSpan = 1
                }
                if (isParentRecord(data, record) || isOptRecord(record)) {
                  cell['colSpan'] = 0
                } else if (rowSpan === true && parentRecord) {
                  const isCollapse = expandMap[parentRecord[rowKey]]
                  if (record === parentRecord[childrenKey][0]) {
                    const len = parentRecord[childrenKey].length
                    Object.assign(cell, {
                      rowSpan: isCollapse ? props.defaultCollapseNum : len,
                      style:
                        typeof cell.style === 'string'
                          ? `verticalAlign: top; ${cell.style}`
                          : {
                              verticalAlign: 'top',
                              ...(cell.style || {})
                            }
                    })
                  } else {
                    cell['rowSpan'] = 0
                  }
                }
                cell.class = `${cell.class || ''}`
                if (i === otherCol.length - 1) {
                  cell.class += ` ${prefixCls}-cell-lastCol`
                }
                return cell
              }
            }
          })
        ]
      }
      return attrs.columns
    })

    const bodyCellSlots = $computed(() => {
      const slotsMap = {}
      if (!attrs.columns || attrs.columns.length === 0) {
        return slotsMap
      }
      const [firstCol, ...otherCol] = attrs.columns
      // 第一列
      const firstColKey = firstCol.dataIndex
      slotsMap[`body-cell-${firstColKey}`] = rowProps => {
        const record = rowProps.record
        if (isParentRecord(data, record)) {
          return slots['body-row-parent']?.(rowProps)
        } else if (record['_isExpand']) {
          return (
            slots['body-row-expand']?.({
              ...rowProps,
              handleExpand: () => onExpand(record)
            }) || (
              <y-btn block link small onClick={() => onExpand(record)}>
                {record.isExpand ? '点击收起' : '点击展开'}{' '}
                <UpOutlined
                  class={[
                    `${prefixCls}-cell-expand-btn`,
                    { down: !record.isExpand }
                  ]}
                />
              </y-btn>
            )
          )
        } else if (record['_isEmpty']) {
          return ''
        }
        return slots[`body-cell-${firstColKey}`]?.(rowProps)
      }
      // 其他列
      otherCol.forEach(col => {
        if (slots[`body-cell-${col.dataIndex}`]) {
          slotsMap[`body-cell-${col.dataIndex}`] = rowProps => {
            const record = rowProps.record
            const newProps = {
              ...rowProps,
              parentRecord: parentMap[record[rowKey]]
            }
            if (slots[`body-cell-${col.dataIndex}`]) {
              return slots[`body-cell-${col.dataIndex}`](newProps)
            }
          }
        }
      })
      return slotsMap
    })

    function rowClassName(record, index: number, indent: number) {
      let cls =
        typeof attrs.rowClassName === 'string'
          ? attrs.rowClassName
          : attrs.rowClassName?.(record, index, indent) || ''
      if (record[childrenKey]) {
        cls += ` ${prefixCls}-row-parent`
      } else if (record['_isExpand']) {
        cls += ` ${prefixCls}-row-expand`
      } else if (record['_isEmpty']) {
        cls += ` ${prefixCls}-row-empty`
      } else {
        cls += ` ${prefixCls}-row-child`
      }
      return cls
    }

    const rowSelection = $computed(() => {
      if (attrs.rowSelection) {
        return {
          ...attrs.rowSelection,
          getCheckboxProps: record => {
            const res = attrs.rowSelection?.getCheckboxProps?.(record) || {}
            return {
              disabled: !isParentRecord(data, record),
              ...res
            }
          }
        }
      }
      return attrs.rowSelection
    })

    return () => (
      <Table
        ref={orderTableRef}
        class={prefixCls}
        style={`--orderTable-rowMargin: ${props.rowMargin}`}
        indentSize={0}
        {...attrs}
        rowClassName={rowClassName}
        rowSelection={rowSelection}
        noHover
        noResize
        defaultExpandAllRows2
        data={data}
        columns={columns}
        v-slots={{
          ...slots,
          ...bodyCellSlots
        }}
      />
    )
  }
})

export type OrderTableProps = PropsType<typeof OrderTable> &
  PropsType<typeof orderTableProps>
export type OrderTableExpose = TableExpose
export type OrderTableSlots = TableSlots &
  Readonly<{
    'body-row-parent'?(props: BodyCellParams): VNode[]
    'body-row-expand'?(
      props: BodyCellParams & { handleExpand: () => void }
    ): VNode[]
    [key: `body-cell-${string}`]: (
      props: BodyCellParams & { parentRecord?: any }
    ) => VNode[]
  }>

export default OrderTable as GlobalComponentConstructor<
  OrderTableProps,
  OrderTableSlots
>
