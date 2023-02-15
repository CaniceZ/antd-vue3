<script lang="ts" setup>
import { TableColumn, GlobalConfig } from '@ygp/ygp-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'

const columns = ref<TableColumn[]>([
  {
    title: '仓库编码',
    dataIndex: 'warehouseCode',
    fixed: true
  },
  {
    title: '仓库名称',
    dataIndex: 'warehouseName'
  },
  {
    title: '仓库类型',
    dataIndex: 'warehouseTypeName'
  },
  {
    title: '是否默认仓',
    dataIndex: 'defaultWarehouse',
    customRender: ({ text }) => (text === 1 ? '是' : '否')
  },
  {
    title: '所在省份',
    dataIndex: 'provinceName'
  },
  {
    title: '所在城市',
    dataIndex: 'cityName'
  },
  {
    title: '所在区域',
    dataIndex: 'districtName'
  },
  {
    title: '详细地址',
    dataIndex: 'address'
  },
  {
    title: '联系人',
    dataIndex: 'consigneeName'
  },
  {
    title: '联系电话',
    dataIndex: 'consigneeMobile'
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ text }) => (text === 1 ? '启用' : '停用')
  }
])

const data = Array(15)
  .fill((row: any) => void 0)
  .map((item, index) => ({
    id: '10000' + (index + 1),
    warehouseCode: 'CS123' + (index + 1),
    warehouseName: '番禺仓',
    warehouseType: 4,
    warehouseTypeName: 'test' + (index + 1),
    defaultWarehouse: 0,
    status: 1,
    countryName: null,
    countryCode: null,
    provinceName: '广东省',
    provinceCode: '440000000000',
    cityName: '广州市',
    cityCode: '440100000000',
    districtName: '番禺区',
    districtCode: '440113000000',
    townStreetName: '大石街道',
    townStreetCode: '440113012000',
    address: '测试测试1234234',
    consigneeName: '超哥',
    consigneeMobile: '18680530000'
  }))

const tableRef = ref()

function onEdit(props: any) {
  console.log(props)
}

function onSetThead() {
  tableRef.value.setHeader()
}

function onSetProps(option: { key: string; value: [string | boolean] }) {
  tableRef.value.setTableProps(option)
}

onMounted(() => {
  // 需要先全局设置 appName(系统简称) 和 userCode(当前登录用户的userCode)
  GlobalConfig.set({
    appConfig: {
      appName: 'pms',
      userCode: 'test123'
    }
  })
})
</script>

<template>
  <y-table-setting-btn
    style="margin-bottom: 16px"
    tableKey="testList"
    @setHeader="onSetThead"
    @setTableProps="onSetProps"
  >
    <template #set-header-btn>
      <y-btn label="自定义setHeader" />
    </template>
    <template #set-size-btn>
      <y-btn label="自定义表格属性" />
    </template>
    <template #prefix>
      <y-btn link>测试</y-btn>
    </template>
    <template #suffix>
      <SearchOutlined />
    </template>
  </y-table-setting-btn>
  <!-- <y-btn style="margin: 16px 0" @click="onSetThead">表头记忆配置</y-btn> -->
  <y-table
    ref="tableRef"
    tableKey="testList"
    :data="data"
    :columns="columns"
    config-thead
    seq
    :prop-map="{ operation: 'opt' }"
  >
    <template #toolbar>
      <y-space>
        <div>批量操作</div>
        <y-btn>导出</y-btn>
      </y-space>
    </template>
    <template #body-cell-opt="{ record }">
      <y-btn label="编辑" link small @click="onEdit(record)" />
      <y-btn label="日志" link small />
    </template>
  </y-table>
</template>
