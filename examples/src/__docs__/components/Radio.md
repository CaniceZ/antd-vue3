# y-radio 单选框

<a-btn label="a-radio" href="https://next.antdv.com/components/radio-cn" />

继承 `a-radio` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-radio" href="https://next.antdv.com/components/radio-cn" /> 查看更多选项

## API

## 基础用法

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
  <y-divider />
  <p>已选：{{ checked4 }}</p>
  <y-radio v-model="checked4" label="可反选" unchecked />
  <y-divider />
  <p>只读的单选框：{{ checked5 }}</p>
  <y-radio v-model="checked5" label="只读的单选框" readonly />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const checked1 = ref()
const checked2 = ref()
const checked3 = ref()
const checked4 = ref()
const checked5 = ref(false)
</script>
<style scope></style>
```

## 禁用的 y-radio

```vue demo
<template>
  <y-radio disabled label="禁用的y-radio" />
</template>
```
