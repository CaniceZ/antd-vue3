# y-btn-dropdown 下拉按钮

<a-btn label="a-dropdown" href="https://next.antdv.com/components/dropdown-cn" />

由于在我们的业务系统中更常用的是具有默认样式的下拉按钮，所以这里改写了 <y-link blank href="https://next.antdv.com/components/dropdown-cn#Dropdown-Button" label="a-dropdown-button"/> 组件，重命名为 `y-btn-dropdown`，并把一些原来的插槽 `verlay(v-slot)` 改为 `default(v-slot)`，同时扩展了一些属性，但我觉得最重要的更新是，可通过写 `y-btn` 来实现默认的下拉样式，而不需要每次都写冗长的 `<y-menu><y-menu-item>`

<row-start />
<col-start />

原有的写法

```html
<a-dropdown>
  <a-button type="primary">更多</a-button>
  <template #overlay>
    <a-menu>
      <a-menu-item disabled>按钮1</a-menu-item>
      <a-menu-item>按钮2</a-menu-item>
      <a-menu-item>按钮3</a-menu-item>
      <a-menu-item>按钮4</a-menu-item>
    </a-menu>
  </template>
</a-dropdown>
```

<col-end />
<col-start />

新写法

```html
<y-btn-dropdown label="更多" type="primary">
  <y-btn label="按钮按钮按钮按钮11111" disabled />
  <y-btn label="按钮2" danger />
  <y-btn><UserOutlined /> 按钮3</y-btn>
  <y-btn label="按钮4" v-if="false" />
</y-btn-dropdown>
```

<col-end />
<row-end />

## API

api:props

| 参数                | 说明     | 类型    | 默认值 |
| ------------------- | -------- | ------- | ------ |
| modelValue(v-model) | 显示隐藏 | boolean |
| split               | 分割样式 | boolean | false  |
| disabled            | 禁用     | boolean | false  |

api:emits

| 事件名            | 说明                                   | 回调参数                   |
| ----------------- | -------------------------------------- | -------------------------- |
| update:modelValue | modelValue 修改事件                    | (visible: boolean) => void |
| visibleChange     | 菜单显示状态改变时调用，参数为 visible | (visible: boolean) => void |

## 基础用法

```vue demo
<template>
  手动控制展开和收起(modelValue) <y-switch v-model="show" />
  <y-divider vertical />
  禁用(disabled) <y-switch v-model="disabled" />
  <y-divider vertical />
  分割样式(split) <y-switch v-model="split" />
  <y-divider />
  <y-btn-dropdown
    :disabled="disabled"
    :split="split"
    v-model="show"
    label="更多"
    primary
  >
    <y-btn @click="onClick(1)" label="按钮按钮按钮按钮11111" disabled />
    <y-btn @click="onClick(2)" label="按钮2" danger />
    <y-btn @click="onClick(3)"><UserOutlined /> 按钮3</y-btn>
    <y-btn @click="onClick(4)" label="按钮4" v-if="false" />
  </y-btn-dropdown>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
function onClick(num) {
  message.info(num)
}
const show = ref(false)
const disabled = ref(false)
const split = ref(false)
</script>
```

## split 分割样式

```vue demo
<template>
  <y-btn-dropdown split label="更多" primary>
    <y-btn label="按钮按钮按钮按钮11111" disabled />
    <y-btn label="按钮2" danger />
    <y-btn label="按钮3" />
    <y-btn label="按钮4" v-if="false" />
  </y-btn-dropdown>
</template>
<script lang="ts" setup></script>
```

## label 插槽

```vue demo
<template>
  <y-btn-dropdown>
    <template #label>
      <y-link>hover me <DownOutlined /></y-link>
    </template>
    <y-btn label="按钮1" />
    <y-btn label="按钮2" />
    <y-btn label="按钮3" />
  </y-btn-dropdown>
</template>
<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue'
</script>
```

## icon 插槽

```vue demo
<template>
  <y-btn-dropdown danger label="更多" @click="onClick">
    <template #icon>
      <UserOutlined />
    </template>
    <y-btn label="按钮1" @click="onClick" />
    <y-btn label="按钮2" />
    <y-btn label="按钮3" />
  </y-btn-dropdown>
</template>
<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue'
import { Message } from '@ygp/ygp-design-vue'
function onClick() {
  Message.info('click info')
}
</script>
```

## click 才展开

```vue demo
<template>
  <y-btn-dropdown :trigger="['click']" label="click me">
    <y-btn label="按钮1" />
    <y-btn label="按钮2" />
    <y-btn label="按钮3" />
  </y-btn-dropdown>
</template>
<script lang="ts" setup></script>
```

## 右键菜单

```vue demo
<template>
  <y-btn-dropdown :trigger="['contextmenu']">
    <template #label>
      <div
        :style="{
          textAlign: 'center',
          background: '#f7f7f7',
          height: '200px',
          lineHeight: '200px',
          color: '#777'
        }"
      >
        Right Click on here
      </div>
    </template>
    <y-btn label="按钮1" />
    <y-btn label="按钮2" />
    <y-btn label="按钮3" />
  </y-btn-dropdown>
</template>
<script lang="ts" setup></script>
```
