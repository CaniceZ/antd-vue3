# y-auto-complete 自动完成

<a-btn label="a-auto-complete" href="https://next.antdv.com/components/auto-complete-cn" />

完全继承 `a-auto-complete` 的属性、事件、插槽、方法，可以通过 <y-link blank href="https://next.antdv.com/components/auto-complete-cn" label="a-auto-complete" /> 查看更多选项

## API

api:props

| 参数                | 说明                                       | 类型                   | 默认值          |
| ------------------- | ------------------------------------------ | ---------------------- | --------------- |
| modelValue(v-model) | 显示隐藏                                   | boolean                |
| filterOption        | 过滤 option 的方法                         | Function               | 默认过滤        |
| options             | 选项集合                                   | object{} \| string[]   |
| propMap             | option 的字段映射                          | {value: string}        | {value: 'name'} |
| maxlength           | 最大输入长度                               | number                 |
| inputDebounce       | 以毫秒为单位，对 `onSearch` 进行去抖动处理 | number                 | 500             |
| inputType           | 输入框类型                                 | `search` \| `textarea` |
| inputProps          | 输入框透传属性                             | YInputProps            |

api:emits

| 事件名            | 说明                                 | 回调参数                       |
| ----------------- | ------------------------------------ | ------------------------------ |
| update:modelValue | modelValue 修改事件                  | (visible: boolean) => void     |
| search            | 可用于自定义本地过滤或远程过滤的方法 | (value, update, abort) => void |

api:slots

| 插槽名          | 说明                           | props                                  |
| --------------- | ------------------------------ | -------------------------------------- |
| notFoundContent | options 为空时下拉列表显示内容 |
| option          | 自定义 option 插槽节点         | {value, label, [disabled, key, title]} |

api:methods

| 方法名 | 说明     | 参数 | 返回值 |
| ------ | -------- | ---- | ------ |
| blur   | 移除焦点 |
| focus  | 获取焦点 |

## 基本用法：默认本地搜索过滤

```vue demo
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'
const value = ref('')

const options = ['luffy', 'zoro', 'nami']

function onChange(...args) {
  console.log(...args)
}
</script>
<template>
  <p>value: {{ value }}</p>
  <y-auto-complete
    placeholder="限制了只能输入10个字符，不信试试看"
    v-model="value"
    :maxlength="10"
    :input-debounce="0"
    :options="options"
    @change="onChange"
  />
</template>
```

## 配合 `y-form` 表单使用

**FAQ：跟 `y-form` 配合使用的时候，会出现“输入内容与 options 没有匹配项时，自动失去焦点的问题”，该问题现已修复**

```vue demo
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'
const formData = reactive({})

const options = [{ name: 'luffy' }, { name: 'zoro' }, { name: 'nami' }]
</script>
<template>
  formData: {{ formData }}
  <y-divider />
  <y-form :model="formData">
    <y-form-item name="name" type="autocomplete" :options="options" />
  </y-form>
</template>
```

## 远程过滤搜索

```vue demo
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'
import { useAsync } from '@ygp/ygp-design-vue/hooks'

const value = ref('')
const formData = reactive({})
const [fetchData] = useAsync(async (name: string) => {
  const res = await fetch(
    `https://gateway-dev1.yigongpin.net/api/spm/dataPermissionWhiteList/getUnbindUser?limit=300&page=1&rightCode=2453d716363b413f80d753199b0d63ee&nickName=${name}`,
    {
      headers: {
        accept: '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'request-origion': 'SwaggerBootstrapUi',
        'sec-ch-ua':
          '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-requested-with': 'XMLHttpRequest'
      },
      referrer: 'https://gateway-dev1.yigongpin.net/swagger-ui.html',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  )
  const data = await res.json()
  return data.data?.list || []
})

function onSearch(input: string, update, abort) {
  if (input) {
    fetchData(input).then(update).catch(abort)
  } else {
    abort()
  }
}
</script>
<template>
  <p>value: {{ value }}</p>
  <y-auto-complete
    v-model="value"
    @search="onSearch"
    placeholder="试试输入关键字「test」或者「珠海」"
    :propMap="{ value: 'nickname' }"
  />
  <y-divider />
  <p>在y-form表单中使用</p>
  <p>formData: {{ formData }}</p>
  <y-form :model="formData">
    <y-form-item
      name="name"
      type="autocomplete"
      placeholder="试试输入关键字「test」或者「珠海」"
      :propMap="{ value: 'nickname' }"
      :componentProps="{ onSearch }"
    >
      <template #item-notFoundContent>
        <div>自定义的找不到数据插槽</div>
      </template>
    </y-form-item>
  </y-form>
</template>
```

## 根据输入文本自定义下拉列表

```vue demo
<script lang="ts" setup>
import { ref, reactive } from 'vue'

const value = ref('')
const formData = reactive({})

function onSearch(input: string, update, abort) {
  if (input && !input.split('@')[1]) {
    update(
      ['gongpin.com', 'gmail.com', '163.com', 'qq.com'].map(row =>
        input.includes('@') ? `${input}${row}` : `${input}@${row}`
      )
    )
  } else {
    update([])
    abort()
  }
}
</script>
<template>
  <p>value: {{ value }}</p>
  <y-auto-complete
    v-model="value"
    placeholder="自定义option插槽"
    @search="onSearch"
    :input-debounce="0"
  >
    <template #option="{ value: val }">
      {{ val.split('@')[0]
      }}<span style="font-weight: bold">@{{ val.split('@')[1] }}</span>
    </template>
  </y-auto-complete>
  <y-divider />
  <p>在y-form表单中使用</p>
  <p>formData: {{ formData }}</p>
  <y-form :model="formData">
    <y-form-item
      name="name"
      type="autocomplete"
      placeholder="自定义option插槽"
      :componentProps="{ onSearch, inputDebounce: 1 }"
    >
      <template #item-option="{ value: val }">
        {{ val.split('@')[0]
        }}<span style="font-weight: bold">@{{ val.split('@')[1] }}</span>
      </template>
    </y-form-item>
  </y-form>
</template>
```

## 自定义输入框

通过 inputType / inputProps 来配置输入框属性

```vue demo
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'
const value = ref('')

const options = ['luffy', 'zoro', 'nami']
</script>
<template>
  <p>value: {{ value }}</p>
  <y-auto-complete
    placeholder="限制了只能输入10个字符，不信试试看"
    v-model="value"
    :maxlength="10"
    :options="options"
    inputType="textarea"
    :inputProps="{
      showCount: true
    }"
  />
</template>
```

## 禁用的 y-auto-complete

```vue demo
<template>
  <y-auto-complete disabled modelValue="禁用的y-auto-complete" />
</template>
```
