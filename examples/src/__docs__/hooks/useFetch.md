# useFetch 加载异步数据

传入一个接口或者方法返回一个包含获取的结果,loading,以及回调函数的数组

## 基础用法 1

```html
<template>
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
  const [tableData] = useFetch(getData)
</script>
```

## 基础用法 2

```html
<template>
  <y-btn :loading="fetchLoading" label="获取数据" />
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
  const [tableData, fetchLoading] = useFetch(async () => {
    const res = await getData({ params1: '1', params2: '2' })
    return res
  })
</script>
```

## 基础用法 3

```html
<template>
  <y-btn :loading="fetchLoading" label="获取数据" />
  <y-table :columns="columns" :data="tableData" />
</template>
<script lang="ts" setup>
  import { handleInfo } from '/@/api/common'
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
  const [data, fetchLoading, handle] = useFetch(async () => {
    const res = await handleInfo({ params: params1 })
    let list = []
    res?.forEach((row, index) => {
      list.push([])
      if (row.name === '必选字段') {
        list.push(row.name)
      }
    })
    return res
  })
  const tableData = await handle()
</script>
```
