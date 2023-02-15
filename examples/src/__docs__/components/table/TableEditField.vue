<script setup lang="ts">
import { TableColumn } from '@ygp/ygp-design-vue'
import { computed, reactive, ref } from 'vue'

const clsOptions = [
  { type: '1', name: '一年级一班' },
  { type: '2', name: '一年级二班' }
]
const editRow = ref()
const columns = computed<TableColumn[]>(() => [
  {
    title: '姓名',
    dataIndex: 'name',
    editable: ({ record }) => record === editRow.value
  },
  {
    title: '班级',
    dataIndex: 'clsName',
    editable: ({ record }) => record === editRow.value,
    item: ({ record }) => ({
      name: 'cls',
      type: 'select',
      options: clsOptions,
      onChange(val, { label }) {
        Object.assign(record, { clsName: val ? label : '' })
      }
    })
  }
])
const data = reactive([
  {
    id: '1',
    name: 'zhangsan',
    cls: '1',
    clsName: '一年级一班'
  },
  {
    id: '2',
    name: 'lisi',
    cls: '2',
    clsName: '一年级二班'
  }
])
</script>
<template>
  {{ data }}
  <y-table defaultExpandAllRows :columns="columns" :data="data" no-pagination>
    <template #body-cell-operation="{ record }">
      <y-btn
        v-if="record === editRow"
        primary
        label="保存"
        @click="editRow = void 0"
      />
      <y-btn
        v-if="!editRow && record !== editRow"
        primary
        label="编辑"
        @click="editRow = record"
      />
    </template>
  </y-table>
</template>
