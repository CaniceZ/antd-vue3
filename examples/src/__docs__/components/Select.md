# y-select 下拉选择

<a-btn label="a-select" href="https://next.antdv.com/components/select-cn" />

继承 `a-select` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-select" href="https://next.antdv.com/components/select-cn" /> 查看更多选项

## API

## 基础用法

```vue demo
<template>
  <y-divider left>使用options属性</y-divider>
  <y-space>
    <y-select
      v-model="value1"
      style="width: 120px"
      allowClear
      :options="[
        { type: 'jack', name: 'Jack' },
        { type: 'lucy', name: 'Lucy' },
        { type: 'disabled', name: 'Disabled', disabled: true },
        { type: 'Yiminghe', name: 'yiminghe' }
      ]"
    />
    <y-select
      v-model="value2"
      style="width: 120px"
      disabled
      :options="options2"
    ></y-select>
    <y-select
      v-model="value3"
      multiple
      style="width: 120px"
      loading
      :options="options3"
    ></y-select>
  </y-space>
  <y-divider left>使用y-select-option</y-divider>
  <y-space>
    <y-select style="width: 200px" v-model="value4">
      <y-select-option
        v-for="item in options3"
        :key="item.type"
        :value="item.type"
      >
        {{ item.name }}
      </y-select-option>
    </y-select>
    <y-select style="width: 200px" showSearch v-model="value5">
      <y-select-option
        v-for="item in options3"
        :key="item.type"
        :value="item.type"
        :label="item.name"
      >
        {{ item.name }}
      </y-select-option>
    </y-select>
  </y-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref()
const value2 = ref('lucy')
const value3 = ref('lucy')
const value4 = ref()
const value5 = ref()
const loading = ref(true)

const options2 = ref([
  {
    type: 'lucy',
    name: 'Lucy'
  }
])

const options3 = ref([
  { type: '1', name: 'Lucy' },
  { type: '2', name: 'Lucy2' },
  { type: '3', name: 'Lucy3' },
  { type: '4', name: 'Lucy4' },
  { type: '5', name: 'Lucy5' },
  { type: '6', name: 'Lucy6' },
  { type: '7', name: 'Lucy7' },
  { type: '8', name: 'Lucy8' },
  { type: '9', name: 'Lucy9' }
])
</script>
```

## 使用 true / false 选项值

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref()
const value2 = ref()
</script>
<template>
  <y-divider left>单选全选，选择结果：{{ value }}</y-divider>
  <y-select
    v-model="value"
    :options="[
      { type: true, name: '是' },
      { type: false, name: '否' }
    ]"
  />
  <y-divider left>多选全选，选择结果：{{ value2 }}</y-divider>
  <y-select
    v-model="value2"
    multiple
    :options="[
      { type: true, name: '是' },
      { type: false, name: '否' }
    ]"
  />
</template>
```

## 使用 0 / 1 选项值

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref()
const value2 = ref()
</script>
<template>
  <y-divider left>单选全选，选择结果：{{ value }}</y-divider>
  <y-select
    v-model="value"
    :options="[
      { type: 1, name: '是' },
      { type: 0, name: '否' }
    ]"
  />
  <y-divider left>多选全选，选择结果：{{ value2 }}</y-divider>
  <y-select
    v-model="value2"
    multiple
    :options="[
      { type: 1, name: '是' },
      { type: 0, name: '否' }
    ]"
  />
</template>
```

## optionAll 增加全选选项

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref()
const value2 = ref()
</script>
<template>
  <y-divider left>单选全选，选择结果：{{ value }}</y-divider>
  <y-select
    v-model="value"
    optionAll
    :options="[
      { type: 'jack', name: 'Jack' },
      { type: 'lucy', name: 'Lucy' },
      { type: 'disabled', name: 'Disabled' },
      { type: 'Yiminghe', name: 'yiminghe' }
    ]"
  />
  <y-divider left>多选全选，选择结果：{{ value2 }}</y-divider>
  <y-select
    v-model="value2"
    multiple
    optionAll
    :options="[
      { type: 'jack', name: 'Jack' },
      { type: 'lucy', name: 'Lucy' },
      { type: 'Yiminghe', name: 'yiminghe' }
    ]"
  />
</template>
```

## 本地过滤数据

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'
import { useFetch } from '@ygp/ygp-design-vue/hooks'
import { userList } from '@/api'

const value = ref()
const [data, loading, fetchData] = useFetch(
  (name: string) => userList({ name }),
  {
    initParams: 'a'
  }
)
</script>
<template>
  <y-divider left>已选择：{{ value }}</y-divider>
  <y-select v-model="value" :options="data" :propMap="{ value: 'userCode' }" />
</template>
```

## 使用 onSearch2 加载远程数据

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'
import { userList } from '@/api'

const value = ref()
const value2 = ref()
const data = ref([])
const loading = ref(false)

const fetchUser = (name: string) => userList({ name })
userList().then(res => {
  data.value = res
})
function onSearch(name = '', update, abort) {
  fetchUser(name).then(update).catch(abort)
}
</script>
<template>
  <y-divider left>单选，选择结果：{{ value }}</y-divider>
  <y-select
    v-model="value"
    :options="data"
    :propMap="{ value: 'userCode' }"
    @search2="onSearch"
  />
  <y-divider left>多选，选择结果：{{ value2 }}</y-divider>
  <y-select
    v-model="value2"
    multiple
    :options="data"
    :propMap="{ value: 'userCode' }"
    @search2="onSearch"
  />
</template>
```

## inputDebounce 输入搜索防抖

`onSearch2` 默认启用 `500ms` 防抖，可通过 `inputDebounce: number` 属性配置，如想去除防抖，可设置为 0

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'
import { userList } from '@/api'

const value = ref()
const data = []
function onSearch(name = '', update, abort) {
  if (name) {
    userList({ name }).then(update).catch(abort)
  } else {
    abort()
  }
}
</script>
<template>
  <y-select
    v-model="value"
    :options="data"
    :propMap="{ value: 'userCode' }"
    :inputDebounce="2000"
    @search2="onSearch"
  />
</template>
```

## 探讨一个根据关键字异步加载下拉数据的问题

我们有时会碰到这样一个问题:<br />
&nbsp;&nbsp;&nbsp;&nbsp;当我们按顺序同时发起 `y` 和 `ygp` 两组关键字的查询<br />
&nbsp;&nbsp;&nbsp;&nbsp;假设前者返回结果时间比较长时，前一个请求响应数据将覆盖之后搜索返回的数据<br />
&nbsp;&nbsp;&nbsp;&nbsp;这种情况下一般需要手动处理

在 `y-select` 中使用 `onSearch2` 将不需要手动处理，可放心使用

以下示例中，可以先键入关键字 `y` 进入搜索后再键入 `ygp`，本示例中对 `y` 关键字做了更延迟的模拟设置

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'
import debounce from 'lodash/debounce'
import { userList } from '@/api'

const value = ref()
const value2 = ref()
const data = ref([])
const loading = ref(false)

const fetchUser = (name: string) => userList({ name })
const handleFetchUser = debounce((name: string) => {
  loading.value = true
  fetchUser(name)
    .then(res => {
      data.value = res
    })
    .finally(() => {
      loading.value = false
    })
}, 500)

function onSearch(val) {
  console.log(val)
  if (val) {
    handleFetchUser(val)
  }
}

function onSearch2(name = '', update, abort) {
  if (name) {
    userList({ name }).then(update).catch(abort)
  } else {
    abort()
  }
}
</script>
<template>
  <y-divider left>使用 onSearch ，不做防延迟处理</y-divider>
  <y-select
    v-model="value2"
    :propmap="{ value: 'usercode' }"
    :loading="loading"
    :options="data"
    @search="onSearch"
  />
  <y-divider left>使用 onSearch2 ，不需要做任何处理</y-divider>
  <y-select
    v-model="value"
    :propmap="{ value: 'usercode' }"
    @search2="onSearch2"
  />
</template>
```

## 使用 hooks/useSelectSearch 实现下拉分页搜索（滚动分页）

在根据关键字异步搜索的基础上，加上滚动分页，进一步对前后端性能进行优化

仅用两句代码实现该功能

`useSelectSearch` 默认 `pageSize: 20`，可通过第二个参数 `{pageSize: xx}` 自定义

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'
import { useSelectSearch } from '@ygp/ygp-design-vue/hooks'
import { bankPage } from '@/api'

const value = ref()
const selectProps = useSelectSearch((bankName = '', page) =>
  bankPage({ bankName, ...page })
)
</script>
<template>
  <y-divider left>已选择：{{ value }}</y-divider>
  <y-select
    v-model="value"
    placeholder="输入“佛山”然后滚动翻页试试"
    :propMap="{ label: 'bankName', value: 'bankCode' }"
    v-bind="selectProps"
  />
</template>
```

<!-- ## 配置全局下拉框 suffixIcon 属性

`src/main.ts`

```typescript
import { h } from 'vue'
import Ygpd from '@ygp/ygp-design-vue'
import { CaretDownOutlined } from '@ant-design/icons-vue'

app.use(Ygpd, {
  appConfig: {
    selectProps: {
      suffixIcon: h(CaretDownOutlined),
    },
  },
})
``` -->
