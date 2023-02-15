# y-order-table 订单表格

> 关于取名 `y-order-table`：想了好多关于该场景样式的组件名称，均不好记忆，最终取名为 `order-table`，一是因为属于 `y-table` 组件的衍生，二是因为这个最先应用在订单平台，欢迎有相似场景需求的都可以使用该组件，不一定是订单相关的需求

继承 `y-table` 的所有属性、插槽、实例方法，目前适用在订单中台的表格样式场景

## 基础用法

设置 defaultCoolapseNum > 0 指定子集数可展开/收起，默认为 10

设置 defaultCollapseNum = 0 展示全部子集

设置 `rowMargin="32px"` 自定义行距，默认是 `16px`

```vue demo
<script lang="ts" setup>
import { computed } from 'vue'
import { TableColumn } from '@ygp/ygp-design-vue'
// @ts-ignore
import { useSelection, usePage } from '@ygp/ygp-design-vue/hooks'
// @ts-ignore
import { filterUnit, filterMoney } from '@ygp/ygp-design-vue/utils'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'

const item = {
  id: 1,
  shopName: '广州市易工品贸易旗舰店',
  afterSales: null,
  status: '已完成',
  realpay: 40.58,
  skuList: []
}

const allData = Array(4)
  .fill(void 0)
  .map((_, i) => ({
    ...item,
    id: String(i),
    skuList: Array(4)
      .fill(void 0)
      .map((_, j) => ({
        id: `${i}${j}`,
        skuCode: `100${i}${j}`,
        skuName: '大西洋 不锈钢焊丝，304，H08Cr21Ni10Si，规格xxx',
        price: 20.29,
        num: 2,
        unit: '箱'
      }))
  }))

function getPage({ page, limit }: { page: number; limit: number }) {
  // Message.info(`分页: ${JSON.stringify({ page, limit })}`)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        list: allData.slice((page - 1) * limit, page * limit),
        total: allData.length
      })
    }, 1500)
  })
}

const { tableProps } = usePage(getPage, { pageSize: 2 })

const columns = computed<TableColumn[]>(() => [
  {
    title: 'SKU号/商品名称',
    dataIndex: 'skuCode',
    style: {
      verticalAlign: 'top'
    }
  },
  {
    title: '销售单价/数量',
    dataIndex: 'price',
    width: 110,
    align: 'right',
    style: {
      borderLeft: 0,
      verticalAlign: 'top'
    },
    customRender: () => [filterMoney(20.29), filterUnit(20, '瓶')].join('\n')
  },
  {
    title: '店铺名称',
    dataIndex: 'shopName',
    align: 'center',
    rowSpan: true,
    customRender: ({ parentRecord }) => parentRecord?.shopName
  },
  {
    title: '售后',
    dataIndex: 'afterSales',
    align: 'center',
    rowSpan: true,
    width: 60,
    customRender: ({ parentRecord }) => parentRecord?.afterSales
  },
  {
    title: '交易状态',
    dataIndex: 'status',
    align: 'center',
    width: 90,
    rowSpan: true,
    customRender: ({ parentRecord }) => parentRecord?.status
  },
  {
    title: '订单实付款',
    dataIndex: 'realpay',
    align: 'center',
    rowSpan: true,
    customRender: ({ parentRecord }) => parentRecord?.realpay
  }
])
</script>
<template>
  <y-divider left
    >设置 defaultCoolapseNum > 0 指定子集数可展开/收起，默认为10</y-divider
  >
  <y-order-table
    childrenColumnName="skuList"
    :columns="columns"
    :defaultCollapseNum="2"
    rowMargin="32px"
    emptyCell="-"
    v-bind="tableProps"
  >
    <template #body-row-parent="{ record }">
      这里是 parent-row，{{ record.shopName }}
    </template>
  </y-order-table>
  <y-divider left>设置 defaultCollapseNum = 0 展示全部子集</y-divider>
  <y-order-table
    childrenColumnName="skuList"
    :columns="columns"
    :defaultCollapseNum="0"
    rowMargin="32px"
    emptyCell="-"
    v-bind="tableProps"
  >
    <template #body-row-parent="{ record }">
      这里是 parent-row，{{ record.shopName }}
    </template>
  </y-order-table>
</template>
```

## 配合 useSelection 多选

```vue demo
<script lang="ts" setup>
import { computed } from 'vue'
import { TableColumn } from '@ygp/ygp-design-vue'
// @ts-ignore
import { useSelection, usePage } from '@ygp/ygp-design-vue/hooks'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'

const item = {
  id: 1,
  shopName: '广州市易工品贸易旗舰店',
  afterSales: null,
  status: '已完成',
  realpay: 40.58,
  skuList: []
}

const allData = Array(4)
  .fill(void 0)
  .map((_, i) => ({
    ...item,
    id: String(i),
    skuList: Array(4)
      .fill(void 0)
      .map((_, j) => ({
        id: `${i}${j}`,
        skuCode: `100${i}${j}`,
        skuName: '大西洋 不锈钢焊丝，304，H08Cr21Ni10Si，规格xxx',
        price: 20.29,
        num: 2,
        unit: '箱'
      }))
  }))

function getPage({ page, limit }: { page: number; limit: number }) {
  // Message.info(`分页: ${JSON.stringify({ page, limit })}`)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        list: allData.slice((page - 1) * limit, page * limit),
        total: allData.length
      })
    }, 1500)
  })
}

const { tableProps } = usePage(getPage, { pageSize: 2 })
const { selectedKeys, rowSelection } = useSelection()

const columns = computed<TableColumn[]>(() => [
  {
    title: 'SKU号/商品名称',
    dataIndex: 'skuCode'
  },
  {
    title: '销售单价/数量',
    dataIndex: 'price',
    width: 110,
    align: 'right',
    style: {
      borderLeft: 0
    }
  },
  {
    title: '店铺名称',
    dataIndex: 'shopName',
    align: 'center',
    rowSpan: true,
    customRender: ({ parentRecord }) => parentRecord?.shopName
  },
  {
    title: '售后',
    dataIndex: 'afterSales',
    align: 'center',
    rowSpan: true,
    width: 60,
    customRender: ({ parentRecord }) => parentRecord?.afterSales
  },
  {
    title: '交易状态',
    dataIndex: 'status',
    align: 'center',
    width: 90,
    rowSpan: true,
    customRender: ({ parentRecord }) => parentRecord?.status
  },
  {
    title: '订单实付款',
    dataIndex: 'realpay',
    align: 'center',
    rowSpan: true,
    customRender: ({ parentRecord }) => parentRecord?.realpay
  }
])
</script>
<template>
  <y-divider left>已选订单：{{ selectedKeys }}</y-divider>
  <y-order-table
    childrenColumnName="skuList"
    :columns="columns"
    :defaultCollapseNum="2"
    :rowSelection="rowSelection"
    emptyCell="-"
    v-bind="tableProps"
  >
    <template #body-row-parent="{ record }">
      这里是 parent-row，{{ record.shopName }}
    </template>
  </y-order-table>
</template>
```
