<script lang="ts" setup>
import { TableColumn, FormItem, Message } from '@ygp/ygp-design-vue'
import type { TableProps } from 'ant-design-vue'
import { ref, computed, reactive } from 'vue'
import { tableData, logisticsCompanies } from './const'
import dayjs from 'dayjs'

type Key = string | number

const tableRef = ref()
const formRef = ref()

const state = reactive<{
  tableData: any[]
  selectedRows: any[]
  selectedRowKeys: Key[]
  logisticsCompanies: {
    value: string
    name: string
  }[]
  orderInfo: {
    deliveryTime?: any
  }
}>({
  tableData: tableData,
  selectedRows: [],
  selectedRowKeys: [],
  logisticsCompanies: logisticsCompanies,
  orderInfo: {}
})

const isDisabled = (status: number) => {
  return ![4, 5].includes(status)
}
const isRequired = (id: string) => {
  return state.selectedRowKeys.includes(id)
}

const columns = computed<TableColumn[]>(() => {
  return [
    {
      title: '采购单号',
      dataIndex: 'purchaseNo',
      width: 180
    },
    {
      title: '采购金额',
      dataIndex: 'purchaseTotalAmount'
    },
    {
      title: '物流名称',
      dataIndex: 'logisticsCompanyCode',
      width: 160,
      editable: true,
      required: true,
      item: ({ record }) => {
        return {
          type: 'select',
          options: state.logisticsCompanies,
          propMap: {
            label: 'name',
            value: 'value'
          },
          disabled: isDisabled(record.purchaseStatus),
          required: isRequired(record.id),
          componentProps: {
            onChange: (e: any) => onCompanyChange(e, record)
          }
        }
      }
    },
    {
      title: '物流单号',
      dataIndex: 'logisticsNo',
      width: 200,
      editable: true,
      headerClass: 'ygp-table-cell-required',
      item: ({ record }) => {
        return {
          disabled: isDisabled(record.purchaseStatus),
          required: isRequired(record.id)
        }
      }
    },
    {
      title: '物流运费',
      dataIndex: 'freight',
      editable: ({ record }) => record.freeShipping !== 1,
      customRender: ({ record }) =>
        record.freeShipping === 1 ? '包邮' : void 0,
      item: ({ record }) => {
        return {
          type: 'number',
          disabled:
            isDisabled(record.purchaseStatus) || record.freeShipping === 1,
          required: isRequired(record.id) && !record.freeShipping,
          componentProps: {
            min: 0
          }
        }
      }
    }
  ]
})

const formItems = computed<FormItem[]>(() => {
  return [
    {
      name: 'deliveryTime',
      label: '发货时间',
      type: 'datetime',
      required: true,
      componentProps: {
        disabledDate: disabledDate
      }
    },
    {
      name: 'expectedDeliveryTime',
      label: '预计到仓时间',
      type: 'date',
      required: true,
      componentProps: {
        disabledDate: disabledDeliveryTime
      }
    }
  ]
})

const rowSelection = computed<TableProps['rowSelection']>(() => {
  return {
    selectedRowKeys: state.selectedRowKeys,
    getCheckboxProps: record => ({
      disabled: isDisabled(record.purchaseStatus)
    }),
    onChange: onSelectRow
  }
})

function onCompanyChange(e: any, record: any) {
  state.logisticsCompanies.forEach(item => {
    if (item.value === e) {
      record.logisticsCompanyName = item.name
    }
  })
}

function onSelectRow(selectedRowKeys: Key[], selectedRows: any) {
  state.selectedRows = selectedRows
  state.selectedRowKeys = selectedRowKeys
}

const disabledDate = (current: any) => {
  return current && current < dayjs(state.orderInfo.deliveryTime)
}

const disabledDeliveryTime = (current: any) => {
  return current && current > dayjs()
}

async function onSave() {
  if (state.selectedRowKeys.length === 0) {
    Message.warning('请先选择需要发货的采购单~')
    return
  }

  const checkList = [formRef.value.validate(), tableRef.value.validate()]
  Promise.all(checkList)
    .then(() => {
      Message.success('success submit!!')
    })
    .catch(() => {
      Message.error('error submit!!')
      return false
    })
  // await formRef.value.validate()
  // await tableRef.value.validate()
}

function clearValidate() {
  formRef.value.clearValidate()
  tableRef.value?.form.clearValidate()
}
</script>

<template>
  <y-form ref="formRef" :items="formItems" :model="state.orderInfo"></y-form>
  <y-table
    ref="tableRef"
    :data="state.tableData"
    :columns="columns"
    no-pagination
    seq
    :scroll="{ y: 300 }"
    :row-selection="rowSelection"
  >
  </y-table>

  <y-divider>
    <y-space>
      <y-btn label="确认发货" primary @click="onSave()" />
      <y-btn label="清空校验规则" @click="clearValidate()" />
    </y-space>
  </y-divider>
</template>
