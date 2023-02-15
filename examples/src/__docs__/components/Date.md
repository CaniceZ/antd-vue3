# y-date 日期选择器

<a-btn label="a-date-picker / a-range-picker" href="https://next.antdv.com/components/date-picker-cn" />

`a-date-picker` `a-range-picker` 两个组件整合为一个组件 `y-date`

完全继承 `a-date-picker` `a-range-picker` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-date-picker / a-range-picker" href="https://next.antdv.com/components/date-picker-cn" /> 查看更多选项

<row-start />
<col-start />

原来的写法

```html
<a-date-picker v-model:value="value1" />
<a-date-picker v-model:value="value2" picker="week" />
<a-date-picker v-model:value="value3" picker="month" />
<a-date-picker v-model:value="value4" picker="quarter" />
<a-date-picker v-model:value="value5" picker="year" />

<a-range-picker v-model:value="value6" />
<a-range-picker v-model:value="value7" show-time />
<a-range-picker v-model:value="value8" picker="week" />
<a-range-picker v-model:value="value9" picker="month" />
<a-range-picker v-model:value="value10" picker="year" />
```

<col-end />
<col-start />

新写法

```html
<y-date v-model="value1" />
<y-date v-model="value2" type="week" />
<y-date v-model="value3" type="month" />
<y-date v-model="value4" type="quarter" />
<y-date v-model="value5" type="year" />

<y-date v-model="value6" type="daterange" />
<y-date v-model="value7" type="datetimerange" />
<y-date v-model="value8" type="weekrange" />
<y-date v-model="value9" type="monthrange" />
<y-date v-model="value10" type="yearrange" />
```

<col-end />
<row-end />

## API

## 基础用法

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const value1 = ref()
const value2 = ref()
const value3 = ref([])
</script>
<template>
  <y-space vertical>
    <y-date
      v-model="value1"
      datetime
      :showTime="{ defaultValue: dayjs('23:59:59', 'HH:mm:ss') }"
    />
    <y-date v-model="value1" placeholder="请选择日期" />
    <y-date month v-model="value2" placeholder="Select month" />
    <y-date
      daterange
      v-model="value3"
      :placeholder="['开始时间', '结束时间']"
    />
  </y-space>
</template>
```

## 默认值

```vue demo
<template>
  <y-space vertical>
    <y-date v-model="value1" :format="dateFormat" />
    <y-date v-model="value2" :format="dateFormat2" />
    <y-date monthrange v-model="value3" :format="monthFormat" />
  </y-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const dateFormat = 'YYYY/MM/DD'
const dateFormat2 = 'DD/MM/YYYY'
const monthFormat = 'YYYY/MM'

const value1 = ref('2021/12/02')
const value2 = ref('02/12/2021')
const value3 = ref(['2021/10', '2021/12'])
</script>
```

## 日期时间选择

```vue demo
<template>
  <y-space vertical>
    <y-date
      datetime
      placeholder="请选择日期时间"
      @change="onChange"
      @ok="onOk"
    />
    <y-date
      daterange
      :show-time="{ format: 'HH:mm' }"
      format="YYYY-MM-DD HH:mm"
      :placeholder="['开始时间', '结束时间']"
      @change="onChange"
      @ok="onOk"
    />
  </y-space>
</template>
<script lang="ts" setup>
const onChange = (value, dateString: string[]) => {
  console.log('Selected Time: ', value)
  console.log('Formatted Selected Time: ', dateString)
}

const onOk = value => {
  console.log('onOk: ', value)
}
</script>
```

## 禁用

```vue demo
<template>
  <y-space direction="vertical">
    <y-date v-model="value1" />
    <y-date v-model="value2" disabled />
    <y-date daterange v-model="value3" disabled />
  </y-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const dateFormat = 'YYYY-MM-DD'
const value1 = ref()
const value2 = ref()
const value3 = ref([])
</script>
```

## 在 y-form 中实现只能选 7 天的日期范围

```vue demo src="./date/DateRangeForm.vue"

```
