# y-slider

<a-btn label="a-slider" href="https://next.antdv.com/components/slider-cn" />

继承 `a-slider` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-slider" href="https://next.antdv.com/components/slider-cn" /> 查看更多选项

## API

## 基础用法

```vue demo
<template>
  <div>
    常规用法
    <y-slider v-model="value1" :disabled="true" />
    <y-divider />
    <y-slider range v-model="value2" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const value1 = ref<number>(10)
const value2 = ref<number[]>([20, 50])
</script>
```

```vue demo
<template>
  <div>
    带输入框的滑块
    <a-row>
      <a-col :span="12">
        <y-slider v-model="inputValue1" :min="1" :max="20" />
      </a-col>
      <a-col :span="4">
        <y-input
          number
          v-model="inputValue1"
          :min="1"
          :max="20"
          style="margin-left: 16px"
        />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <y-slider v-model="inputValue" :min="0" :max="1" :step="0.01" />
      </a-col>
      <a-col :span="4">
        <y-input
          number
          v-model="inputValue"
          :min="0"
          :max="1"
          :step="0.01"
          style="margin-left: 16px"
        />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const inputValue = ref<number>(0)
const inputValue1 = ref<number>(10)
</script>
```
