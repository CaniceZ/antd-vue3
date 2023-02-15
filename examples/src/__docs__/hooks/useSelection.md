# useSelection 表格行选择与操作

由于在 `y-table` 中使用 `rowSelection` 需要定义比较多的变量，这里改成用钩子函数来实现更优雅、维护性更好的写法

## 写法

```vue
<script lang="ts" setup>
import { useSelection } from '@ygp/ygp-design-vue/hooks'

const { selectedRows, selectedKeys, rowSelection } = useSelection({
  preserveSelectedRowKeys: true,
  onChange() {
    // selection change event
  }
})
</script>
<template>
  <y-table ... v-bind="selectionProps" />
</template>
```

## 基础用法

```vue demo
<script lang="ts" setup>
import { usePage, useSelection } from '@ygp/ygp-design-vue/hooks'

const all = Array(20)
  .fill(void 0)
  .map((_, i) => ({ id: i + 1, name: `学生${i + 1}`, cls: `高一${i + 1}班` }))

const { tableProps } = usePage(
  ({ page, limit }) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          list: all.slice((page - 1) * limit, page * limit),
          total: all.length
        })
      }, 1500)
    })
  },
  {
    pageSize: 2,
    onChange() {
      cleanSelection()
    }
  }
)
const { selectedKeys, selectedRows, rowSelection, cleanSelection } =
  useSelection()
</script>
<template>
  <p>selectedKeys: {{ selectedKeys }}</p>
  <p>selectedRows: {{ selectedRows }}</p>
  <y-table
    v-bind="tableProps"
    :rowSelection="rowSelection"
    :columns="[
      { title: '姓名', dataIndex: 'name' },
      { title: '班级', dataIndex: 'cls' }
    ]"
  />
</template>
```

## 本地数据跨页全选

只对本地分页生效

```vue demo
<script lang="ts" setup>
import { useSelection } from '@ygp/ygp-design-vue/hooks'

const data = Array(20)
  .fill(void 0)
  .map((_, i) => ({ id: i + 1, name: `学生${i + 1}`, cls: `高一${i + 1}班` }))

const { selectedKeys, selectedRows, rowSelection, cleanSelection } =
  useSelection({
    selectAllPage: true,
    getCheckboxProps: record => ({
      disabled: record.id <= 5
    })
  })
</script>
<template>
  <y-divider left
    >通过 rowSelection: { selectAllPage: true } 实现跨页全选</y-divider
  >
  <p>selectedKeys: {{ selectedKeys }}</p>
  <p>selectedRows: {{ selectedRows }}</p>
  <p>一共 {{ data.length }} 条数据，已选 {{ selectedKeys.length }} 条</p>
  <y-table
    :data="data"
    :rowSelection="rowSelection"
    :pagination="{ pageSize: 2 }"
    :columns="[
      { title: '姓名', dataIndex: 'name' },
      { title: '班级', dataIndex: 'cls' }
    ]"
  />
  <y-divider left
    >通过插槽 header-cell-selection-title 实现全选单元格的自定义</y-divider
  >
  <y-table
    :data="[]"
    :rowSelection="rowSelection"
    :columns="[
      { title: '姓名', dataIndex: 'name' },
      { title: '班级', dataIndex: 'cls' }
    ]"
  >
    <template #header-cell-selection-title>
      <y-text class="text-color-primary" strong>custom</y-text>
    </template>
  </y-table>
</template>
```
