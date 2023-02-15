# usePage 分页查询

## 基础用法 1

这是一个获取数据的方法，传入除 page,limit 之外的自定义入参,返回 tableProps（包含 loading,pagination,data,onChange,）以及 fetchData

```html
<script lang="ts" setup>
  import { getData } from '/@/api/basic'
  const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' }
  ]
  const { fetchData, tableProps } = usePage(
    async params =>
      await getData({
        params1: '1',
        params2: '2'
      })
  )
  onMounted(() => {
    fetchData()
  })
</script>
<template>
  <y-table :columns="columns" v-bind="tableProps" ellipsis />
</template>
```

## 基础用法 2

这是一个获取数据的方法，传入接口（钩子函数默认给定了 page,limit）,返回一个包含 tableProps 对象（包含 loading,pagination,data,onChange,）以及 fetchData

```html
<template>
  <y-table :columns="columns" v-bind="tableProps" ellipsis />
</template>
<script lang="ts" setup>
  import { getData } from '/@/api/basic'
  const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' }
  ]
  const { tableProps } = usePage(getData)
</script>
```
