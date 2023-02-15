# y-btn 按钮

<a-btn label="a-button" href="https://next.antdv.com/components/button-cn" />

完全继承 `a-button` 的属性、事件、插槽、方法，可以通过 <y-link blank href="https://next.antdv.com/components/button-cn" label="a-button" /> 查看更多选项

<row-start />
<col-start />

原来的写法

```html
<a-button type="primary">提交</a-button>
```

<col-end />
<col-start />

新写法

```html
<y-btn type="primary" label="提交" />
```

<col-end />
<row-end />

## API

api:props

| 参数     | 说明                                                          | 类型                                                   | 默认值  |
| -------- | ------------------------------------------------------------- | ------------------------------------------------------ | ------- |
| label    | 按钮文字                                                      | `string`                                               |
| type     | 按钮类型                                                      | `primary` \| `dashed` \| `link` \| `text` \| `default` | default |
| primary  | 等于 `type='primary'`                                         | `boolean`                                              | false   |
| dashed   | 等于 `type='dashed'`                                          | `boolean`                                              | false   |
| link     | 等于 `type='link'`                                            | `boolean`                                              | false   |
| text     | 等于 `type='text'`                                            | `boolean`                                              | false   |
| shape    | 按钮形状                                                      | `circle` \| `round`                                    | -       |
| circle   | 等于 `shape='circle'`                                         | `boolean`                                              | false   |
| round    | 等于 `shape='round'`                                          | `boolean`                                              | false   |
| size     | 按钮大小                                                      | `small` \| `middle` \| `large`                         | middle  |
| small    | 等于 `size='small'`                                           | `boolean`                                              | false   |
| large    | 等于 `size='large'`                                           | `boolean`                                              | false   |
| loading  | 按钮加载状态                                                  | `boolean` \| `{ delay: number }`                       | false   |
| disabled | 禁用状态                                                      | `boolean`                                              | false   |
| danger   | 危险状态                                                      | `boolean`                                              | false   |
| ghost    | 幽灵状态                                                      | `boolean`                                              | false   |
| block    | 按钮宽度设为 `100%`                                           | boolean                                                | false   |
| submit   | 表单提交按钮，等于 `html-type='submit'`                       | boolean                                                | false   |
| confirm  | 给按钮添加默认的弹窗确认步骤，点击确认后才会执行`onClick`事件 | `boolean` \| `ModalFuncProps`                          | false   |

api:slots

| 插槽名 | 说明     | props |
| ------ | -------- | ----- |
| icon   | 图标插槽 |

api:emits

| 事件名 | 说明     | 回调参数          |
| ------ | -------- | ----------------- |
| click  | 点击事件 | `(event) => void` |

## 基础用法

```vue demo
<template>
  <y-form :items="items" :model="formData" :defaultSpan="6" />
  <y-divider />
  <div
    :style="`padding: 10px; text-align: center; transition-duration: .5s; ${
      formData.ghost ? 'background-color: rgb(190, 200, 200);' : ''
    }`"
  >
    <y-btn v-bind="formData" label="按钮" />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { FormItem } from '@ygp/ygp-design-vue'

const items: FormItem[] = [
  {
    name: 'type',
    label: 'type',
    type: 'radio',
    options: ['default', 'primary', 'dashed', 'link', 'text'],
    componentProps: { button: true },
    span: 12
  },
  {
    name: 'size',
    label: 'size',
    type: 'radio',
    options: ['small', 'middle', 'large'],
    componentProps: { button: true },
    span: 12
  },
  {
    name: 'shape',
    label: 'shape',
    type: 'radio',
    options: [{ type: void 0, name: '默认' }, 'circle', 'round'],
    span: 12,
    componentProps: { button: true }
  },
  {
    name: 'danger',
    label: 'danger',
    type: 'switch',
    span: 12
  },
  {
    name: 'ghost',
    label: 'ghost',
    type: 'switch'
  },
  {
    name: 'disabled',
    label: 'disabled',
    type: 'switch'
  },
  {
    name: 'block',
    label: 'block',
    type: 'switch'
  },
  {
    name: 'loading',
    label: 'loading',
    type: 'switch'
  }
]

const formData = reactive({
  type: 'default',
  size: 'middle',
  shape: void 0,
  danger: false,
  ghost: false,
  disabled: false,
  block: false
})
</script>
```

## confirm 询问/确认

```vue demo
<template>
  <y-space>
    <y-btn primary danger confirm label="删除" @click="onDelete" />
    <y-btn danger confirm label="禁用" @click="onDisabled" />
    <y-btn
      :confirm="{ title: '自定义标题', content: '自定义询问内容' }"
      label="自定义询问内容"
      @click="onCustom"
    />
  </y-space>
</template>
<script lang="ts" setup>
import { Modal } from '@ygp/ygp-design-vue'

function onDelete() {
  Modal.create('删除成功')
}
function onDisabled() {
  Modal.create('禁用成功')
}
function onCustom() {
  Modal.create('点击了自定义按钮')
}
</script>
```

## type 类型

```vue demo
<template>
  <y-space>
    <y-btn label="Default" type="default" />
    <y-btn label="Primary" type="primary" />
    <y-btn label="Dashed" type="dashed" />
    <y-btn label="Text" type="text" />
    <y-btn label="Link" type="link" />
  </y-space>
</template>
```

## shape 形状

```vue demo
<template>
  <y-space>
    <y-btn label="Default" />
    <y-btn label="圆" shape="circle" />
    <y-btn label="Round" shape="round" />
    <y-divider vertical />
    <y-btn label="Default" primary />
    <y-btn label="圆" primary shape="circle" />
    <y-btn label="Round" primary shape="round" />
    <y-divider vertical />
    <y-btn label="Default" dashed />
    <y-btn label="圆" dashed shape="circle" />
    <y-btn label="Round" dashed shape="round" />
  </y-space>
</template>
```

## size 大小

```vue demo
<template>
  <y-space>
    <y-btn label="Small" size="small" />
    <y-btn label="Middle" size="middle" />
    <y-btn label="Large" size="large" />
    <y-divider vertical />
    <y-btn label="Small" size="small" primary />
    <y-btn label="Middle" size="middle" primary />
    <y-btn label="Large" size="large" primary />
    <y-divider vertical />
    <y-btn label="Small" size="small" dashed />
    <y-btn label="Middle" size="middle" dashed />
    <y-btn label="Large" size="large" dashed />
  </y-space>
</template>
```

## icon 图标

```vue demo
<template>
  <y-space>
    <y-btn primary>
      <template #icon><DownloadOutlined /></template>
    </y-btn>
    <y-btn circle primary>
      <template #icon><DownloadOutlined /></template>
    </y-btn>
    <y-btn label="下载">
      <template #icon><DownloadOutlined /></template>
    </y-btn>
    <y-btn round label="下载">
      <template #icon><DownloadOutlined /></template>
    </y-btn>
  </y-space>
</template>
```

## ghost 幽灵按钮

```vue demo
<template>
  <div style="padding: 10px; background-color: rgb(190, 200, 200)">
    <y-space>
      <y-btn label="Default" type="default" ghost />
      <y-btn label="Primary" type="primary" ghost />
      <y-btn label="Dashed" type="dashed" ghost />
      <!-- 幽灵按钮和link、text不共用 -->
      <y-btn label="Text" type="text" />
      <y-btn label="Link" type="link" />
    </y-space>
  </div>
</template>
```

## loading 加载状态

```vue demo
<template>
  <y-space>
    <y-btn primary loading label="Loading" />
    <y-btn primary small loading label="Loading" />
    <y-btn
      primary
      :loading="loading"
      @mouseenter="loading = true"
      label="mouseenter me!"
    />
    <y-btn primary :loading="iconLoading" @click="onClick" label="延迟1s">
      <template #icon><SearchOutlined /></template>
    </y-btn>
    <y-divider vertical />
    <y-btn type="primary" loading />
    <y-btn type="primary" shape="circle" loading />
    <y-btn danger shape="round" loading />
  </y-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
const iconLoading = ref(false)
function onClick() {
  iconLoading.value = { delay: 1000 }
  setTimeout(() => {
    iconLoading.value = false
  }, 5000)
}
</script>
```
