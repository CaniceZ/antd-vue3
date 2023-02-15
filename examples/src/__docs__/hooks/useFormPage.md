# useFormPage 分页查询

## 基础用法 1

这是一个适用于搜索表格的钩子函数，传入除 page,limit 之外的自定义入参，useFormPage 钩子内部会合并参数,返回 formData,fetchData，以及 formTableProps

```html
<script lang="ts" setup>
    import { FormItem, TableColumn } from '@ygp/ygp-design-vue'
    import { fetch } from '/@/api/basic';
      const items: FormItem[] = [
    {
      name: 'username',
      label: '姓名'
    },
    {
      name: 'age',
      label: '年龄',

    },
   ]
   const columns: TableColumn[] = [
    {
      title: '姓名',
      dataIndex: 'username',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
  ]
    const { formData, fetchData, formTableProps } = useFormPage(async (params) => {
      return await fetch({
        ...formData，
        params1:'1'
      });
    });
    onMounted(()=>{
        fetchData()
    })
</script>
<template>
  <y-search-table
    :model="formData"
    :columns="columns"
    :items="items"
    v-bind="formTableProps"
    ellipsis
  >
  </y-search-table>
</template>
```

## 基础用法 2

这是一个适用于搜索表格的钩子函数，传入接口,返回 formData,fetchData，以及 formTableProps

```html
<script lang="ts" setup>
  import { FormItem, TableColumn } from '@ygp/ygp-design-vue'
  import { fetch } from '/@/api/basic'
  const items: FormItem[] = [
    {
      name: 'username',
      label: '姓名'
    },
    {
      name: 'age',
      label: '年龄'
    }
  ]
  const columns: TableColumn[] = [
    {
      title: '姓名',
      dataIndex: 'username'
    },
    {
      title: '年龄',
      dataIndex: 'age'
    }
  ]

  const { formData, formTableProps } = useFormPage(fetch)
</script>
<template>
  <y-search-table
    :model="formData"
    :columns="columns"
    :items="items"
    v-bind="formTableProps"
    ellipsis
  >
  </y-search-table>
</template>
```
