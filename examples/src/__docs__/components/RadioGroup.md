# y-radio-group 单选框组

<a-btn label="a-radio-group" href="https://next.antdv.com/components/radio-cn" />

继承 `a-radio-group` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-radio-group" href="https://next.antdv.com/components/radio-cn" /> 查看更多选项

## API

```vue demo
<template>
  <p>已选：{{ checked1 }}</p>
  <y-radio v-model="checked1" label="选择true/false" />
  <y-divider />
  <p>已选：{{ checked2 }}</p>
  <y-radio v-model="checked2" label="选中lulu" value="lulu" />
  <y-divider />
  <p>已选：{{ checked3 }}</p>
  <y-radio
    v-model="checked3"
    v-for="item in [1, 2, 3, 4]"
    :key="item"
    :value="item"
  >
    {{ item }}
    <y-input v-if="item === 4 && checked3 === 4" style="width: 100px" />
  </y-radio>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const checked1 = ref()
const checked2 = ref()
const checked3 = ref()
</script>
<style scope></style>
```

## 禁用的 y-radio-group

```vue demo
<template>
  <y-radio-group :options="['1', '2', '3']" disabled />
</template>
```
