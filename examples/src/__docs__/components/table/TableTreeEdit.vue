<script setup lang="ts">
import { TableColumn } from '@ygp/ygp-design-vue'
import { computed, reactive, ref } from 'vue'

const clsOptions = [
  { type: '1', name: '一年级一班' },
  { type: '2', name: '一年级二班' }
]
const columns = computed<TableColumn[]>(() => [
  {
    title: '姓名',
    dataIndex: 'name',
    item: { type: 'input' },
    editable: true,
    required: true,
    customHeaderCell: () => ({
      class: 'required'
    })
    // editable: ({ record }) => record.id === editId,
  },
  {
    title: '班级',
    dataIndex: 'cls',
    item: {
      type: 'select',
      options: clsOptions
    }
  }
])
const data = reactive([
  {
    id: '1',
    name: 'zhangsan',
    cls: '1',
    children: [
      { id: '3', name: 'zhangsan1', cls: '1' },
      { id: '4', name: 'zhangsan2', cls: '2' }
    ]
  },
  {
    id: '2',
    name: 'lisi',
    cls: '2',
    children: [
      { id: '5', name: 'lisi1', cls: '2' },
      { id: '6', name: 'lisi2', cls: '1' }
    ]
  }
])
</script>
<template>
  <y-table defaultExpandAllRows :columns="columns" :data="data" no-pagination />
</template>
