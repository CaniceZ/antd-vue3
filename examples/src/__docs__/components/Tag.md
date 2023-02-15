# y-tag 标签

<a-btn label="a-tag" href="https://next.antdv.com/components/tag-cn" />

完全继承 `a-tag` 的属性、事件、插槽、方法，可以通过 <y-link label="a-tag" blank href="https://next.antdv.com/components/tag-cn" /> 查看更多选项

## API

## 基本用法

```vue demo
<template>
  <y-tag label="Tag1" />
  <y-tag label="Tag1" checked />
  <y-tag label="Tag1" v-model:checked="checked" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const checked = ref(false)
</script>
```

## 主色调

```vue demo
<template>
  <y-tag label="Tag1" primary />
</template>
```
