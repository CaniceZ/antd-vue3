<script setup lang="ts">
import { TableColumn } from '@ygp/ygp-design-vue'

const data = [
  {
    id: '1',
    clsName: '一年级一班',
    students: [
      { name: 'zhangsan', age: '8' },
      { name: 'lisi', age: '7' },
      { name: 'wangwu', age: '9' }
    ]
  },
  {
    id: '2',
    clsName: '一年级二班',
    students: [
      { name: 'zhangsan2', age: '5' },
      { name: 'lisi2', age: '6' },
      { name: 'wangwu2', age: '10' }
    ]
  },
  {
    id: '3',
    clsName: '一年级三班'
  }
]

const columns: TableColumn[] = [
  {
    title: '班级名称',
    dataIndex: 'clsName'
  },
  {
    title: '班级人数',
    dataIndex: 'num'
  }
]
const stuColumns: TableColumn[] = [
  { title: '学生姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' }
]
function rowClassName(record: any) {
  return record.students?.length ? '' : 'no-expanded'
}
</script>
<template>
  <y-table
    :data="data"
    :columns="columns"
    :rowClassName="rowClassName"
    no-pagination
  >
    <template #body-cell-num="{ record }">{{
      record.students?.length || 0
    }}</template>
    <template #expandedRowRender="{ record }">
      <y-table
        v-if="record.students?.length"
        :data="record.students"
        :columns="stuColumns"
        no-pagination
      />
    </template>
  </y-table>
</template>
<style lang="less" scoped>
:deep(.no-expanded) {
  .ant-table-row-expand-icon {
    display: none;
  }
}
</style>
