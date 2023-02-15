# y-checkbox 多选框

<a-btn label="a-checkbox" href="https://next.antdv.com/components/checkbox-cn" />

完全继承 `a-checkbox` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-checkbox" href="https://next.antdv.com/components/checkbox-cn" /> 查看更多选项

<row-start />
<col-start />

原来的写法

```html
<a-checkbox v-model:checked="checked">Checkbox</a-checkbox>
```

<col-end />
<col-start />

新写法

```html
<y-checkbox v-model="checked" label="Checkbox" />
```

<col-end />
<row-end />

## API

## 基本用法

```vue demo
<template>
  选中结果：{{ `${checked}` }} <y-divider vertical />
  <y-checkbox v-model="checked" label="Checkbox" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

## readonly 只读

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'
const checked = ref(true)
</script>
<template>
  选中：<y-switch v-model="checked" /> <y-divider vertical />
  <y-checkbox v-model="checked" label="只读的Checkbox" readonly />
</template>
```

## 禁用的 y-checkbox

```vue demo
<template>
  <y-checkbox disabled label="禁用的y-checkbox" />
</template>
```
