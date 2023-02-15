# y-form 表单

<a-btn label="a-form" href="https://next.antdv.com/components/form-cn" />

在继承 `a-form` 的基础上扩展了一些内容，点击 <y-link blank label="a-form" href="https://next.antdv.com/components/form-cn" /> 查看更多原来的用法

<row-start />
<col-start />

原来的写法

```html
<a-form :model="formData">
  <a-row>
    <a-col :span="12">
      <a-form-item name="username" label="用户名">
        <a-input v-model="formData['username']" />
      </a-form-item>
    </a-col>
    <a-col :span="12">
      <a-form-item name="password" label="密码">
        <a-input-password v-model="formData['password']" />
      </a-form-item>
    </a-col>
  </a-row>
</a-form>
```

<col-end />
<col-start />

新写法

```html
<!-- 写法一 -->
<y-form
  :model="formData"
  :items="[
    { name: 'username', label: '用户名' },
    { name: 'password', label: '密码' }
]"
/>

<!-- 写法二 -->
<y-form :model="formData">
  <y-form-item name="username" label="用户名" />
  <y-form-item name="password" type="password" label="密码" />
</y-form>
```

<col-end />
<row-end />

## API

## 基本用法

```vue demo src="./form/FormBasic.vue"

```

## 创建类似传统的表单 && 子表单嵌套

```vue demo
<template>
  {{ formData }}
  <y-divider />
  {{ formData2 }}
  <y-divider />
  <y-form :model="formData">
    <y-form-item
      help="额外的提示1234"
      name="username"
      label="用户名"
      required
    />
    <y-form-item name="password" label="密码" required />
    <y-form-item
      name="status"
      label="状态"
      type="select"
      :options="[
        { type: 1, name: '启用' },
        { type: 0, name: '禁用' }
      ]"
      required
    />
    <y-form-item
      name="createTime"
      :names="['createStartTime', 'createEndTime']"
      label="创建日期"
      :placeholder="['创建开始日期', '创建结束日期']"
      type="datetimerange"
      required
    />
    <y-form-item label>
      <y-btn label="提交" primary submit />
    </y-form-item>
    <y-form-item label="嵌套子表单">
      <y-form :model="formData2">
        <y-form-item
          help="额外的提示1234"
          name="username"
          label="用户名"
          required
        />
        <y-form-item name="password" label="密码" required />
        <y-form-item
          name="createTime"
          label="创建日期"
          :placeholder="['创建开始日期', '创建结束日期']"
          type="datetimerange"
          required
        />
        <y-form-item label>
          <y-btn label="提交" primary submit />
        </y-form-item>
      </y-form>
    </y-form-item>
  </y-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
const formData = reactive({})
const formData2 = reactive({})
</script>
```

## 主要功能

- [x] 支持[布局配置](#布局配置)
- [x] 支持[自定义插槽](#自定义插槽)
- [x] 支持[数据验证](#数据验证)
- [ ] 支持[数据字典](#数据字典)
- [x] 支持[辅助提示](#辅助提示)
- [x] 支持[基本表单组件](#基本表单组件)：文本输入框、数字输入框、下拉选择框、级联选择器、多选、单选、日期、上传组件等

## 改进功能

- 当`form-item`设置`labelCol`宽度限制时，支持超出文本自动换行

```vue demo
<script lang="ts" setup>
import { reactive } from 'vue'
</script>
<template>
  <y-divider left>ant-design-vue原有的效果</y-divider>
  <a-form>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item
          :labelCol="{ span: 6 }"
          label="很长很长很长很长很长很长的label"
        >
          <a-input />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <y-divider left>改进后的效果</y-divider>
  <y-form
    :items="[{ name: 'name', label: '很长很长很长很长很长很长的label' }]"
  ></y-form>
</template>
```

## 提交表单的方式

- ### 显示调用 `validate` 方式进行校验

```vue demo
<script lang="ts" setup></script>
<template><div></div></template>
```

- ### submit 按钮触发 `submit` 事件

```vue demo
<script lang="ts" setup></script>
<template><div></div></template>
```

- ### 显示调用 `submit` 方法触发表单的 `submit` 事件

```vue demo
<script lang="ts" setup></script>
<template><div></div></template>
```

## 布局的方式

```vue demo src="./form/FormLayout.vue"

```

## 数据验证

```vue demo src="./form/FormValidate.vue"

```

## 自定义插槽

```vue demo src="./form/FormSlots.vue"

```

## 数据字典

## 辅助提示

## 基本表单组件

```vue demo src="./form/FormTypes.vue"

```

## 显示隐藏

```vue demo src="./form/FormHide.vue

```

## 表单的详情模式

```vue demo src="./form/FormDetail.vue

```

## customRender 的用法

需要在 `detail` 模式下才有效

```vue demo
<script lang="ts" setup>
const items = [
  { name: 'lastname', label: '姓', customRender: ({ text }) => text },
  { name: 'firstname', label: '名', customRender: ({ text }) => text },
  {
    name: 'name',
    label: '姓名',
    customRender: ({ model }) => `${model.lastname}${model.firstname}`
  }
]
const items2 = [
  { name: 'lastname', label: '姓' },
  {
    name: 'firstname',
    label: '名',
    detail: true,
    class: 'text-color-primary',
    span: 18,
    customRender: ({ model }) =>
      `这里是自定义显示内容：${model.lastname}${model.firstname}`
  }
]
const model = {
  firstname: '三',
  lastname: '张'
}
</script>
<template>
  <y-divider left>通过 y-form 设置 detail: true </y-divider>
  <y-form :defaultSpan="6" :items="items" :model="model" detail />
  <y-divider left>通过 item 设置 detail: true </y-divider>
  <y-form :defaultSpan="6" :items="items2" :model="model" />
</template>
```

## 自动 focus 到第一个错误 item

```vue demo src="./form/FormFocusToFirstError.vue

```

api:props

| 参数          | 说明                                 | 类型           | 默认值 |
| ------------- | ------------------------------------ | -------------- | ------ |
| model         | 表单数据对象                         | object         | {}     |
| items         | 表单项列表                           | [FormItem]()[] | []     |
| gutter        | 表单项之间的间距                     | number         | 16     |
| vertical      | 表单项垂直化，即每个表单项都独占一行 | boolean        | false  |
| labelVertical | 等于 layout='vertical'               | boolean        | false  |
| inline        | 等于 layout='inline'                 | boolean        | false  |
| defaultSpan   | 表单项默认 span                      | number         | 12     |
| labelWidth    | 统一设置标签宽度                     | string         | 120px  |
| readonly      | 统一设置表单项只读属性               | boolean        | false  |
| disabled      | 统一设置表单项禁用属性               | boolean        | false  |
| no-explain    | 统一去除表单项下面的解释/错误内容行  | boolean        | false  |
| no-label      | 统一隐藏表单项的标签                 | boolean        | false  |
| detail        | 统一设置表单项的详情显示模式         | boolean        | false  |

api:emits

| 事件名      | 说明 | 回调参数 |
| ----------- | ---- | -------- |
| ...其余事件 | 透传 |

api:methods

| 方法名     | 说明                              | 参数         | 返回值      |
| ---------- | --------------------------------- | ------------ | ----------- |
| validate   | 手动校验                          |
| getItemRef | 根据`name`获取`a-form-item`的 ref | name: string | YgpForm-ref |
| reset      | 为`resetFields`的别名方法         |              |

api:slots

| 插槽名                  | 说明                | props |
| ----------------------- | ------------------- | ----- |
| label-[name]            | 字段标签 slot       |
| item-[name]             | 字段 slot           |
| item-[name]-[组件 slot] | 组件 slot           |
| extraAction             | 位于按钮右侧的 slot |

api:FormItem

```typescript
type NewTooltipProps = Omit<TooltipProps, 'visible'> & {
  textColor?: string
  icon?: string
}

export type FormItemType =
  | 'input'
  | 'search'
  | 'textarea'
  | 'password'
  | 'number'
  | 'autocomplete'
  | 'date'
  | 'daterange'
  | 'datetime'
  | 'datetimerange'
  | 'datetimerange2'
  | 'week'
  | 'weekrange'
  | 'month'
  | 'monthrange'
  | 'year'
  | 'yearrange'
  | 'quarter'
  | 'quarterrange'
  | 'time'
  | 'timerange'
  | 'cascader'
  | 'upload'
  | 'select'
  | 'multipleselect'
  | 'checkbox'
  | 'radio'
  | 'optioninput'

export interface FormItem {
  name: string
  names?: string[]
  type?: FormItemType | ((...args: any) => FormItemType)
  label?: string
  labelWidth?: string
  extra?: string
  required?: boolean
  disabled?: boolean | ((...args: any) => boolean)
  readonly?: boolean
  span?: number
  offset?: number
  row?: boolean
  newline?: boolean
  placeholder?: string | string[]
  autofocus?: boolean
  component?: Component
  rules?: FormItemProps['rules']
  hide?: boolean
  loading?: boolean
  dicName?: string
  options?:
    | {
        name?: string
        type?: string | number
        [key: string]: any
      }[]
    | any[]
    | ((...args: any) => any[])
  maxlength?: number
  componentProps?: { [key: string]: any }
  defaultValue?: any | any[]
  onChange?: (...args: any[]) => void
  propMap?:
    | {
        label?: string
        value?: string
        children?: string
      }
    | {
        [key: string]: string
      }
  allowClear?: boolean
  labelTip?: string | NewTooltipProps
  tip?: string | NewTooltipProps
  detail?: boolean
  listType?: string
  // 解密接口服务前缀
  decryptApiPrefix?: string
  customRender?: (params: { text: any; model: any; item: FormItem }) => void
}
```
