# y-search-table 查询表格

可通过配置化实现的查询表格组件

## API

## 基本用法

```vue demo src="./search-table/SearchTableBasic.vue"

```

api:props

| 属性名           | 说明                          | 类型                | 默认值                   |
| ---------------- | ----------------------------- | ------------------- | ------------------------ |
| model            | 表单数据                      | object              | {}                       |
| data             | 表格数据                      | object[]            | []                       |
| items            | 表单项配置列表                | [FormItem]()[]      | []                       |
| columns          | 表格列配置列表                | [TableColumn]()[]   | []                       |
| visibleLine      | 搜索表单默认显示行数          | number              | 2                        |
| propMap          | 自定义字段名                  | {operation: string} | {operation: 'operation'} |
| exportBtnProps   | 导出按钮属性扩展              | YBtn.props          | {}                       |
| form-[FormProps] | 通过 `form-` 前缀透传表单属性 |
| ...其余属性      | 透传至内置默认 table          |

api:emits

| 事件名 | 说明             | 回调参数 |
| ------ | ---------------- | -------- |
| search | 搜索按钮回调事件 |
| export | 导出按钮回调事件 |
| reset  | 重置按钮回调事件 |

api:methods

| 方法名   | 说明                         | 参数 | 返回值 |
| -------- | ---------------------------- | ---- | ------ |
| search   | 搜索按钮点击事件             |
| export   | 导出按钮点击事件             |
| reset    | 重置按钮点击事件             |
| toggle   | 切换搜索表单展开/收起状态    |
| expand   | 展开搜索表单                 |
| collapse | 收起搜索表单                 |
| form     | formRef，搜索表单的引用对象  |
| table    | tableRef，默认表格的引用对象 |

api:slots

| 插槽名                 | 说明                                                                            | props |
| ---------------------- | ------------------------------------------------------------------------------- | ----- |
| top-action             | 顶部按钮集插槽                                                                  |
| tabs                   | tabs 插槽                                                                       |
| default                | 默认插槽，可用于替换默认表格，同时 `y-search-table` 丢失默认 `table` 的属性透传 |
| form-[Form.slotname]   | 透传至内置默认 form                                                             |
| table-[Table.slotname] | 透传至内置默认 table                                                            |

## 表格动态插槽

```vue demo src="./search-table/SearchTableDynamicSlot.vue"

```

## 使用 fit 属性自适应固高容器

```vue demo
<script lang="ts" setup></script>
<template>
  <y-row style="height: 300px" :gutter="10">
    <y-col style="height: 100%" :span="12">
      <y-search-table
        fit
        :items="[{ name: 'name', label: '姓名', span: 20 }]"
        form-labelWidth="60px"
        :columns="[
          { title: '姓名', dataIndex: 'name' },
          { title: '年龄', dataIndex: 'age' }
        ]"
        :data="
          Array(10)
            .fill(void 0)
            .map((_, i) => ({ id: i, name: `zhangsan${i}`, age: i }))
        "
        :scroll="{ y: 'calc(100% - 39px)' }"
        no-pagination
      />
    </y-col>
    <y-col style="height: 100%" :span="12">
      <y-search-table
        fit
        :items="[{ name: 'name', label: '姓名', span: 20 }]"
        form-labelWidth="70px"
        :columns="[
          { title: '姓名', dataIndex: 'name' },
          { title: '年龄', dataIndex: 'age' }
        ]"
        :data="
          Array(10)
            .fill(void 0)
            .map((_, i) => ({ id: i, name: `zhangsan${i}`, age: i }))
        "
        :scroll="{ y: 'calc(100% - 39px)' }"
        :pagination="{ pageSize: 5 }"
      />
    </y-col>
  </y-row>
  <div></div>
</template>
```
