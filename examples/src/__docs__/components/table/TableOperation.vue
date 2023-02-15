<script lang="ts" setup>
import { TableColumn } from '@ygp/ygp-design-vue'
import { ref } from 'vue'

const columns = ref<TableColumn[]>([
  {
    title: '自定义操作列',
    key: 'opt',
    width: 300,
    fixed: true,
    align: 'left'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status'
  },
  {
    title: '名称',
    key: 'name',
    dataIndex: 'name'
  }
])

const columns2 = ref<TableColumn[]>([
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status'
  },
  {
    title: '名称',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: '自定义操作列',
    key: 'operation',
    // width: 300,
    fixed: 'right',
    align: 'left',
    showNum: 2
  }
])

const data = ref([
  {
    id: '1',
    name: 'iPhone13',
    status: '已发布'
  },
  {
    id: '2',
    name: 'iPhone13 pro',
    status: '已发布'
  },
  {
    id: '3',
    name: 'iPhone14',
    status: '未发布'
  }
])

function detail(props: any) {
  console.log(props)
}
</script>

<template>
  <y-table :data="data" :columns="columns" :propMap="{ operation: 'opt' }">
    <template #body-cell-opt="props">
      <y-space>
        <y-btn small link label="查看明细" @click="detail(props)" />
        <y-btn small link label="编辑" @click="detail(props)" />
        <y-btn small link danger label="删除" @click="detail(props)" />
        <y-btn small link label="备注" @click="detail(props)" />
        <y-btn small link label="日志" @click="detail(props)" />
      </y-space>
    </template>
  </y-table>

  <div style="margin-top: 16px">
    showNum 可设置展示的按钮数量，超出的操作按钮将会收起，默认展示 3 个
  </div>
  <y-table :data="data" :columns="columns2">
    <template #body-cell-operation="props">
      <y-btn small link label="查看明细" @click="detail(props)" />
      <y-btn small link label="编辑" @click="detail(props)" />
      <y-btn small link danger label="删除" @click="detail(props)" />
      <y-btn small link label="备注" @click="detail(props)" />
      <y-btn small link label="日志" @click="detail(props)" />
    </template>
  </y-table>
</template>
