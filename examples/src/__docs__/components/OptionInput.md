# y-option-input 选项输入

<a-btn label="a-input-group" href="https://next.antdv.com/components/input-cn#components-input-demo-group" />

当前组件基于 `a-input-group` `y-select` 以及各个类型的表单组件实现

写法如下

```html
<y-option-input
  :options="[
    { name: 'orderNo', label: '订单编号' },
    { name: 'orderStatus', label: '订单状态', type: 'select', options: [
      { name: '待提交', type: '1' },
      { name: '待审核', type: '2' },
      { name: '已支付', type: '3' },
    ]},
    { name: 'payDate', label: '支付时间', type: 'date' },
    { name: 'createDate', label: '创建时间', type: 'datetimerange' }
  ]"
  v-model="value"
/>
```

## API

api:props

| 属性名               | 说明                                                                                | 类型                                                                                                                     | 默认值  |
| -------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------- |
| modelValue (v-model) | 输入框的值                                                                          |
| options              | 下拉选项列表                                                                        | FormItem[] \| <br/>{name: string, names: string[], label: string, <br/>onChange: (...args, selectedOption) => void, ...} |
| selected (v-model)   | 下拉框的值 (option.name)                                                            | string                                                                                                                   |
| selectWidth          | 下拉框的宽度                                                                        | string                                                                                                                   | 50%     |
| compact              | 是否用紧凑模式，取消 row/col 布局<br/>所以该属性设置为 true 以后，row/cols 属性无效 | boolean                                                                                                                  | true    |
| size                 | 大小                                                                                | small \| default \| large                                                                                                | default |
| selectProps          | 下拉框属性扩展                                                                      | SelectProps                                                                                                              |
| componentProps       | 输入框属性扩展                                                                      | object                                                                                                                   |
| keep                 | 下拉切换时是否保留值                                                                | boolean                                                                                                                  | false   |
| row                  | Row 属性扩展                                                                        | RowProps                                                                                                                 |
| cols                 | Col 属性扩展                                                                        | [ColProps, ColProps]                                                                                                     |

api:emits

| 事件名         | 说明               | 回调参数                          |
| -------------- | ------------------ | --------------------------------- |
| selectedChange | 下拉选择值更新事件 | (val, option) => void             |
| change         | 输入框值更新事件   | (...args, selectedOption) => void |

## 基础用法

```vue demo
<script lang="ts" setup>
import { ref, reactive } from 'vue'

const value = ref()
const options = [
  {
    name: 'orderNo',
    label: '订单编号'
  },
  {
    name: 'orderStatus',
    label: '订单状态',
    type: 'select',
    options: [
      { name: '待提交', type: '1' },
      { name: '待审核', type: '2' },
      { name: '已支付', type: '3' }
    ]
  },
  {
    name: 'orderDate',
    label: '订单时间',
    type: 'date'
  },
  {
    name: 'createDate',
    names: ['createStartDate', 'createEndDate'],
    label: '创建时间',
    type: 'datetimerange'
  }
]

const formData = reactive({
  compact: false
})
const items = [
  {
    name: 'compact',
    label: 'compact',
    extra: '是否紧凑',
    type: 'switch'
  },
  {
    name: 'selectWidth',
    label: 'selectWidth',
    extra: '下拉框宽度',
    defaultValue: '50%'
  }
]

function onChange(...args) {
  console.log(...args)
}
</script>
<template>
  <y-form :items="items" :model="formData" />
  <y-divider />
  输入结果：{{ value }}
  <y-divider />
  <y-option-input
    :options="options"
    v-model="value"
    @change="onChange"
    v-bind="formData"
  />
</template>
```

## 在 form 表单中使用

```vue demo
<script lang="ts" setup>
import { FormItem, Message } from '@ygp/ygp-design-vue'
import { reactive, ref } from 'vue'

const items: FormItem = [
  {
    name: 'optioninput',
    label: '订单信息',
    type: 'optioninput',
    required: true,
    componentProps: {
      selected: 'orderType'
    },
    extra: '设置默认值回显',
    options: [
      {
        name: 'orderNo',
        label: '订单编号'
      },
      {
        name: 'orderType',
        label: '订单类型',
        type: 'select',
        options: [
          { name: '待提交', type: '1' },
          { name: '待审核', type: '2' },
          { name: '已支付', type: '3' }
        ]
      },
      {
        name: 'orderDate',
        label: '订单时间',
        type: 'date'
      },
      {
        name: 'createDate',
        names: ['createStartDate', 'createEndDate'],
        label: '创建时间',
        type: 'datetimerange'
      }
    ]
  },
  {
    name: 'userinfo',
    label: '用户信息',
    type: 'optioninput',
    extra: '设置 compact: true 紧凑',
    options: [
      {
        name: 'username',
        label: '用户名(必填)',
        required: true
      },
      {
        name: 'password',
        label: '密码(非必填)',
        type: 'password'
      }
    ],
    componentProps: {
      compact: true
    }
  },
  {
    name: 'other',
    label: '其他信息'
  },
  {
    name: 'productinfo',
    label: '商品信息',
    type: 'optioninput',
    extra: '设置 keep: true 使切换不同选项时，变更字段名，保留值内容',
    options: [
      {
        name: 'internalProductNo',
        label: '内部商品编号'
      },
      {
        name: 'externalProductNo',
        label: '外部商品编号'
      }
    ],
    componentProps: {
      keep: true
    }
  }
]

const formData = reactive({
  internalProductNo: '1234',
  orderType: '3'
})
const formRef = ref()

async function onSubmit() {
  await formRef.value?.validate()
  Message.success('提交成功')
}

function onReset() {
  formRef.value?.reset()
}
</script>
<template>
  {{ formData }}
  <y-divider />
  <y-form ref="formRef" :items="items" :model="formData" />
  <div style="text-align: center;">
    <y-space>
      <y-btn label="提交" primary @click="onSubmit" />
      <y-btn label="重置" @click="onReset" />
    </y-space>
  </div>
</template>
```

## 切换时保留值

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('12345678')
const options = [
  {
    name: 'orderNo',
    label: '订单编号'
  },
  {
    name: 'productNo',
    label: '商品编号'
  }
]

const selected = ref()

function onSelectedChange(...args) {
  console.log(selected.value, ...args)
}
</script>
<template>
  输入结果：{{ value }}
  <y-divider />
  <y-option-input
    v-model:selected="selected"
    @selectedChange="onSelectedChange"
    :options="options"
    v-model="value"
    keep
    :row="{ gutter: 50 }"
    :cols="[{ span: 6 }, { span: 18 }]"
  />
</template>
```
