# useAsync 包裹异步方法

useAsync 需要传入一个接口，返回包裹该接口的异步函数以及该函数执行状态的 loading

## 基础用法

```html
<template>
  <y-btn :loading="dataLoading" label="查询表格数据" />
  <y-table :columns="columns" :data="tableData" />
</template>
<script lang="ts" setup>
  import { getData } from '/@/api/common'
  const columns: TableColumn[] = ref([
    {
      title: '名称',
      width: 150,
      resizable: true,
      dataIndex: 'name'
    },
    {
      title: '状态',
      dataIndex: 'status'
    }
  ])
  const [handleData, dataLoading] = useAsync(getData)
  const tableData = await handleData()
</script>
```
