# y-time 时间选择器

<a-btn label="a-time-picker / a-time-range-picker" href="https://next.antdv.com/components/time-picker-cn" />

完全继承 `a-time-picker` `a-time-range-picker` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-time-picker / a-time-range-picker" href="https://next.antdv.com/components/time-picker-cn" /> 查看更多选项

## API

## 基础用法

```vue demo
<template>
  <p>点击 TimePicker，然后可以在浮层中选择或者输入某一时间。</p>
  <p>value1: {{ value1 }}</p>
  <p>value2: {{ value2 }}</p>
  <y-space>
    <y-time v-model="value1" />
    <y-time v-model="value2" format="HH:mm" disabled />
  </y-space>
  <y-divider />
  <p>选择范围时间</p>
  <p>value3: {{ value3 }}</p>
  <p>value4: {{ value4 }}</p>
  <y-space>
    <y-time v-model="value3" range />
    <y-time v-model="value4" range format="HH:mm" disabled />
  </y-space>
  <y-divider />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref()
const value2 = ref('09:00')
const value3 = ref([])
const value4 = ref(['01:00', '23:00'])
</script>
```

## Time Props

| 属性名      | 说明                                                                      | 类型                         | 默认值                                                  |
| ----------- | ------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------- |
| modelValue  | 把 `value` 改为 `modelValue`                                              | string / array / dayjs       |                                                         |
| range       | 使用 `a-time-range-picker` 组件                                           | boolean                      | false                                                   |
| type        | 供 form 表单使用的属性，用于区别 `a-time-picker` 和 `a-time-range-picker` | string<'time' / 'timerange'> | 'time'                                                  |
| valueFormat | 指定输出值的格式                                                          | string                       | 默认与属性 `format` 的值相同，默认为 'HH:mm:ss'，可覆盖 |
