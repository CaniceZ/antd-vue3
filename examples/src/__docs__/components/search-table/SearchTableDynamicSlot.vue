<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormItem, TableColumn } from '@ygp/ygp-design-vue'

const toggle = ref()
const columns: TableColumn[] = [
  { title: '姓名', dataIndex: 'name' },
  { title: '班级', dataIndex: 'clsName' }
]
const data = [
  { id: '1', name: 'zhangsan', clsName: '一年级一班' },
  { id: '2', name: 'lisi', clsName: '一年级二班' }
]
const formData = reactive({})
const items: FormItem[] = [{ name: 'name', label: '姓名' }]
const customRow = ref()
</script>
<template>
  <y-divider left> 显示自定义名称：<y-switch v-model="toggle" /> </y-divider>
  <y-search-table
    :model="formData"
    :items="items"
    :columns="columns"
    :data="data"
    :form-defaultSpan="12"
  >
    <template #body-cell-name="{ record }" v-if="toggle">
      自定义名称: {{ record.name }}
    </template>
    <template #body-cell="{ column, record }">
      <template
        v-if="column.dataIndex === 'clsName' && customRow?.id === record.id"
      >
        自定义班级：{{ record.clsName }}
      </template>
    </template>
    <template #body-cell-operation="{ record }">
      <y-btn
        v-if="customRow?.id === record.id"
        label="取消"
        @click="customRow = void 0"
      />
      <y-btn
        v-if="customRow?.id !== record.id"
        label="显示自定义班级"
        @click="customRow = record"
      />
    </template>
  </y-search-table>
</template>
