<script setup lang="ts">
import { ref } from 'vue'
import { TableColumn } from '@ygp/ygp-design-vue'

const toggle = ref()
const columns: TableColumn[] = [
  { title: '姓名', dataIndex: 'name' },
  { title: '班级', dataIndex: 'clsName' }
]
const data = [
  { id: '1', name: 'zhangsan', clsName: '一年级一班' },
  { id: '2', name: 'lisi', clsName: '一年级二班' }
]
const customRow = ref()
</script>
<template>
  <y-divider left> 显示自定义名称：<y-switch v-model="toggle" /> </y-divider>
  <y-table :columns="columns" :data="data">
    <template #body-cell-name="{ record }" v-if="toggle">
      自定义名称: {{ record.name }}
    </template>
    <template #body-cell="{ column, record }">
      <template
        v-if="column.dataIndex === 'clsName' && customRow?.id === record.id"
      >
        自定义班级: {{ record.clsName }}
      </template>
    </template>
    <template #body-cell-operation="{ record }">
      <y-btn
        v-if="customRow?.id === record.id"
        label="取消"
        @click="customRow = void 0"
      />
      <y-btn v-else label="显示自定义班级" @click="customRow = record" />
    </template>
  </y-table>
</template>
