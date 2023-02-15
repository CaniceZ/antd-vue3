<script setup lang="ts">
import { computed } from 'vue'
import { TableColumn } from '@ygp/ygp-design-vue'
import { useSelection, usePage } from '@ygp/ygp-design-vue/hooks'

const item = {
  id: 1,
  shopName: '广州市易工品贸易旗舰店',
  afterSales: null,
  status: '已完成',
  realpay: 40.58,
  skuList: []
}

const allData = Array(2)
  .fill(void 0)
  .map((_, i) => ({
    ...item,
    id: String(i),
    skuList: Array(2)
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

const { tableProps } = usePage(async (param: any) => {
  const { list, total } = await getPage(param)
  list?.forEach((row: any) => {
    row.skuList?.forEach((item: any) => {
      item['parent'] = row
    })
  })
  return { list, total }
})

function shareCustomCell(record: any, _: number, column: any) {
  if (record.skuCode) {
    if (column.dataIndex === 'price') {
      return { colSpan: 1 }
    } else {
      if (record === record.parent?.skuList?.[0]) {
        return {
          colSpan: 1,
          rowSpan: record.parent?.skuList?.length || 1,
          style: { verticalAlign: 'top' }
        }
      } else {
        return { colSpan: 1, rowSpan: 0 }
      }
    }
  } else {
    return { colSpan: 0 }
  }
}

const columns = computed<TableColumn[]>(() => [
  {
    title: 'SKU号/商品名称',
    dataIndex: 'skuCode',
    customCell: (record: any) => {
      if (record.skuCode) {
        return { colSpan: 2 }
      } else {
        return { colSpan: 6 }
      }
    }
  },
  {
    title: '销售单价/数量',
    dataIndex: 'price',
    width: 110,
    align: 'right',
    customCell: (...args) => {
      return {
        ...shareCustomCell(...args),
        style: { verticalAlign: 'top' }
      }
    }
  },
  {
    title: '店铺名称',
    dataIndex: 'shopName',
    align: 'center',
    customCell: shareCustomCell,
    customRender: ({ record }) => record.parent?.shopName
  },
  {
    title: '售后',
    dataIndex: 'afterSales',
    align: 'center',
    customCell: shareCustomCell,
    customRender: ({ record }) => record.parent?.afterSales || '无'
  },
  {
    title: '交易状态',
    dataIndex: 'status',
    align: 'center',
    width: 90,
    customCell: shareCustomCell,
    customRender: ({ record }) => record.parent?.status
  },
  {
    title: '订单实付款',
    dataIndex: 'realpay',
    align: 'center',
    customCell: shareCustomCell
  }
])
const { selectedKeys, selectedRows, rowSelection } = useSelection()
function rowClassName(record: any) {
  if (record.skuCode) {
    return 'sku-row'
  } else {
    return 'table-striped'
  }
}
</script>

<template>
  selectedKeys: {{ selectedKeys }}
  <br />
  selectedRows length: {{ selectedRows.length }}
  <y-table
    class="my-table"
    :columns="columns"
    v-bind="tableProps"
    :rowSelection="rowSelection"
    childrenColumnName="skuList"
    defaultExpandAllRows2
    no-hover
    :indentSize="0"
    :rowClassName="rowClassName"
  >
    <template #body-cell-skuCode="{ record }">
      <template v-if="record.skuCode">
        <div style="width: 100%">
          <y-row type="flex">
            <y-col style="width: 70px">
              <div
                style="
                  width: 70px;
                  height: 70px;
                  padding: 5px;
                  border: 1px solid #eee;
                "
              >
                <y-image
                  style="width: 100%; height: 100%"
                  src="https://aliyuncdn.antdv.com/vue.png"
                />
              </div>
            </y-col>
            <y-col style="flex: 1; min-width: 0; padding-left: 10px">
              <p>{{ record.skuName }}</p>
              <span>SKU号：{{ record.skuCode }}</span>
            </y-col>
          </y-row>
        </div>
      </template>
      <template v-else>
        <y-space>
          <y-tag
            style="
              color: #ff6720;
              border-color: #fdbd9d;
              background-color: #fff2e9;
            "
            >易工品PC商城</y-tag
          >
          <span>销售单号：148901283901231</span>
          <span>下单时间：2022年7月28日 15:54:08</span>
        </y-space>
      </template>
    </template>
    <template #body-cell-price="{ record }">
      <p>{{ record.price }}元</p>
      <div>{{ record.num }}{{ record.unit }}</div>
    </template>
    <template #body-cell-realpay="{ record }">
      {{ record.parent?.realpay }}元<br />
      （运费0.00元，优惠20.00元）<br />
      全额信用付
    </template>
  </y-table>
</template>

<style lang="less" scoped>
::v-deep(.my-table) {
  tbody.ant-table-tbody > tr.sku-row > td.ant-table-selection-column {
    display: none;
  }
  .ant-table-header {
    margin-bottom: 10px;
    .ant-table-resize-handle {
      display: none;
    }
    th::before {
      width: 0 !important;
    }
  }
  .table-striped td {
    background-color: #fafafa !important;
  }
  .ant-table-header thead th,
  .table-striped td {
    background-color: #fafafa;
  }
  .ant-table-header {
    border-left: 1px solid #f0f0f0;
    border-right: 1px solid #f0f0f0;
  }

  .ant-table-tbody > tr > td {
    border-left: 1px solid #f0f0f0;
  }

  .ant-table-container::before,
  .ant-table-container::after {
    width: 0;
  }
  .ant-table-body {
    overflow: hidden !important;
  }
}
</style>
