# y-table 表格

<a-btn label="a-table" href="https://next.antdv.com/components/table-cn" />

在完全继承 `a-table` 组件的属性、事件、插槽、方法的基础上，做了些不同程度的改变和属性优化，可以通过 <y-link blank href="https://next.antdv.com/components/table-cn" label="a-table" /> 查看原来的选项

<row-start />
<col-start />

原来的写法

```html
<a-table
  :dataSource="[]"
  :columns="[
      { title: '名称', dataIndex: 'name' },
      { title: '操作', dataIndex: 'operation' },
    ]"
>
  <template #bodyCell="{ column, text, record }">
    <template v-if="column.dataIndex === 'name'">
      <strong>{{ `\{\{ text \}\}` }}</strong>
    </template>
    <template v-if="column.dataIndex === 'operation'">
      <a-button type="link" size="small" @click="doSomething(record)"
        >编辑</a-button
      >
      <a-button type="link" size="small" @click="doSomething(record)"
        >详情</a-button
      >
      <a-button type="link" danger size="small" @click="doSomething(record)"
        >删除</a-button
      >
    </template>
  </template>
</a-table>
```

<col-end />
<col-start />

新写法

```html
<y-table :data="[]" :columns="[{ title: '名称', dataIndex: 'name' }]">
  <template #body-cell-name="{ text }">
    <strong>{{ `\{\{ text \}\}` }}</strong>
  </template>
  <template #body-cell-operation="{ record }">
    <y-btn label="编辑" @click="doSomething(record)" />
    <y-btn label="详情" @click="doSomething(record)" />
    <y-btn danger label="删除" @click="doSomething(record)" />
  </template>
</y-table>
```

<col-end />
<row-end />

## API

## 基本用法

**PS: TableColumn 的 `title` 支持 `\n` 换行**

```vue demo
<template>
  <y-form labelWidth="110px" :model="formData" inline>
    <y-form-item
      name="size"
      label="size"
      extra="表格大小"
      type="radio"
      :options="['small', 'middle', 'large']"
      :componentProps="{ button: true }"
    />
    <y-form-item
      name="noPagination"
      label="no-pagination"
      extra="无分页栏"
      type="radio"
      :options="[
        { type: true, name: 'true' },
        { type: false, name: 'false' }
      ]"
      :componentProps="{ button: true }"
    />
    <y-form-item
      name="ellipsis"
      label="ellipsis"
      extra="内容超出省略"
      type="radio"
      :options="[
        { type: true, name: 'true' },
        { type: false, name: 'false' }
      ]"
      :componentProps="{ button: true }"
    />
  </y-form>
  <y-divider />
  <y-table
    :columns="columns"
    :data="data"
    :size="formData.size"
    :pagination="{ pageSize: 1 }"
    :no-pagination="formData.noPagination"
    :ellipsis="formData.ellipsis"
  >
    <template #body-cell-operation="{ record }">
      <y-btn label="查看" type="primary" @click="onClick('查看', record)" />
      <y-btn label="操作1" @click="onClick('操作1', record)" />
      <y-btn label="操作2" @click="onClick('操作2', record)" />
      <y-btn label="操作3" @click="onClick('操作3', record)" />
      <y-btn label="操作4" @click="onClick('操作4', record)" />
      <y-btn label="操作5" @click="onClick('操作5', record)" />
      <y-btn label="删除" danger confirm @click="onClick('删除', record)" />
    </template>
  </y-table>
</template>

<script lang="ts" setup>
import { h, reactive, Fragment } from 'vue'
import { TableColumn, Notification } from '@ygp/ygp-design-vue'

const formData = reactive({
  size: 'small',
  noPagination: false,
  ellipsis: false
})

function onClick(type, item) {
  Notification.info({
    message: type,
    description: item.name
  })
  console.log(type, item)
}

const data = Array(3)
  .fill(void 0)
  .map((_, index) => ({
    name: '苹果' + (index + 1),
    status: 1,
    desc: '这里是很长很长很长很长很长很长很长很长很长的描述'
  }))

const columns: TableColumn[] = [
  {
    title: '名称\n换行',
    dataIndex: 'name'
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record, text, value }) => {
      return value === 1 ? '已出库' : '未出库'
    }
  },
  {
    title: '描述',
    dataIndex: 'desc'
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
]
</script>
```

## 可编辑表格

```vue demo
<template>
  <y-divider left>data</y-divider>
  {{ formData }}
  <y-divider left>编辑状态：<y-switch v-model="editable" /></y-divider>
  <y-table
    ref="tableRef"
    :columns="columns"
    :data="formData"
    :editable="editable"
  />
  <y-divider left>
    <y-space>
      <y-btn label="保存" @click="onSave()" primary />
      <y-btn label="清空校验规则" @click="clearValidate()" />
    </y-space>
  </y-divider>
</template>
<script lang="ts" setup>
import { TableColumn } from '@ygp/ygp-design-vue'
import { message } from 'ant-design-vue'
import { reactive, ref } from 'vue'

const editable = ref(true)
const tableRef = ref()
const formData = reactive([
  {
    id: Date.now(),
    name: '苹果',
    status: 0,
    statusName: '未出库',
    desc: '没货了'
  },
  {
    id: Date.now() + 1,
    name: '华为',
    status: 1,
    statusName: '已出库'
  }
])

async function onSave() {
  await tableRef.value?.validate()
  message.success('保存成功')
}

function clearValidate() {
  tableRef.value?.form.clearValidate()
}

const options = ref([])

setTimeout(() => {
  options.value = [{ value2: 'luffy' }, { value2: 'nami' }, { value2: 'zoro' }]
}, 8000)

const columns: TableColumn[] = [
  {
    title: '自动完成',
    dataIndex: 'autocomplete',
    type: 'autocomplete',
    required: true,
    item: () => {
      return {
        type: 'autocomplete',
        options: options.value,
        propMap: {
          value: 'value2'
        }
      }
    }
  },
  {
    title: '名称1',
    dataIndex: 'name1',
    required: true
  },
  {
    title: '名称2',
    dataIndex: 'name2',
    required: true
  },
  {
    title: '名称（已出库时禁用）',
    dataIndex: 'name',
    required: true,
    item({ record, index }) {
      return {
        disabled: record['status'] === 1,
        rules:
          index === 2
            ? [
                {
                  validator: async (_rule, value: string) => {
                    if (value && value !== '1234') {
                      return Promise.reject('第三行名称请一定要输入1234')
                    }
                    return Promise.resolve()
                  },
                  trigger: 'change'
                }
              ]
            : []
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    required: true,
    item: ({ record, index, column }) => {
      return {
        type: 'select',
        options: [
          { type: 0, name: '未出库' },
          { type: 1, name: '已出库' }
        ],
        onChange(val, option) {
          if (val || val === 0) {
            record['statusName'] = option.label
          } else {
            delete record['statusName']
          }
        }
      }
    }
  },
  {
    title: '未出库原因（已出库不可编辑）',
    dataIndex: 'desc',
    editable: ({ record }) => record['status'] === 0
  }
]

function onSubmit() {
  console.log('submit')
}
</script>
```

## 表格的部分编辑和部分校验

大部分业务场景中，需要用到表格的部分字段信息编辑和所选行数据的校验，因此可在单个`TableColumn`中使用`editable: true`，`required`在`item`里根据条件设置。

使用`tableRef.value.validate()`触发表格校验

```vue demo src="./table/TableEdit.vue"

```

<row-start />
<col-start />

## 表格头/底部滚动条 sticky 粘连

除了自带的 `sticky` 属性以外，还支持**全局配置对所有表格统一设置 `{appConfig: {tableSticky: {offsetHeader?: number, offsetScroll?: number}}}`**

```vue demo
<template>
  <y-form labelWidth="160px">
    <y-form-item label="设置全局offsetHeader">
      <y-slider
        v-model="sticky"
        :min="0"
        :max="120"
        :step="30"
        dots
        :marks="{ 0: 0, 30: 30, 60: 60, 90: 90, 120: 120 }"
        @change="onChange"
      />
    </y-form-item>
    <y-form-item label="设置全局offsetScroll">
      <y-slider
        v-model="offsetScroll"
        :min="0"
        :max="120"
        :step="10"
        dots
        :marks="{ 0: 0, 20: 20, 40: 40, 60: 60, 80: 80, 100: 100, 120: 120 }"
        @change="onChange2"
      />
    </y-form-item>
  </y-form>
  <y-divider />
  <y-table :columns="columns" :data="data" noPagination />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { GlobalConfig } from '@ygp/ygp-design-vue'

const sticky = ref(0)
const offsetScroll = ref(0)

function onChange(val) {
  GlobalConfig.set({
    appConfig: {
      tableSticky: {
        offsetHeader: val
      }
    }
  })
}
function onChange2(val) {
  GlobalConfig.set({
    appConfig: {
      tableSticky: {
        offsetScroll: val
      }
    }
  })
}

const data = Array(10)
  .fill(row => void 0)
  .map(() => ({ name: '苹果', status: '已出库' }))
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
  },
  {
    title: '字段1',
    dataIndex: 'field1'
  },
  {
    title: '字段2',
    dataIndex: 'field2'
  },
  {
    title: '字段3',
    dataIndex: 'field3'
  },
  {
    title: '字段4',
    dataIndex: 'field4'
  },
  {
    title: '字段5',
    dataIndex: 'field5'
  }
])
</script>
```

<col-end />
<col-start />

## 自定义操作列

`y-table` 组件中预设了 `v-slot:body-cell-operation` 用作预设操作列，默认 `{dataIndex: 'operation', key: 'operation', title: '操作', align: 'center', fixed: 'right', width: 120, showNum: 3}`

可通过在 `columns` 中添加一个 `key: 'operation'` 的配置项来自定义操作列属性

或通过设置 `propMap="{ operation: 'opt' }"` 来自定义操作列的 `dataIndex / key`

```vue demo src="./table/TableOperation.vue"

```

<col-end />
<row-end />

## 配置表头

`y-table`添加`configThead`属性即可，位置默认在表格右上角，配置表头不影响 fixed 的设置。

提供`setHeader`方法，可灵活自定义触发表头配置按钮的样式和位置。

此外根据 UI 设计稿提供了默认样式按钮`y-table-setting-btn` 组件，提供`setHeader`、`setSize`和`setTableProps`触发事件(`setTableProps`大于 1.0.0 版本可用)，以减少重复的样式编码。

自定义表格属性和配置表头增加记忆功能，需要先全局设置`appName`(系统简称) 和 `userCode`(当前登录用户的 userCode)

```vue demo src="./table/TableSetThead.vue"

```

api:props

| 属性名        | 说明                                                                               | 类型                                                                                                      | 默认值                                                                                                                                                                         |
| ------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data          | 原为 `dataSource` 属性，该属性为常用属性<br/>原属姓名较长，故改为通俗属性名 `data` | object[]                                                                                                  | []                                                                                                                                                                             |
| columns       | 表格列配置列表                                                                     | [TableColumn]()[]                                                                                         | []                                                                                                                                                                             |
| propMap       | 自定义字段名                                                                       | object                                                                                                    | {operation: 'operation'}                                                                                                                                                       |
| rowKey        | 定义每行的唯一 key                                                                 | string                                                                                                    | `ant-design-vue` 的默认值为 `key`<br />这里为了贴合我们的业务设为 `id`                                                                                                         |
| sticky        | 表格头、底部滚动条的粘性定位                                                       | boolean \|<br/>{offsetHeader?: number, <br/>offsetScroll?: number, <br/>getContainer?: () => HTMLElement} | 原属性默认没启用，现设置默认为 {offsetHeader: 0, offsetScroll: 40}<br/> `offsetScroll: 40`为 table 的 pagination 的高度<br/> `offsetScroll` 在 `noPagination: true` 时默认为 0 |
| addRow        | 用于自定义点击添加一行按钮时调用方法                                               | Function                                                                                                  | -                                                                                                                                                                              |
| configThead   | 配置表头，默认在表格右上角                                                         | boolean                                                                                                   | false                                                                                                                                                                          |
| no-pagination | 无分页栏                                                                           | boolean                                                                                                   | false                                                                                                                                                                          |
| editable      | 可编辑模式                                                                         | boolean                                                                                                   | false                                                                                                                                                                          |
| ellipsis      | 对所有 column 列启用 ellipsis: true                                                | boolean                                                                                                   | false                                                                                                                                                                          |
| seq           | 新增一列序号列                                                                     | boolean                                                                                                   | false                                                                                                                                                                          |
| tableKey      | 定义表格的唯一 key，需要表头记忆功能时必须设置                                     | string                                                                                                    |                                                                                                                                                                                |

api:emits

| 事件名      | 说明               | 回调参数            |
| ----------- | ------------------ | ------------------- |
| theadChange | 配置表头确认后触发 | Function({columns}) |
| ...其余事件 | 透传               |

api:methods

| 方法名        | 说明                      | 参数 | 返回值 |
| ------------- | ------------------------- | ---- | ------ |
| validate      | 表格内置表单校验          |
| reset         | 表格内置表单重置          |
| form          | formRef，表格内置表单引用 |
| setHeader     | 触发配置表头弹窗          |
| setTableProps | 自定义表格属性            |

api:slots

**PS: 需注意的是，`body-cell`、`header-cell` 与 `antd@3.x` 原有的 `bodyCell`、`headerCell` 不可同时使用，并且<label style="color:red">不兼容 `antd@2.x`</label>**

| 插槽名                                                      | 说明                         | props                           |
| ----------------------------------------------------------- | ---------------------------- | ------------------------------- |
| body-cell                                                   | 自定义列内容统一模版         | { index, column, record, text } |
| body-cell-[dataIndex] <br/> body-cell-[key]                 | 自定义指定列内容模版         | { index, column, record, text } |
| body-cell-operation <br/> body-cell-[propMap.operation]     | 预设操作列内容模版           | { index, column, record, text } |
| header-cell                                                 | 自定义列标题统一模版         | { index, column, record, text } |
| header-cell-[dataIndex] <br/> header-cell-[key]             | 自定义指定列标题模版         | { index, column, record, text } |
| header-cell-operation <br/> header-cell-[propMap.operation] | 预设操作列标题模版           | { index, column, record, text } |
| bottom                                                      | 表格底部模版                 | -                               |
| toolbar                                                     | 表格工具条模版，位于表格上方 | -                               |

api:TableColumn

```typescript
import { FormItem } from '@ygp/ygp-design-vue'
import { TableColumnType } from 'ant-design-vue'

type NewFormItem = Omit<
  FormItem,
  'name' | 'names' | 'label' | 'row' | 'newline' | 'hide'
>

export type BodyCellParams = {
  record: any
  column: TableColumn
  index: number
  text: any
}

export type TableColumn = {
  editable?: boolean | ((prop: BodyCellParams) => boolean)
  title?: string
  key?: TableColumnType['key']
  dataIndex?:
    | TableColumnType['dataIndex']
    | ((editable: boolean) => TableColumnType['dataIndex'])
  fixed?: TableColumnType['fixed']
  width?: string | number | undefined
  minWidth?: TableColumnType['minWidth']
  maxWidth?: TableColumnType['maxWidth']
  resizable?: TableColumnType['resizable']
  customRender?: TableColumnType['customRender']
  sorter?: TableColumnType['sorter']
  ellipsis?: TableColumnType['ellipsis']
  align?: TableColumnType['align']
  required?: boolean
  item?: NewFormItem | ((prop: BodyCellParams) => NewFormItem)
  [key: string]: any
}
```

## 表格树型结构编辑

```vue demo src="./table/TableTreeEdit.vue"

```

## 可编辑表格：显示字段与编辑字段不一的场景

```vue demo src="./table/TableEditField.vue"

```

## 表格动态插槽

```vue demo src="./table/TableDynamicSlot.vue"

```

## <del>表格自定义行</del>

已新增 `y-order-table`

```vue demo src="./table/TableCustomRow.vue"

```

## <del>表格自定义行 2</del>

已新增 `y-order-table`

子集超过 2 行时显示“展开/收起”按钮

```vue demo src="./table/TableCustomRow2.vue"

```

## 可编辑表格单行校验

```vue demo src="./table/TableRowValidate.vue"

```

## 嵌套子表格

```vue demo src="./table/TableNested.vue"

```

## 使用 fit 属性自适应固高容器

```vue demo
<script lang="ts" setup></script>
<template>
  <y-row style="height: 200px" :gutter="10">
    <y-col style="height: 100%" :span="12">
      <y-table
        fit
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
      <y-table
        fit
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

## 跨页全选

[示例详见 useSelection](/hooks/use-selection#跨页全选)

## 分页栏附加插槽（左下角）

使用插槽 `pagination-extra`

```vue demo
<script lang="ts" setup>
import { Message } from '@ygp/ygp-design-vue'
import { ref } from 'vue'

const value = ref()

const data = Array(20)
  .fill(void 0)
  .map((_, i) => ({ id: i + 1, name: `学生${i + 1}`, cls: `高一${i + 1}班` }))

function onAdd() {
  Message.success('添加一行')
}
</script>
<template>
  <y-table
    :data="data"
    :pagination="{ pageSize: 2, size: 'default' }"
    :columns="[
      { title: '姓名', dataIndex: 'name' },
      { title: '班级', dataIndex: 'cls' }
    ]"
  >
    <template #pagination-extra>
      <y-btn label="添加一行" @click="onAdd" />
      <a-date-picker v-model:value="value" />
    </template>
  </y-table>
</template>
```

## 全选复选框栏插槽

使用插槽 `header-cell-selection-title` 自定义全选复选框

```vue demo
<script lang="ts" setup>
import { useSelection } from '@ygp/ygp-design-vue/hooks'

const { rowSelection } = useSelection()
</script>
<template>
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
