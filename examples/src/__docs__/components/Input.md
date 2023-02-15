# y-input

<y-space>
  <a-btn label="a-input / a-input-password / a-input-search / a-input-textarea" href="https://next.antdv.com/components/input-cn" />
  <a-btn label="a-input-number" href="https://next.antdv.com/components/input-number-cn" />
</y-space>

把`a-input`、`a-input-number`、`a-input-password`、`a-input-search`、`a-textarea` 整合为 ` y-input`，仅通过 type 属性区分

但不同类型之间完全继承`ant-design-vue`各自组件的属性、事件、插槽、方法，可以通过 <y-link blank label="a-input" href="https://next.antdv.com/components/input-cn" />、<y-link blank label="a-input-number" href="https://next.antdv.com/components/input-number-cn" /> 查看更多选项

## API

api:props

| 参数      | 说明                             | 类型                                             | 默认值 |
| --------- | -------------------------------- | ------------------------------------------------ | ------ |
| autofocus | 当前组件在初次挂载时自动获取焦点 | boolean                                          | false  |
| type      | 输入框类型                       | text \| number \| password \| search \| textarea | text   |
| number    | 启用数字输入框                   | boolean                                          | false  |
| password  | 启用密码输入框                   | boolean                                          | false  |
| search    | 启用搜索输入框                   | boolean                                          | false  |
| textarea  | 启用多行文本输入框               | boolean                                          | false  |

## 基本用法

```vue demo
<template>
  <y-input v-model="value">
    <template #prefix>
      <user-outlined type="user" />
    </template>
  </y-input>
  <h1>{{ value }}</h1>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('hello world!')
</script>
```

## 输入框类型

```vue demo
<template>
  <a-form style="width: 500px">
    <a-form-item label="单行文本框">
      <y-input v-model="text" />
    </a-form-item>
    <a-form-item label="数字框">
      <y-input type="number" v-model="number" />
    </a-form-item>
    <a-form-item label="密码框">
      <y-input type="password" v-model="password" />
    </a-form-item>
    <a-form-item label="搜索框">
      <y-input type="search" v-model="search" />
    </a-form-item>
    <a-form-item label="多行文本">
      <y-input type="textarea" v-model="textarea" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('hello world!')
const number = ref(1234)
const password = ref('12345')
const search = ref('xxx热点新闻')
const textarea = ref('多行文本内容')
</script>
```

## 设置精确度的数字输入框

设置精确度为 6

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(20.22)
const value2 = ref(20.23)
</script>

<template>
  <p>{{ value }}</p>
  <y-input number :precision="6" v-model="value" />
  <y-divider />
  <p>{{ value2 }}</p>
  <y-input number fillPrecision :precision="6" v-model="value2" />
</template>
```

## 输入框禁用

之前的禁用文本颜色太浅，这里改深一点

```vue demo
<template>
  <a-form style="width: 500px">
    <a-form-item label="单行文本框">
      <y-input v-model="text" disabled />
    </a-form-item>
    <a-form-item label="数字框">
      <y-input type="number" v-model="number" disabled />
    </a-form-item>
    <a-form-item label="密码框">
      <y-input type="password" v-model="password" disabled />
    </a-form-item>
    <a-form-item label="搜索框">
      <y-input type="search" v-model="search" disabled />
    </a-form-item>
    <a-form-item label="多行文本">
      <y-input type="textarea" v-model="textarea" disabled />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('hello world!')
const number = ref(1234)
const password = ref('12345')
const search = ref('xxx热点新闻')
const textarea = ref('多行文本内容')
</script>
```
