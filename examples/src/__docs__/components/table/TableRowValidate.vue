<script setup lang="ts">
import { TableColumn } from '@ygp/ygp-design-vue'
import { computed, reactive, ref } from 'vue'

const clsOptions = [
  { type: '1', name: '一年级一班' },
  { type: '2', name: '一年级二班' }
]
const tableRef = ref()
const columns = computed<TableColumn[]>(() => [
  {
    title: '姓名',
    dataIndex: 'name',
    required: true
  },
  {
    title: '班级',
    dataIndex: 'clsName',
    required: true,
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
async function onVaidate(index) {
  // await tableRef.value?.form.validateFields([`${index}.name`, `${index}.cls`])
  await tableRef.value?.form.validateFields(
    ['name', 'cls'].map(field => `${index}.${field}`)
  )
}

const data = reactive([
  {},
  {},
  {},
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
  <y-table
    ref="tableRef"
    editable
    :columns="columns"
    :data="data"
    no-pagination
  >
    <template #body-cell-operation="{ record, index }">
      <y-btn primary label="点击单行校验" @click="onVaidate(index)" />
    </template>
  </y-table>
</template>
