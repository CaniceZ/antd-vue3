# y-checkbox-group 多选框组

<a-btn label="a-checkbox-group" href="https://next.antdv.com/components/checkbox-cn#Checkbox-Group" />

完全继承 `a-checkbox-group` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-checkbox-group" href="https://next.antdv.com/components/checkbox-cn#Checkbox-Group" /> 查看更多选项

<row-start />
<col-start />

原来的写法

```html
<a-checkbox-group v-model:value="checked" :options="options" />
```

<col-end />
<col-start />

新写法

```html
<y-checkbox-group v-model="checked" :options="options" />
```

<col-end />
<row-end />

## API

## 基本用法

```vue demo
<template>
  已选：{{ checked }}
  <y-divider />
  <y-checkbox-group v-model="checked" :options="options" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref([])
const options = ['⚽️ 足球', '🏀 篮球', '🏓️ 乒乓球', '🎾 网球', '🎱 桌球']
</script>
```

## 禁用的 y-checkbox-group

```vue demo
<template>
  <y-checkbox-group :options="['1', '2', '3']" disabled />
</template>
```
